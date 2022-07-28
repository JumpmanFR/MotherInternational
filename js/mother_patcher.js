/* Mother International, Web version
JumpmanFR 2021-2022
Contains elements from Rom Patcher JS by Marc Robledo */

const PATH_PATCH_FOLDER = "patches/";
const PATCH_BOXARTS = "assets/boxarts/";
const PATH_LIBS = "./js/libs/";

const FOR_INPUT = 0;
const FOR_OUTPUT = 1;

const ROMS_IN_ZIP = /\.(gba|agb|sfc|srm|nes|fds|bin)$/i
const PATCHES_IN_ZIP = /\.(ups|bps|ips|xdelta|vcdiff)$/i

const MSG_TYPE_OK = 0;
const MSG_TYPE_LOADING = 1;
const MSG_TYPE_WARNING = 2;
const MSG_TYPE_ERROR = 3;

var MSG_CLASS = [];
MSG_CLASS[MSG_TYPE_OK] = CLASS_MESSAGE_OK;
MSG_CLASS[MSG_TYPE_LOADING] = CLASS_MESSAGE_LOADING;
MSG_CLASS[MSG_TYPE_WARNING] = CLASS_MESSAGE_WARNING;
MSG_CLASS[MSG_TYPE_ERROR] = CLASS_MESSAGE_ERROR;

var gUserLanguage, gDefaultLanguage;
var gIsBusy;
var gFlagEmojiSupported;

var gInputRom, gInputRomId;
var gPatchFiles = [];

var gStatsAlreadySent = [];

// Init from external files
var gWorkerChecksum = new Worker(PATH_LIBS + 'worker_crc.js');
var gWorkerApply = new Worker(PATH_LIBS + 'worker_apply.js');

// Shortcuts
function addEvent(e,ev,f){e.addEventListener(ev,f,false)}
function el(e){return document.getElementById(e)}
function _(str){return gUserLanguage[str] || gDefaultLanguage[str] || str}
function patchSelectVal(){return el(ELT_PATCH_SELECT).value}


//==========================================
// EVENT METHODS AND ENTRY POINTS
//==========================================

addEvent(document, 'DOMContentLoaded', function() {
	addEvent(document, 'dragover', (e) => e.preventDefault())
	addEvent(document, 'drop', (e) => e.preventDefault())
	addEvent(el(ELT_AREA_INPUT), 'dragenter', function(e) {onDrag(true, e)});
	addEvent(el(ELT_AREA_INPUT), 'dragover', function(e) {onDrag(true, e)});
	addEvent(el(ELT_AREA_INPUT), 'dragleave', function(e) {onDrag(false, e)});
	addEvent(el(ELT_AREA_INPUT), 'drop', function(e) {onDrag(false, e);});
	addEvent(el(ELT_ROM_FILE), 'change', function() {onInputFile(this);});
	addEvent(el(ELT_ROM_FILE), 'click', function(e) {e.stopPropagation();});
	addEvent(el(ELT_ROM_BTN), 'click', function(e) {el(ELT_ROM_FILE).click();e.stopPropagation();});
	addEvent(el(ELT_AREA_INPUT), 'click', function(e) {if (this.classList.contains(CLASS_FIRST_DROP)) el(ELT_ROM_FILE).click()});
 	addEvent(el(ELT_AREA_INPUT), 'drop', function(e) {if (!this.classList.contains(CLASS_DISABLED)) onInputFile(e.dataTransfer);});
 	addEvent(el(ELT_PATCH_SELECT),'change', function() {onSelectPatch(this.value)});
 	addEvent(el(ELT_SHOW_ALL_OPTION),'change', updatePatchSelect);
	addEvent(el(ELT_APPLY), 'click',  function() {processPatchingTasks(gInputRom, gInputRomId, 1)});

	zip.useWebWorkers = true;
	zip.workerScriptsPath = PATH_LIBS + 'zip.js/';

	var forcedLanguage = new URLSearchParams(window.location.search).get("lang");
	setLanguage(forcedLanguage || navigator.language.substr(0,2));

	setUIBusy(false);
})


//==========================================
// USER EVENTS
//==========================================

function onDrag(val, e) {
	var col = el(ELT_AREA_INPUT);
 	if (val) {
		col.classList.add(CLASS_DRAG);
		if (e.target.classList.contains(CLASS_DISABLED)) {
			e.dataTransfer.effectAllowed = "none";
			e.dataTransfer.dropEffect = "none";
		} else {
			e.dataTransfer.effectAllowed = "copy";
			e.dataTransfer.dropEffect = "copy";
		}
	} else {
		col.classList.remove(CLASS_DRAG);
	}
	e.preventDefault();
}

function onInputFile(data) {
	try {
		var inputRom = new MarcFile(data, parseInputRom);
		el(ELT_ROM_LABEL).innerText = inputRom.fileName;
		gInputRom = inputRom;
		gInputRomId = null;
		updatePatchInfo(FOR_INPUT);
		setMessage(_('txtAnalyzingFile'), MSG_TYPE_LOADING);
		setUIBusy(true);
		clearPatchSelect();
		setGameAnim(); // stop any ongoing animation
	} catch(error) {
		setMessage(_('error_unknown_rom'), MSG_TYPE_ERROR);
	}
}

function onSelectPatch(value) {
	updateUIState();
	updatePatchInfo(FOR_OUTPUT);
}

//==========================================
// UI METHODS
//==========================================

function setLanguage(langId) {
	langId = langId || LANG_DEFAULT;
	gUserLanguage = LOCALIZATION[langId] || {};
	gUserLanguage.id = langId;

	gDefaultLanguage = LOCALIZATION[LANG_DEFAULT] || {};

	var translatableElements = document.querySelectorAll('*[data-localize]');
	for(var i = 0; i < translatableElements.length; i++) {
		if (translatableElements[i].tagName == "INPUT") {
			translatableElements[i].setAttribute("value", _(translatableElements[i].dataset.localize));
		} else if (translatableElements[i].tagName == "IMG") {
			translatableElements[i].alt = _(translatableElements[i].dataset.localize);
		} else {
			translatableElements[i].textContent = _(translatableElements[i].dataset.localize);
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
		el(ELT_SHOW_ALL_OPTION).disabled = true;
		el(ELT_APPLY).disabled = true;
		el(ELT_AREA_INPUT).classList.add(CLASS_DISABLED);
		el(ELT_AREA_INPUT).classList.remove(CLASS_FIRST_DROP);
	} else {
		el(ELT_ROM_FILE).disabled = false;
		el(ELT_ROM_BTN).disabled = false;
		el(ELT_PATCH_SELECT).disabled = el(ELT_PATCH_SELECT).options.length == 0;
		el(ELT_SHOW_ALL_OPTION).disabled = false;
		el(ELT_APPLY).disabled = !patchSelectVal() || !gInputRom;
		el(ELT_AREA_INPUT).classList.remove(CLASS_DISABLED);
		if (gInputRomId) {
			el(ELT_AREA_INPUT).classList.remove(CLASS_FIRST_DROP);
		} else {
			el(ELT_AREA_INPUT).classList.add(CLASS_FIRST_DROP);
		}
	}

	if (gInputRomId) {
		el(ELT_AREA_OUTPUT).classList.remove(CLASS_HIDDEN);
		el(ELT_ARROW).classList.remove(CLASS_HIDDEN);
	} else {
		el(ELT_AREA_OUTPUT).classList.add(CLASS_HIDDEN);
		el(ELT_ARROW).classList.add(CLASS_HIDDEN);
	}
}


function setMessage(msg, type) {
	var messageBox = el(ELT_MSG);
	messageBox.textContent = '';
	if (msg) {
		if (type === MSG_TYPE_LOADING) {
			messageBox.className = CLASS_MESSAGE;
			var span = document.createElement("span");
			span.className = MSG_CLASS[type];
			messageBox.appendChild(span);
			var text = document.createTextNode(` ${msg}`);
			messageBox.appendChild(text);
		} else {
			messageBox.className = CLASS_MESSAGE + " " + MSG_CLASS[type];
			if(type === MSG_TYPE_WARNING)
				messageBox.textContent = '⚠ ' + msg;
			else if(type === MSG_TYPE_ERROR)
				messageBox.textContent = '✗ ' + msg;
			else if(type === MSG_TYPE_OK)
				messageBox.textContent = '✓ ' + msg;
			else
				messageBox.textContent = msg;
		}
	}
}

// Builds the content in the scroll list and selects a default item
function updatePatchSelect() {
	var inputId = gInputRomId;

	var oldValue = patchSelectVal();
	var defaultSelectionCandidates = {};

	clearPatchSelect();
	if (inputId) {
		var showAllVersions = el(ELT_SHOW_ALL_OPTION).checked;
		for (var cur in PATCH_VERSIONS) { // let’s determine which entries can appear in the scroll list…
			var curObj = PATCH_VERSIONS[cur];
			var inputObj = PATCH_VERSIONS[inputId];
			// TODO simplify the next condition by adding methods in the prototypes
			if (inputId != cur && inputObj.hasPatchRouteTo(curObj)
				&& (showAllVersions || curObj.isWorthShowing())) {
				var opt = document.createElement("option");
				opt.value = cur;
				opt.text = PATCH_VERSIONS[cur].getDesc(false, true);
				opt.title = curObj.getExtraNote() || '';
				el(ELT_PATCH_SELECT).add(opt);

				if (curObj.isLatestVersion() && inputObj.isSameProjectAs(curObj) && !inputObj.isSpecialHidden()) {
					opt.text += " " + _("txtDescUpdate");
				}

				// Default selection
				if (oldValue && oldValue == cur) {
					defaultSelectionCandidates.oldValue = cur; // the value that was selected before
				} else if (oldValue && (curObj.isSameProjectAs(PATCH_VERSIONS[oldValue]))) {
					defaultSelectionCandidates.akinToOldValue = cur; // another version of the translation that was selected before
				} else if (!inputObj.isLatestVersion() && (inputObj.isSameProjectAs(curObj))) {
					defaultSelectionCandidates.updateInput = cur; // a value that will update the user’s input ROM
				} else if (curObj.getLangId().startsWith(gUserLanguage.id)) {
					defaultSelectionCandidates.userLanguage = cur; // a language that corresponds to the user
				} else if (curObj.isBaseRom()) {
					defaultSelectionCandidates.baseRom = cur; // a basic, unpatched ROM
				}

			}
		}
		// Default selection, in this priority order
		var defaultSelection = defaultSelectionCandidates.oldValue || defaultSelectionCandidates.akinToOldValue || defaultSelectionCandidates.updateInput || defaultSelectionCandidates.userLanguage || defaultSelectionCandidates.baseRom;
		if (defaultSelection) {
			//setTimeout(function() {
				el(ELT_PATCH_SELECT).value = defaultSelection;
			//}, 500);
		}
		updatePatchInfo(FOR_OUTPUT);
		//el(ELT_PATCH_SELECT).value = "";
		//updatePatchInfo(FOR_OUTPUT);
	}

	el(ELT_SHOW_ALL_CONTAINER).style.visibility = el(ELT_PATCH_SELECT).options.length ? "inherit" : "hidden"
}

function clearPatchSelect() {
    while (el(ELT_PATCH_SELECT).options.length > 0) {
        el(ELT_PATCH_SELECT).remove(0);
    }
    updatePatchInfo(FOR_OUTPUT);
}

function updatePatchInfo(target) {
	var id, infoFrame;
	switch (target) {
		case FOR_INPUT:
			id = gInputRomId;
			infoFrame = el(ELT_INFO_INPUT);
			break;
		case FOR_OUTPUT:
			id = patchSelectVal();
			infoFrame = el(ELT_INFO_OUTPUT);
			break;
		default:
			return;
	}
	infoFrame.textContent = '';

	if (id) {
		var patchObj = PATCH_VERSIONS[id];

		addEltsToFrame(infoFrame, [patchObj.getDesc(true, false)], CLASS_INFO_TITLE);

		var img = document.createElement("img");
		img.src = PATCH_BOXARTS + patchObj.getGameId() + (patchObj.getLangId() == LANG_JAPANESE ? LANG_JAPANESE : "") + ".jpg";
		img.alt = patchObj.getGameFullName();
		img.className = CLASS_INFO_BOXART;
		infoFrame.appendChild(img);

		var detailsDiv = document.createElement("div");
		detailsDiv.className = CLASS_INFO_DETAILS;
		infoFrame.appendChild(detailsDiv);

		if (patchObj.getExtraNote() || patchObj.getWebsite()) {
			var note = patchObj.getExtraNote();
			if (!note) {
				note = _('txtUpdateInfo');
			}
			if (patchObj.getWebsite()) {
				addLinkToFrame(detailsDiv, note, patchObj.getWebsite(), CLASS_INFO_VERSION_LABEL);
			} else {
				addEltsToFrame(detailsDiv, [note], CLASS_INFO_VERSION_LABEL);
			}
		} else if (patchObj.parentProject.getExtraNote()) {
			addEltsToFrame(detailsDiv, [patchObj.parentProject.getExtraNote()], CLASS_INFO_VERSION_LABEL);
		}

		if (patchObj.hasDoc()) {
			var docLink = document.createElement("a");
			docLink.href = `patches/${id}.txt`;
			docLink.setAttribute("download", `${_('txtReadmeFile')}-${id}.txt`);
			docLink.textContent =  _('txtReadDoc');
			addEltsToFrame(detailsDiv, [docLink], CLASS_INFO_DOC);
		}

		if (patchObj.parentProject.getWebsiteFallback()) {
			var urlStr = patchObj.parentProject.getWebsiteFallback();
			var text = _('txtVisitSite').replace("%", patchObj.getAuthorFallback());
			addLinkToFrame(detailsDiv, text, urlStr, CLASS_INFO_WEBSITE);
		}

		var nbUsesElts = _('txtNbUses').split("%");
		var nbUsesP = addEltsToFrame(infoFrame, nbUsesElts, CLASS_INFO_NB_USES);
		nbUsesP.classList.add(CLASS_INFO_LOADING);

		requestPatchUsage(id)
			.then(function(nbUses) {
				if (nbUsesP && nbUsesP.isConnected) { // to check if the view hasn’t been reloaded with another id since then
					addEltsToFrame(infoFrame, [_('txtNbUses').replace("%", nbUses)], CLASS_INFO_NB_USES).classList.remove(CLASS_INFO_LOADING);
				}
			})
			.catch(function() {
				if (nbUsesP && nbUsesP.isConnected) {
					addEltsToFrame(infoFrame, [_('txtNbUses').replace("%", _('txtNbUsesUnknown'))], CLASS_INFO_NB_USES).classList.remove(CLASS_INFO_LOADING);
				}
			});
	}
}

function addLinkToFrame(frameElt, text, url, className) {
	var websiteLink = document.createElement("a");
	websiteLink.title = websiteLink.href = url;
	websiteLink.setAttribute("target", "_blank");
	websiteLink.textContent = text;
	var urlObj = new URL(url);
	var baseUrl = urlObj.hostname.replace(/^www\./g,'');
	var websiteDetails = document.createElement("span");
	websiteDetails.textContent = _('txtVisitSiteAt').replace("%", baseUrl);
	websiteDetails.className = CLASS_INFO_LINK_HOST;
	addEltsToFrame(frameElt, [websiteLink, websiteDetails], className);
}

// For updatePatchInfo: creates a paragraph with multiple elements inside, and adds it to a specific parent frame
function addEltsToFrame(frameElt, eltsToAdd, className) {
	var paragraph;
	if (frameElt.getElementsByClassName(className).length) {
		paragraph = frameElt.getElementsByClassName(className)[0];
		paragraph.textContent = ''; // if the old paragraph exists, keep it and clear it
	} else {
		paragraph = document.createElement("p");
		paragraph.className = className;
		frameElt.appendChild(paragraph);
	}
	for (var i = 0; i < eltsToAdd.length; i++) {
		if (typeof(eltsToAdd[i]) == "string") {
			var textElt = document.createElement("span");
			textElt.textContent = eltsToAdd[i];
			eltsToAdd[i] = textElt;
		}
		paragraph.appendChild(eltsToAdd[i]);
	}
	return paragraph;
}

function reset() {
	gInputRom = null;
	gInputRomId = null;
    updatePatchInfo(FOR_INPUT);
	gPatchFiles = [];
	setMessage(_('txtSpecifyRom'));
	clearPatchSelect();
	setUIBusy(false);
}


//==========================================
// PATCHING METHODS
//==========================================

function parseInputRom() {
	gWorkerChecksum.onmessage = event => {
		onParsedInputRom(event.data);
	};
	gWorkerChecksum.onerror = event => {
		setMessage(_(event.message.replace('Error: ','')), MSG_TYPE_ERROR);
		setUIBusy(false);
	};

	if (gInputRom.readString(4).startsWith(ZIP_MAGIC)) {
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
    for (var i in PATCH_VERSIONS) {
        if (PATCH_VERSIONS[i].getCrc() == romCrc) {
            gInputRomId = i;
            setMessage('');
            updatePatchInfo(FOR_INPUT);
			setGameAnim(PATCH_VERSIONS[i].getGameId());
			el(ELT_PATCH_SELECT_LABEL).textContent = gInputRomId ? _('txtAllTranslations').replace('%', PATCH_VERSIONS[i].getGameShortName()) : '';
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
        setMessage(_("txtFinalizing")) // TODO errors
		countPatchUsage(romId)
			.then(function(hasIncreased) {
				//console.log('Increased usage data: ' + hasIncreased);
			})
			.catch(function() {
				console.warn('Failed to send patch usage.');
			})
			.finally(function() {
				deliverFinalRom(rom, romId);
			});
	} else {
		var patchId,nextRomIdAfterPatch;
		// If a baseRom is specified, then our input is not the baseRom => reverse patching
		if (!PATCH_VERSIONS[romId].isBaseRom() && PATCH_VERSIONS[romId].isReversible()) {
			patchId = romId;
			nextRomIdAfterPatch = PATCH_VERSIONS[romId].getBaseRomId();
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
		var patchFileName = PATCH_VERSIONS[patchId].getFileName();
		downloadPatch(patchFileName, rom)
			.then(function(patchFile) {
				setMessage(_("txtApplyingPatch").replace("%", step ? ` ${step}/2` : ""), MSG_TYPE_LOADING);;
				return applyPatch(rom, patchFile, PATCH_VERSIONS[nextRomIdAfterPatch].getCrc());
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
		//console.log("Downloading patch…");
		fetch(PATH_PATCH_FOLDER + patchFileName)
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
		//console.log("Applying patch…");
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

function deliverFinalRom(finalRomFile, romId) {
	finalRomFile.fileName=gInputRom.fileName.replace(/\.([^\.]*?)$/, ` (patched-${romId}).$1`);
	finalRomFile.save();
	setMessage('');
	setUIBusy(false);
}


//==========================================
// PATCH USAGE STATS METHODS
//==========================================

function requestPatchUsage(patchId) {
	return new Promise((successCallback, failureCallback) => {
		var preSuccess = function(result) {
			PATCH_VERSIONS[patchId].usage = result;
			successCallback(result);
		}

		if (PATCH_VERSIONS[patchId].usage) {
			successCallback(PATCH_VERSIONS[patchId].usage);
		} else if (!STATS_FAKE) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', `${STATS_VALUE_URL}&${STATS_VALUE_PARAM}=${patchId}`);
			xhr.onreadystatechange = function() {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status === 200) {
						preSuccess(xhr.responseText);
					} else {
						failureCallback();
					}
				}
			};
			xhr.onerror = function() {
				failureCallback();
			}
			xhr.send('');
		} else {
			setTimeout(function () {
				preSuccess(Math.floor(Math.random() * 1000) + "🤥");
			}, 2000);
		}
	});
}

function countPatchUsage(patchId) {
	return new Promise((successCallback, failureCallback) => {
		if (gStatsAlreadySent.includes(patchId)) { // don’t count a patchId twice for the same session
			successCallback(false);
		} else {
			PATCH_VERSIONS[patchId].usage++;
			var xhr = new XMLHttpRequest();
			xhr.open('POST', STATS_INCREMENT_URL);
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status === 200) {
						gStatsAlreadySent.push(patchId);
						successCallback(true);
					} else {
						failureCallback();
					}
				}
			};
			xhr.onerror = function() {
				failureCallback();
			}
			xhr.send(`${STATS_INCREMENT_PARAM}=${patchId}`);
		}
	});
}
