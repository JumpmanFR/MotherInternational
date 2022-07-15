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
ELT_MSG = "msg";
ELT_APPLY = "apply-btn";

var gUserLanguage;
var gIsBusy;

var gFileRom;

/* Shortcuts */
function addEvent(e,ev,f){e.addEventListener(ev,f,false)}
function el(e){return document.getElementById(e)}
function _(str){return gUserLanguage[str] || str}

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById(ELT_APPLY).addEventListener('click', function(){/*TODO applyPatch(patch, romFile, false)*/})
	document.getElementById(ELT_DROP).addEventListener('dragenter',function(e){showDrag(true, e)})
	document.getElementById(ELT_DROP).addEventListener('dragover',function(e){showDrag(true, e)})
	document.getElementById(ELT_DROP).addEventListener('dragleave',function(e){showDrag(false, e)})
	document.getElementById(ELT_DROP).addEventListener('drop',function(e){showDrag(false, e);})
})

/* Entry point */
addEvent(window,'load',function() {
	setLanguage("en");
	gIsBusy = false;
	updateUIState();
	addEvent(el(ELT_ROM_FILE), 'change', function(){
		gFileRom = new MarcFile(this, parseRom);
		el(ELT_ROM_BTN).innerText = gFileRom.fileName;
	});
 	addEvent(el(ELT_DROP), 'drop', function(e) {
 		if (!this.classList.contains("disabled")) {
			gFileRom = new MarcFile(e.dataTransfer, parseRom);
			el(ELT_ROM_BTN).innerText = gFileRom.fileName;
 		}
 	});
});


/*===================
UI METHODS
=====================*/

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

/* Enables fields and buttons depending on busy status, specified fields and errors */
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


/*===================
PATCHING METHODS
=====================*/

function parseRom() {
	gIsBusy = true;
	updateUIState();
	setMessage(_('txtAnalyzingRom'), MSG_TYPE_LOADING)
	if(gFileRom.readString(4).startsWith(ZIP_MAGIC)){
		// TODO
	} else {
		webWorkerCrc.postMessage({u8array:file._u8array, startOffset:startOffset}, [file._u8array.buffer]);
	}
}