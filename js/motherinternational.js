/* Mother International, based on Rom Patcher JS - Marc Robledo 2017-2018, JumpmanFR 2021-2022 */

var MSG_TYPE_OK = 0;
var MSG_TYPE_LOADING = 1;
var MSG_TYPE_WARNING = 2;
var MSG_TYPE_ERROR = 3;

var MSG_CLASS_DEFAULT = "message";
var MSG_CLASS = [];
MSG_CLASS[MSG_TYPE_OK] = "ok";
MSG_CLASS[MSG_TYPE_LOADING] = "loading";
MSG_CLASS[MSG_TYPE_WARNING] = "warning";
MSG_CLASS[MSG_TYPE_ERROR] = "error";

ELT_DROP = "drop";
ELT_ROM_FILE = "rom-file";
ELT_ROM_BTN = "rom-btn";
ELT_ROM_LABEL = "rom-label";
ELT_MSG = "msg";
ELT_PATCH_SELECT = "patch-select";
ELT_APPLY = "apply-btn";

var gUserLanguage;
var gIsBusy;

var gWorkerChecksum, gWorkerApply;

// Shortcuts
function addEvent(e,ev,f){e.addEventListener(ev,f,false)}
function el(e){return document.getElementById(e)}
function _(str){return gUserLanguage[str] || str}


//=====================
// EVENT METHODS
//=====================

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById(ELT_APPLY).addEventListener('click', function(){/*TODO applyPatch(patch, romFile, false)*/})
	document.getElementById(ELT_DROP).addEventListener('dragenter',function(e){showDrag(true, e)})
	document.getElementById(ELT_DROP).addEventListener('dragover',function(e){showDrag(true, e)})
	document.getElementById(ELT_DROP).addEventListener('dragleave',function(e){showDrag(false, e)})
	document.getElementById(ELT_DROP).addEventListener('drop',function(e){showDrag(false, e);})
})

addEvent(window,'load', init);

gWorkerChecksum = new Worker('./js/worker_crc.js');

gWorkerChecksum.onerror = event => { // listen for events from the worker
	setMessage(event.message.replace('Error: ',''), MSG_TYPE_ERROR);
};


//=====================
// ENTRY POINT
//=====================

function init() {
	setLanguage("en");
	gIsBusy = false;
	updateUIState();
	addEvent(el(ELT_ROM_FILE), 'change', function(){
        var inputRom = new MarcFile(this, function() {parseInputRom(inputRom)});
		el(ELT_ROM_LABEL).innerText = inputRom.fileName;
	});
 	addEvent(el(ELT_DROP), 'drop', function(e) {
 		if (!this.classList.contains("disabled")) {
            var inputRom = new MarcFile(e.dataTransfer, function() {parseInputRom(inputRom)});
			el(ELT_ROM_LABEL).innerText = inputRom.fileName;
 		}
 	});
}


//=====================
// UI METHODS
//=====================

function setLanguage(langCode){
	gUserLanguage=LOCALIZATION[langCode];

	var translatableElements=document.querySelectorAll('*[data-localize]');
	for(var i=0; i<translatableElements.length; i++){
		if (translatableElements[i].tagName == "INPUT") {
			translatableElements[i].setAttribute("value", _(translatableElements[i].dataset.localize));
		} else {
			translatableElements[i].innerHTML = _(translatableElements[i].dataset.localize);
		}
	}
}

// Enables fields and buttons depending on busy status, specified fields and errors
function updateUIState() {
	
}

function setMessage(msg, type) {
	var messageBox = el(ELT_MSG);
	if (msg) {
		if (type === MSG_TYPE_LOADING) {
			messageBox.className = MSG_CLASS_DEFAULT;
			messageBox.innerHTML = '<span class="' + MSG_CLASS[type] + '"></span> ' + msg;
		} else {
			messageBox.className = MSG_CLASS_DEFAULT + " " + MSG_CLASS[type];
			if(type === MSG_TYPE_WARNING)
				messageBox.innerHTML = '&#9888; ' + msg;
			else if(type === MSG_TYPE_ERROR)
				messageBox.innerHTML = '&#10007; ' + msg;
			else if(type === MSG_TYPE_OK)
				messageBox.innerHTML = '✓ ' + msg;
			else
				messageBox.innerHTML = msg;
		}
	} else {
		messageBox.innerHTML = '';
	}
}

function showDrag(val, e) {
	var col = el(ELT_DROP);
 	if (val) {
		col.classList.add("drag");
	} else {
		col.classList.remove("drag");
	}
	e.preventDefault();
}


//=====================
// PATCHING METHODS
//=====================

function parseInputRom(inputRom) {
	gIsBusy = true;
	updateUIState();
	setMessage(_('txtAnalyzingRom'), MSG_TYPE_LOADING)
	if(inputRom.readString(4).startsWith(ZIP_MAGIC)){
        // TODO parseZIPFile(romFile);
        gIsBusy = true;
        updateUIState();
	} else {
        gWorkerChecksum.onmessage = event => {
            onParsedInputRom(event.data, inputRom);
        };
		gWorkerChecksum.postMessage({u8array:inputRom._u8array, startOffset:0}, [inputRom._u8array.buffer]);
	}
}

function onParsedInputRom(data, inputRom) {
    inputRom._u8array = event.data.u8array;
    inputRom._dataView = new DataView(event.data.u8array.buffer);
    
    var detectedRomId;
    while (el(ELT_PATCH_SELECT).options.length > 0) {
        el(ELT_PATCH_SELECT).remove(0);
    }

    var romCrc = crc32(inputRom);
    for (var i in ROM_LIST) {
        if (ROM_LIST[i].crc == romCrc) {
            detectedRomId = i;
            setMessage(ROM_LIST[i].baseDesc + " – " + ROM_LIST[i].romDesc);
            for (var j in ROM_LIST) {
                if (i != j && (ROM_LIST[i].baseRom == ROM_LIST[j].baseRom
                               || i == ROM_LIST[j].baseRom || ROM_LIST[i].baseRom == j)
                    && !ROM_LIST[j].latestVersion) {
                    var opt = document.createElement("option");
                    opt.value = j;
                    opt.text = ROM_LIST[j].baseDesc + " – " + ROM_LIST[j].romDesc;
                    el(ELT_PATCH_SELECT).add(opt);
                }
            }
            break;
        }
    }
    
    gIsBusy = false;
    updateUIState();

    if (!detectedRomId) {
        setMessage(_("txtErrUnknownRom"), MSG_TYPE_ERROR)
    } else {
        
    }
    
    
    // TODO validateSource(true);
}
