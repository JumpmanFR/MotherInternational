/* Mother International, based on Rom Patcher JS - Marc Robledo 2017-2018, JumpmanFR 2021-2022 */

const PATCH_FOLDER_PATH = "patches/";

const MSG_TYPE_OK = 0;
const MSG_TYPE_LOADING = 1;
const MSG_TYPE_WARNING = 2;
const MSG_TYPE_ERROR = 3;

const ROMS_IN_ZIP = /\.(gba|agb|bin)$/i
const PATCHES_IN_ZIP = /\.(ups|ips|bps)$/i

const MSG_CLASS_DEFAULT = "message";
var MSG_CLASS = [];
MSG_CLASS[MSG_TYPE_OK] = "ok";
MSG_CLASS[MSG_TYPE_LOADING] = "loading";
MSG_CLASS[MSG_TYPE_WARNING] = "warning";
MSG_CLASS[MSG_TYPE_ERROR] = "error";

const ELT_DROP = "drop";
const ELT_ROM_FILE = "rom-file";
const ELT_ROM_BTN = "rom-btn";
const ELT_ROM_LABEL = "rom-label";
const ELT_MSG = "msg";
const ELT_PATCH_SELECT = "patch-select";
const ELT_INFO_WEBSITE = "info-website";
const ELT_INFO_DOC = "info-doc";
const ELT_INFO_NB_USES = "info-nb-uses";
const ELT_APPLY = "apply-btn";

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
gWorkerApply = new Worker('./js/worker_apply.js');

function onLoad() {
	zip.useWebWorkers=true;
	zip.workerScriptsPath='./js/zip.js/';
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
	updatePatchInfo();
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
	if (gIsBusy) {
		el(ELT_ROM_FILE).disabled = true;
		el(ELT_ROM_BTN).disabled = true;
		el(ELT_PATCH_SELECT).disabled = true;
		el(ELT_APPLY).disabled = true;
		el(ELT_DROP).classList.add('disabled');
	} else {
		el(ELT_ROM_FILE).disabled = false;
		el(ELT_ROM_BTN).disabled = false;
		el(ELT_PATCH_SELECT).disabled = el(ELT_PATCH_SELECT).options.length == 0;
		el(ELT_APPLY).disabled = !patchSelectVal() || !gInputRom;
		el(ELT_DROP).classList.remove('disabled');
	}
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

function updatePatchInfo() {
	var id = patchSelectVal();
	if (id && ROM_LIST[id].website) {
		el(ELT_INFO_WEBSITE).innerHTML = '<a href="' + ROM_LIST[id].website + '" target="_blank">' + _('txtVisitSite').replace("%", ROM_LIST[id].author) + ' (' + ROM_LIST[id].website + ')</a>'
	} else {
	    el(ELT_INFO_WEBSITE).innerHTML = '';
	}
	if (id && ROM_LIST[id].hasDoc) {
		el(ELT_INFO_DOC).innerHTML = '<a href=patches/"' + id + '.txt" target="_blank">' + _('txtReadDoc').replace("%", 42) + '</a>'
	} else {
	    el(ELT_INFO_DOC).innerHTML = '';
	}
	
	if (id) {
		el(ELT_INFO_NB_USES).innerHTML = _('txtNbUses')
	} else {
		el(ELT_INFO_NB_USES).innerHTML = '';
	}
}

function clearPatchSelect() {
    while (el(ELT_PATCH_SELECT).options.length > 0) {
        el(ELT_PATCH_SELECT).remove(0);
    }
    updatePatchInfo();
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

	gWorkerChecksum.onmessage = event => {
		onParsedInputRom(event.data);
	};
	gWorkerChecksum.onerror = event => {
		setMessage(_(event.message.replace('Error: ','')), MSG_TYPE_ERROR);
	};

	if(gInputRom.readString(4).startsWith(ZIP_MAGIC)){
		setMessage(_('txtUnzipping'), MSG_TYPE_LOADING)
        parseZIPFile(gInputRom, ROMS_IN_ZIP)
        	.then(unzippedFile => {
        		if (unzippedFile) {
					setMessage(_('txtAnalyzingRom'), MSG_TYPE_LOADING);
					gInputRom = unzippedFile;
					gWorkerChecksum.postMessage({u8array:unzippedFile._u8array, startOffset:0}, [unzippedFile._u8array.buffer]);
				} else {
					setMessage(_('txtErrNoRomInZip'), MSG_TYPE_ERROR)
				}
        	})
        	.catch(function() {
				setMessage(_('txtErrUnzipping'), MSG_TYPE_ERROR)
        	});
	} else {

		setMessage(_('txtAnalyzingRom'), MSG_TYPE_LOADING)
		gWorkerChecksum.postMessage({u8array:gInputRom._u8array, startOffset:0}, [gInputRom._u8array.buffer]);
	}
}

function onParsedInputRom(data) {
    gInputRom._u8array = event.data.u8array;
    gInputRom._dataView = new DataView(event.data.u8array.buffer);
    
    gInputRomId = null;
    clearPatchSelect();

    var romCrc = data.crc32;
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
    updatePatchInfo();

    if (!gInputRomId) {
        setMessage(_("txtErrUnknownRom"), MSG_TYPE_ERROR)
    }
}

// May be recursive ; sees what the current input ROM is, what the patch selector is, and decides what to do from that
function processPatchingTasks(rom, romId) {
	gIsBusy = true;
    updateUIState();
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
		deliverFinalRom(rom);
		
	} else {
		var patchId,nextRomIdAfterPatch;
		// If a baserom is specified, then our input is not the baserom
		if (!!(ROM_LIST[romId].baseRom)) {
			patchId = romId;
			nextRomIdAfterPatch = ROM_LIST[romId].baseRom;
		} else {
			patchId = patchSelectVal();
			nextRomIdAfterPatch = patchId;
		}
		
		var patchFileName = patchId + ROM_LIST[patchId].patchExt;
		downloadPatch(patchFileName, rom)
			.then(function(patchFile) {
				return applyPatch(rom, patchFile, ROM_LIST[nextRomIdAfterPatch].crc);
			})
			.then(function(outputRom) {
				processPatchingTasks(outputRom, nextRomIdAfterPatch);
			})
			.catch(function(e) {
				gIsBusy = false;
				updateUIState();
			});
	}
}

// Downloads the patch file, makes sure it’s valid, and converts it to patch object
// The “rom” parameter is here to check validity.
function downloadPatch(patchFileName, rom) {
	return new Promise((successCallback, failureCallback) => {
		setMessage(_("txtDownloading"), MSG_TYPE_LOADING);
		//console.log("txtDownloading");
		fetch(PATCH_FOLDER_PATH + patchFileName)
				.then(function(response) {
					if (response.ok) {
						return response.arrayBuffer()
					} else {
						throw Error(response.statusText);
					}
				})
				.then(arrayBuffer => {
					var patchFile = new MarcFile(arrayBuffer);
					onDownloadedPatch(patchFile, rom)
						.then(successCallback)
						.catch(failureCallback);
				})
				.catch(function(e){
					setMessage(_('txtErrDownloading'), MSG_TYPE_ERROR);
				});
	});
}

function onDownloadedPatch(patchFile, rom) {
	return new Promise((successCallback, failureCallback) => {
		var header = patchFile.readString(6);
		if (header.startsWith(UPS_MAGIC)) {
			var patch = parseUPSFile(patchFile);
			if (patch.validateSource && !patch.validateSource(rom)) {
				failureCallback();
			} else {
				successCallback(patchFile);
			}
		} else if (header.startsWith(ZIP_MAGIC)) {
			parseZIPFile(patchFile, PATCHES_IN_ZIP)
				.then(unzippedFile => {
					onDownloadedPatch(unzippedFile, rom)
						.then(successCallback)
						.catch(failureCallback);
				})
				.catch(err => {
					setMessage(_('txtErrDownloading'), MSG_TYPE_ERROR);
				});
		} else {
			setMessage(_('txtErrInvalidPatch'), MSG_TYPE_ERROR);
			failureCallback();
		}
	});
}


// Applies the patch and makes sure the output file has the right checksum
function applyPatch(romFile, patchFile, expectedChecksum) {
	return new Promise((successCallback, failureCallback) => {
		setMessage(_("txtApplyingPatch"), MSG_TYPE_LOADING);
		//console.log("txtApplyingPatch");
		gWorkerApply.onmessage = event => {
			var patchedRom = new MarcFile(event.data.patchedRomU8Array.buffer);
			successCallback(patchedRom);
		}
		gWorkerApply.onerror = event => {
			setMessage(_(event.message.replace('Error: ','')), MSG_TYPE_ERROR);
			failureCallback();
		};

		gWorkerApply.postMessage({
			romFileU8Array: romFile._u8array,
			patchFileU8Array: patchFile._u8array,
			validateChecksums: true
		},[
			romFile._u8array.buffer,
			patchFile._u8array.buffer
		]);
		
	});
}

function deliverFinalRom(finalRomFile) {
	updateUIState();
	finalRomFile.fileName=gInputRom.fileName.replace(/\.([^\.]*?)$/, ' (patched_' + patchSelectVal() + ').$1');
	finalRomFile.save();
	setMessage('');
	gIsBusy = false;
}