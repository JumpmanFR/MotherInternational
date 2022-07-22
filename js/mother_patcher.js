/* Mother International, Web version
JumpmanFR 2021-2022
Contains elements from Rom Patcher JS by Marc Robledo */

const DEFAULT_LANGUAGE = "en";

const PATCH_FOLDER_PATH = "patches/";

const MSG_TYPE_OK = 0;
const MSG_TYPE_LOADING = 1;
const MSG_TYPE_WARNING = 2;
const MSG_TYPE_ERROR = 3;

const ROMS_IN_ZIP = /\.(gba|agb|sfc|srm|nes|fds|bin)$/i
const PATCHES_IN_ZIP = /\.(ups|bps|ips|xdelta|vcdiff)$/i

var GAME_NAMES = {[CARD_MOTHER_1]: "MOTHER 1 / EarthBound Beginnings", [CARD_MOTHER_2]: "MOTHER 2 / EarthBound", [CARD_MOTHER_3]: "MOTHER 3", [CARD_MOTHER_1_2]: "MOTHER 1+2"};
var LANG_NAMES = {[LANG_JAPANESE]: "日本語", [LANG_ENGLISH]: "English", [LANG_FRENCH]: "français", [LANG_GERMAN]: "Deutsch", [LANG_ITALIAN]: "italiano", [LANG_SPANISH]: "español", [LANG_SP_SPAIN]: "español de España", [LANG_SP_LATINO]: "español americano", [LANG_PORTUGUES]: "português", [LANG_PT_PORTUG]: "português de Portugal", [LANG_PT_BRAZIL]: "português do Brasil", [LANG_POLISH]: "polski", [LANG_DUTCH]: "Nederlands", [LANG_RUSSIAN]: "русский", [LANG_CHINESE]: "中文", [LANG_KOREAN]: "한국어"}

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
const ELT_SHOW_ALL_OPTION = "show-all-option";
const ELT_INFO_WEBSITE = "info-website";
const ELT_INFO_DOC = "info-doc";
const ELT_INFO_NB_USES = "info-nb-uses";
const ELT_APPLY = "apply-btn";

var gUserLanguage;
var gIsBusy;
var gInputRom, gInputRomId;
var gPatchFiles = [];

// Init from external files
var gWorkerChecksum = new Worker('./js/worker_crc.js');
var gWorkerApply = new Worker('./js/worker_apply.js');

// Shortcuts
function addEvent(e,ev,f){e.addEventListener(ev,f,false)}
function el(e){return document.getElementById(e)}
function _(str){return gUserLanguage[str] || str}
function langCode(){return navigator.language.substr(0,2)}
function patchSelectVal(){return el(ELT_PATCH_SELECT).value}
function versionedPatches(id){return ROM_LIST[id].oldVersionOf || ROM_LIST[id].lastVersionOf || NaN}

//==========================================
// EVENT METHODS AND ENTRY POINTS
//==========================================

addEvent(document, 'DOMContentLoaded', function() {
	addEvent(el(ELT_ROM_BTN), 'click', el(ELT_ROM_FILE).click);
	addEvent(el(ELT_DROP), 'dragenter', function(e) {onDrag(true, e)});
	addEvent(el(ELT_DROP), 'dragover', function(e) {onDrag(true, e)});
	addEvent(el(ELT_DROP), 'dragleave', function(e) {onDrag(false, e)});
	addEvent(el(ELT_DROP), 'drop', function(e) {onDrag(false, e);});
	addEvent(el(ELT_ROM_FILE), 'change', function() {onInputFile(this);});
 	addEvent(el(ELT_DROP), 'drop', function(e) {if (!this.classList.contains("disabled")) { onInputFile(e.dataTransfer);}});
 	addEvent(el(ELT_PATCH_SELECT),'change', function() {onSelectPatch(this.value)});
 	addEvent(el(ELT_SHOW_ALL_OPTION),'change', updatePatchSelect);
	addEvent(el(ELT_APPLY), 'click',  function() {processPatchingTasks(gInputRom, gInputRomId, 1)});

	zip.useWebWorkers=true;
	zip.workerScriptsPath='./js/zip.js/';

	setLanguage(langCode());
	setUIBusy(false);
	
})



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
	if (LOCALIZATION[langCode]) {
		gUserLanguage=LOCALIZATION[langCode];
	} else {
		gUserLanguage=LOCALIZATION[DEFAULT_LANGUAGE];
	}

	var translatableElements=document.querySelectorAll('*[data-localize]');
	for(var i=0; i<translatableElements.length; i++){
		if (translatableElements[i].tagName == "INPUT") {
			translatableElements[i].setAttribute("value", _(translatableElements[i].dataset.localize));
		} else {
			translatableElements[i].innerHTML = _(translatableElements[i].dataset.localize);
		}
	}
}

function setUIBusy(value) {
	gIsBusy = value;
	updateUIState();
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
			messageBox.innerHTML = `<span class="${MSG_CLASS[type]}"></span> ${msg}`;
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

function romDesc(id) {
	var res = GAME_NAMES[ROM_LIST[id].game] + " – " + LANG_NAMES[ROM_LIST[id].lang];
	if (ROM_LIST[id].version) {
		res +=  " " + _("txtDescVersion") + ROM_LIST[id].version;
	}
	if (ROM_LIST[id].author) {
		res += " " + _("txtDescBy") + " " + ROM_LIST[id].author;
	}
	if (ROM_LIST[id].specialAltRom) {
		res += " (" + ROM_LIST[id].specialAltRom + ")";
	}
	return res;
}

// Builds the content in the scroll list and selects a default item – sorry if the code isn’t exceptionally well-written here
function updatePatchSelect() {
	var inputId = gInputRomId;
	
	var oldValue = patchSelectVal();
	var defaultSelectionCandidates = {};

	clearPatchSelect();
	if (inputId) {
		var showAllVersions = el(ELT_SHOW_ALL_OPTION).checked;
		for (var cur in ROM_LIST) { // let’s determine which entries can appear in the scroll list…
			if (inputId != cur
				&& ((!ROM_LIST[inputId].cantReverse && !!ROM_LIST[inputId].baseRom && ROM_LIST[inputId].baseRom == ROM_LIST[cur].baseRom)	
					|| (!ROM_LIST[inputId].cantReverse && !ROM_LIST[cur].baseRom && cur == ROM_LIST[inputId].baseRom)
					|| (!ROM_LIST[inputId].baseRom && inputId == ROM_LIST[cur].baseRom))
				&& (showAllVersions
					|| (!ROM_LIST[cur].oldVersionOf && !ROM_LIST[cur].specialAltRom))) {
				
				var opt = document.createElement("option");
				opt.value = cur;
				opt.text = romDesc(cur);
				el(ELT_PATCH_SELECT).add(opt);
				
				if (ROM_LIST[cur].lastVersionOf && (ROM_LIST[inputId].oldVersionOf == ROM_LIST[cur].lastVersionOf)) {
					opt.text += " " + _("txtDescUpdate");
				}
				
				// Default selection
				if (oldValue && oldValue == cur) {
					defaultSelectionCandidates.oldValue = cur; // the value that was selected before
				} else if (oldValue && (versionedPatches(cur) == versionedPatches(oldValue))) {
					defaultSelectionCandidates.akinToOldValue = cur; // a “similar” (other version) of the value that was selected before
				} else if (ROM_LIST[inputId].oldVersionOf == versionedPatches(cur)) {
					defaultSelectionCandidates.updateInput = cur; // a value that will update the user’s input ROM
				} else if (ROM_LIST[cur].lang.startsWith(langCode())) {
					defaultSelectionCandidates.userLanguage = cur; // a language that corresponds to the user
				} else if (!ROM_LIST[cur].baseRom) {
					defaultSelectionCandidates.baseRom = cur; // a basic, unpatched ROM
				}
				
			}
		}
		
		// Default selection, in this priority order
		var defaultSelection = defaultSelectionCandidates.oldValue || defaultSelectionCandidates.akinToOldValue || defaultSelectionCandidates.updateInput || defaultSelectionCandidates.userLanguage || defaultSelectionCandidates.baseRom;
		if (defaultSelection) {
			el(ELT_PATCH_SELECT).value = defaultSelection;
		}
		
		updatePatchInfo();
	}
}

function clearPatchSelect() {
    while (el(ELT_PATCH_SELECT).options.length > 0) {
        el(ELT_PATCH_SELECT).remove(0);
    }
    updatePatchInfo();
}

function updatePatchInfo() {
	var id = patchSelectVal();
	if (id && ROM_LIST[id].website) {
		var websiteStr = `<a href="${ROM_LIST[id].website}" target="_blank">`;
		websiteStr += _('txtVisitSite').replace("%", ROM_LIST[id].author) 
		websiteStr += ` (${ROM_LIST[id].website})</a>`
		el(ELT_INFO_WEBSITE).innerHTML = websiteStr;
	} else {
	    el(ELT_INFO_WEBSITE).innerHTML = '';
	}
	if (id && ROM_LIST[id].hasDoc) {
		el(ELT_INFO_DOC).innerHTML = `<a href="patches/${id}.txt" download="${_('txtReadmeFile')}-${id}.txt>${_('txtReadDoc')}</a>`
	} else {
	    el(ELT_INFO_DOC).innerHTML = '';
	}
	
	if (id) {
		el(ELT_INFO_NB_USES).innerHTML = _('txtNbUses').replace("%", "42")
	} else {
		el(ELT_INFO_NB_USES).innerHTML = '';
	}
}

function reset() {
	gInputRom = null;
	gInputRomId = null;
	gPatchFiles = [];
	setMessage(_('txtSpecifyRom'));
	clearPatchSelect();
	setUIBusy(false);
}


//==========================================
// PATCHING METHODS
//==========================================

function parseInputRom() {
	setUIBusy(true);
    clearPatchSelect();
	setAnim(); // no animation

	gWorkerChecksum.onmessage = event => {
		onParsedInputRom(event.data);
	};
	gWorkerChecksum.onerror = event => {
		setMessage(_(event.message.replace('Error: ','')), MSG_TYPE_ERROR);
		setUIBusy(false);
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
					setMessage(_('error_no_rom_in_zip'), MSG_TYPE_ERROR) // TODO errors
					setUIBusy(false);
				}
        	})
        	.catch(function() {
				setMessage(_('error_unzipping'), MSG_TYPE_ERROR) // TODO errors
				setUIBusy(false);
       	});
	} else {
		setMessage(_('txtAnalyzingRom'), MSG_TYPE_LOADING)
		gWorkerChecksum.postMessage({u8array:gInputRom._u8array, startOffset:0}, [gInputRom._u8array.buffer]);
	}
}

function onParsedInputRom(data) {
    gInputRom._u8array = data.u8array;
    gInputRom._dataView = new DataView(data.u8array.buffer);
    
    gInputRomId = null;

    var romCrc = data.crc32;
    for (var i in ROM_LIST) {
        if (ROM_LIST[i].crc == romCrc) {
            gInputRomId = i;
            setMessage(romDesc(i));
			setAnim(ROM_LIST[i].game);
            break;
        }
    }

	updatePatchSelect();
	setUIBusy(false);
    
    if (!gInputRomId) {
        setMessage(_("error_unknown_rom"), MSG_TYPE_ERROR) // TODO errors
    }

}

// May be recursive; sees what the current input ROM is, what the patch selector is, and decides what to do from that
function processPatchingTasks(rom, romId, step) {
	setUIBusy(true);
	if (!rom) {
		endProcessWithError(_("error_no_rom"));
		return;
	}
	if (!romId) {
		endProcessWithError(_("error_no_rom_info"));
		return;
	}
	
	if (romId == patchSelectVal()) {
		// The romId is equal to what the user wanted, so our process is finished now!
		deliverFinalRom(rom);
		
	} else {
		var patchId,nextRomIdAfterPatch;
		// If a baseRom is specified, then our input is not the baseRom => reverse patching
		if (!!(ROM_LIST[romId].baseRom) && !(ROM_LIST[romId].cantReverse)) {
			patchId = romId;
			nextRomIdAfterPatch = ROM_LIST[romId].baseRom;
			if (nextRomIdAfterPatch == patchSelectVal()) { // this has to be the first step or the only one
				step = undefined;
			}
		} else { // normal patching
			patchId = patchSelectVal();
			nextRomIdAfterPatch = patchId;
			if (step <= 1) { // this has to be the last step or the only one
				step = undefined;
			}
		}
		
		setMessage(_("txtDownloading").replace("%", step ? ` ${step}/2` : ""), MSG_TYPE_LOADING);
		var patchFileName = patchId + ROM_LIST[patchId].patchExt;
		downloadPatch(patchFileName, rom)
			.then(function(patchFile) {
				setMessage(_("txtApplyingPatch").replace("%", step ? ` ${step}/2` : ""), MSG_TYPE_LOADING);;
				return applyPatch(rom, patchFile, ROM_LIST[nextRomIdAfterPatch].crc);
			})
			.then(function(outputRom) {
				processPatchingTasks(outputRom, nextRomIdAfterPatch, step + 1);
			})
			.catch(function(errorMsg) {
				endProcessWithError(_(errorMsg || "error_patching")); // TODO error messages localization?
			});
	}
}

// Downloads the patch file, makes sure it’s valid, and converts it to patch object
// The “rom” parameter is here to check validity.
function downloadPatch(patchFileName, rom) {
	return new Promise((successCallback, failureCallback) => {
		//console.log("txtDownloading");
		fetch(PATCH_FOLDER_PATH + patchFileName)
				.then(function(response) {
					if (response.ok) {
						return response.arrayBuffer()
					} else {
						failureCallback(response.statusText.replace('Error: ','')); // TODO errors
					}
				})
				.then(arrayBuffer => {
					var patchFile = new MarcFile(arrayBuffer);
					onDownloadedPatch(patchFile, rom)
						.then(successCallback)
						.catch(failureCallback);
				})
				.catch(function(e) {
					failureCallback(e || 'error_downloading');
				});
	});
}

function onDownloadedPatch(patchFile, rom) {
	return new Promise((successCallback, failureCallback) => {
		var header = patchFile.readString(6);
		if (header.startsWith(UPS_MAGIC)) {
			var patch = parseUPSFile(patchFile);
			if (patch.validateSource && !patch.validateSource(rom)) {
				failureCallback('error_crc_output');
			} else {
				successCallback(patchFile);
			}
		} else if (header.startsWith(BPS_MAGIC)) {
			var patch = parseBPSFile(patchFile);
			if (patch.validateSource && !patch.validateSource(rom)) {
				failureCallback('error_crc_output');
			} else {
				successCallback(patchFile);
			}
		} else if (header.startsWith(IPS_MAGIC)) {
			var patch = parseIPSFile(patchFile);
			if (patch.validateSource && !patch.validateSource(rom)) {
				failureCallback('error_crc_output');
			} else {
				successCallback(patchFile);
			}
		} else if (header.startsWith(VCDIFF_MAGIC)) {
			var patch = parseVCDIFF(patchFile);
			if (patch.validateSource && !patch.validateSource(rom)) {
				failureCallback('error_crc_output');
			} else {
				successCallback(patchFile);
			}
		} else if (header.startsWith(ZIP_MAGIC)) {
			parseZIPFile(patchFile, PATCHES_IN_ZIP)
				.then(unzippedFile => {
					onDownloadedPatch(unzippedFile, rom)
						.then(successCallback)
						.catch(failureCallback)
				})
				.catch(err => {
					failureCallback('error_downloading');
				});
		} else {
			failureCallback('error_invalid_patch');
		}
	});
}


// Applies the patch and makes sure the output file has the right checksum
function applyPatch(romFile, patchFile, expectedChecksum) {
	return new Promise((successCallback, failureCallback) => {
		//console.log("txtApplyingPatch");
		gWorkerApply.onmessage = event => {
			romFile._u8array = event.data.romFileU8Array;
			romFile._dataView = new DataView(romFile._u8array.buffer);
			patchFile._u8array = event.data.patchFileU8Array;
			patchFile._dataView = new DataView(patchFile._u8array.buffer);
			if (event.data.errorMessage) {
				failureCallback(event.data.errorMessage); // TODO errors
			} else {
				var patchedRom = new MarcFile(event.data.patchedRomU8Array.buffer);
				if (crc32(patchedRom) == expectedChecksum) {
					successCallback(patchedRom);
				} else {
					failureCallback(); // TODO errors
				}
			}
		}
		gWorkerApply.onerror = event => {
			failureCallback(event.message.replace('Error: ','')); // TODO errors
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

function endProcessWithError(errorMsg) {
	setMessage(errorMsg, MSG_TYPE_ERROR);
	setUIBusy(false);
}

function deliverFinalRom(finalRomFile) {
	finalRomFile.fileName=gInputRom.fileName.replace(/\.([^\.]*?)$/, ` (patched-${patchSelectVal()}).$1`);
	finalRomFile.save();
	setMessage('');
	setUIBusy(false);
}