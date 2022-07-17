/* Mother International, based on Rom Patcher JS - Marc Robledo 2017-2018, JumpmanFR 2021-2022 */

var PATCH_FOLDER_PATH = "patches/";

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
var gInputRom, gInputRomId;
var gPatchFiles = [];

var gWorkerChecksum, gWorkerApply;

// Shortcuts
function addEvent(e,ev,f){e.addEventListener(ev,f,false)}
function el(e){return document.getElementById(e)}
function _(str){return gUserLanguage[str] || str}
function patchSelectVal(){return el(ELT_PATCH_SELECT).value}

//==========================================
// EVENT METHODS AND ENTRY POINTS
//==========================================

addEvent(document, 'DOMContentLoaded', function() {
	addEvent(window, 'load', onLoad);
	addEvent(el(ELT_APPLY), 'click',  function(){ processPatchingTasks(gInputRom, gInputRomId)})
	addEvent(el(ELT_DROP), 'dragenter',function(e){onDrag(true, e)})
	addEvent(el(ELT_DROP), 'dragover',function(e){onDrag(true, e)})
	addEvent(el(ELT_DROP), 'dragleave',function(e){onDrag(false, e)})
	addEvent(el(ELT_DROP), 'drop',function(e){onDrag(false, e);})
	addEvent(el(ELT_ROM_FILE), 'change', function(){onInputFile(this);});
 	addEvent(el(ELT_DROP), 'drop', function(e) {if (!this.classList.contains("disabled")) { onInputFile(e.dataTransfer);}});
 	addEvent(el(ELT_PATCH_SELECT),'change', function() {onSelectPatch(this.value)});
})

gWorkerChecksum = new Worker('./js/worker_crc.js');

gWorkerChecksum.onerror = event => { // listen for events from the worker
	setMessage(event.message.replace('Error: ',''), MSG_TYPE_ERROR);
};

function onLoad() {
	setLanguage("en");
	gIsBusy = false;
	updateUIState();
}


//==========================================
// USER EVENTS
//==========================================

function onDrag(val, e) {
	var col = el(ELT_DROP);
 	if (val) {
		col.classList.add("drag");
	} else {
		col.classList.remove("drag");
	}
	e.preventDefault();
}

function onInputFile(data) {
	var inputRom = new MarcFile(data, parseInputRom);
	el(ELT_ROM_LABEL).innerText = inputRom.fileName;
	gInputRom = inputRom;
	gInputRomId = null;
}

function onSelectPatch(value) {
	updateUIState();
}

//==========================================
// UI METHODS
//==========================================

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
	el(ELT_ROM_FILE).disabled = gIsBusy;
	el(ELT_ROM_BTN).disabled = gIsBusy;
	el(ELT_PATCH_SELECT).disabled = gIsBusy || el(ELT_PATCH_SELECT).options.length == 0;
	el(ELT_APPLY).disabled = gIsBusy || !patchSelectVal() || !gInputRom;
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

function clearPatchSelect() {
    while (el(ELT_PATCH_SELECT).options.length > 0) {
        el(ELT_PATCH_SELECT).remove(0);
    }
}

function reset() {
	gInputRom = null;
	gInputRomId = null;
	gPatchFiles = [];
	gIsBusy = false;
	setMessage(_('txtSpecifyRom'));
	clearPatchSelect();
	updateUIState();
}


//==========================================
// PATCHING METHODS
//==========================================

function parseInputRom() {
	gIsBusy = true;
	updateUIState();
    clearPatchSelect();
	setMessage(_('txtAnalyzingRom'), MSG_TYPE_LOADING)
	if(gInputRom.readString(4).startsWith(ZIP_MAGIC)){
        // TODO parseZIPFile(gInputRom);
        gIsBusy = true;
        updateUIState();
	} else {
        gWorkerChecksum.onmessage = event => {
            onParsedInputRom(event.data);
        };
		gWorkerChecksum.postMessage({u8array:gInputRom._u8array, startOffset:0}, [gInputRom._u8array.buffer]);
	}
}

function onParsedInputRom(data) {
    gInputRom._u8array = event.data.u8array;
    gInputRom._dataView = new DataView(event.data.u8array.buffer);
    
    gInputRomId = null;
    clearPatchSelect();

    var romCrc = crc32(gInputRom);
    for (var i in ROM_LIST) {
        if (ROM_LIST[i].crc == romCrc) {
            gInputRomId = i;
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

    if (!gInputRomId) {
        setMessage(_("txtErrUnknownRom"), MSG_TYPE_ERROR)
    }
}

// May be recursive ; sees what the current input ROM is, what the patch selector is, and decides what to do from that
function processPatchingTasks(rom, romId) {
	gIsBusy = true;
	if (!rom) {
		setMessage(_("txtErrNoRom"), MSG_TYPE_ERROR);
		return;
	}
	if (!romId) {
		setMessage(_("txtErrNoRomInfo"), MSG_TYPE_ERROR);
		return;
	}
	
	if (romId == patchSelectVal()) {
		// The romId is equal to what the user wanted, so our process is finished now!
		
	} else {
		var patchId;
		var nextRomIdAfterPatch;
		// If a baserom is specified, then our input is not the baserom
		if (!!(ROM_LIST[romId].baseRom)) {
			patchId = romId;
			nextRomIdAfterPatch = ROM_LIST[romId].baseRom;
		} else {
			patchId = patchSelectVal();
			nextRomIdAfterPatch = patchId;
		}
	
		/*downloadPatch(patchId, function(patch) {
			applyPatch(gInputRom, patch, ROM_LIST[nextRomIdAfterPatch].crc, function(outputRom) {
				processPatchingTasks(outputRom, nextRomIdAfterPatch);
			});
		});*/
		
		downloadPatch(patchId)
			.then(function(patch) {
				return applyPatch(gInputRom, patch, ROM_LIST[nextRomIdAfterPatch].crc);
			})
			.then(function(outputRom) {
				processPatchingTasks(outputRom, nextRomIdAfterPatch);
			});
	}
}

// Downloads the patch file, makes sure it’s valid, and converts it to patch object
function downloadPatch(patchId) {
	setMessage(_("txtDownloading"), MSG_TYPE_LOADING);
	fetch(PATCH_FOLDER_PATH + patchId + ".ups")
		.then(function(response) {
			if (response.ok) {
				setMessage("Downloaded !");
			} else {
				setMessage(_('txtErrDownloading'), MSG_TYPE_ERROR);
			}
		});
}

// Applies the patch and makes sure the output file has the right checksum
function applyPatch(rom, patch, expectedChecksum) {
	setMessage(_("txtApplyingPatch"), MSG_TYPE_LOADING);
}

