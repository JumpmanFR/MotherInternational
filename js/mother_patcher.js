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

var gLocalTexts, gDefaultTexts;
var gUserPrefLangId;

var gIsBusy, gIsInputDone;

var gInputRom, gInputRomId;

var gAudioContext, gAudioBuffer;

// Init from external files
var gWorkerChecksum = new Worker(PATH_LIBS + 'worker_crc.js');
var gWorkerApply = new Worker(PATH_LIBS + 'worker_apply.js');

// Shortcuts
function addEvent(e,ev,f) {e.addEventListener(ev,f,false)}
function el(e) {return document.getElementById(e)}
function _(str) {return gLocalTexts[str] != undefined ? gLocalTexts[str] : (gDefaultTexts[str] != undefined ? gDefaultTexts[str] : str)}
function patchSelectVal() {return el(ELT_PATCH_SELECT).value}


//==========================================
// EVENT METHODS AND ENTRY POINTS
//==========================================

addEvent(document, 'DOMContentLoaded', function() {
	if (window.frameElement) {
		window.parent.location.href = window.location.href;
	}

	document.body.onresize = onResize;
	addEvent(document, 'dragover', (e) => e.preventDefault())
	addEvent(document, 'drop', (e) => e.preventDefault())
	addEvent(el(ELT_AREA_INPUT), 'dragenter', function(e) {onDrag(true, e)});
	addEvent(el(ELT_AREA_INPUT), 'dragover', function(e) {onDrag(true, e)});
	addEvent(el(ELT_AREA_INPUT), 'dragleave', function(e) {onDrag(false, e)});
	addEvent(el(ELT_AREA_INPUT), 'drop', function(e) {onDrag(false, e);});
	addEvent(el(ELT_ROM_FILE), 'change', function() {onInputFile(this);});
	addEvent(el(ELT_ROM_FILE), 'click', function(e) {e.stopPropagation();});
	addEvent(el(ELT_ROM_BTN), 'click', function(e) {el(ELT_ROM_FILE).click(); e.stopPropagation();});
	addEvent(el(ELT_AREA_INPUT), 'click', function(e) {if (this.classList.contains(CLASS_DROP_FIRST)) el(ELT_ROM_FILE).click()});
 	addEvent(el(ELT_AREA_INPUT), 'drop', function(e) {if (!this.classList.contains(CLASS_DISABLED)) onInputFile(e.dataTransfer);});
 	addEvent(el(ELT_PATCH_SELECT),'change', function() {onSelectPatch(this.value)});
 	addEvent(el(ELT_SHOW_ALL_OPTION),'change', function() {updatePatchSelect()});
	addEvent(el(ELT_APPLY), 'click',  function() {startApply(gInputRom, gInputRomId, patchSelectVal())});

	initAudio();

	zip.useWebWorkers = true;
	zip.workerScriptsPath = PATH_LIBS + 'zip.js/';

	if (!Utils.areFlagEmojiSupported()) {
		document.body.classList.add(CLASS_NO_FLAG_EMOJIS);
	}

	var urlParams = new URLSearchParams(window.parent.location.search);

	var customLang = urlParams.get("lang");
	var isForcedLang = !!urlParams.get("force_lang")
	setLanguage(customLang || navigator.language, isForcedLang);

	if (!!urlParams.get("orig_theme") && document.getElementById("style-m4e")) {
		document.getElementById("style-m4e").remove();
	}

	setUIState(false, false);
})


//==========================================
// USER EVENTS
//==========================================

function onDrag(val, e) {
	var area = el(ELT_AREA_INPUT);
 	if (val) {
		if (area.classList.contains(CLASS_DISABLED)) {
			e.dataTransfer.effectAllowed = "none";
			e.dataTransfer.dropEffect = "none";
		} else {
			area.classList.add(CLASS_DRAG);
			e.dataTransfer.effectAllowed = "copy";
			e.dataTransfer.dropEffect = "copy";
		}
	} else {
		area.classList.remove(CLASS_DRAG);
	}
	e.preventDefault();
}

function onInputFile(data) {
	if (!data || data.files.length == 0) {
		return;
	}
	gInputRomId = null;
	data = data.files[0];
	el(ELT_ROM_FILENAME).textContent = data ? data.name : '';
	clearPatchSelect();
	setGameAnim(); // stop any ongoing animation
	setDynamicLocalText(el(ELT_CHECKSUM), '');
	updatePatchInfo(FOR_INPUT);
	setUIState(true, false);
	try {
		var inputRom = new MarcFile(data, parseInputRom);
		gInputRom = inputRom;
		setMessage('txtAnalyzingFile', MSG_TYPE_LOADING);
	} catch(error) {
		setMessage('error_unknown_rom', MSG_TYPE_ERROR);
		setUIState(false);
	}
}

function onSelectPatch(value) {
	refreshUIState();
	updatePatchInfo(FOR_OUTPUT);
}

function onResize() {
	var aboutWin = el(ELT_ABOUT_WINDOW);
	if (aboutWin.clientHeight >= aboutWin.scrollHeight) {
		aboutWin.scrollTop = 0; // because Safari fails to reset scroll position
	}
}

//==========================================
// UI METHODS
//==========================================

function initAudio() {
	gAudioContext = new AudioContext();
	window.fetch(SFX_PATH)
		.then(response => response.arrayBuffer())
	    .then(arrayBuffer => gAudioContext.decodeAudioData(arrayBuffer))
	    .then(audioBuffer => {
	      gAudioBuffer = audioBuffer;
	    });
}

function setLanguage(langId, isForced) {
	var langDefaultId = LANG_DEFAULT.substr(0,2);
	langId = (langId || LANG_DEFAULT).substr(0,2);
	gDefaultTexts = LOCALIZATION[langDefaultId] || {};
	if (LOCALIZATION[langId]) {
		gLocalTexts = LOCALIZATION[langId];
		document.documentElement.setAttribute("lang", langId);
	} else if (isForced) {
		gLocalTexts = {};
		document.documentElement.setAttribute("lang", langId);
	} else {
		gLocalTexts = {};
		document.documentElement.setAttribute("lang", langDefaultId);
	}

	gUserPrefLangId = langId;

	var translatableElements = document.querySelectorAll('*[data-localize]');
	for(var i = 0; i < translatableElements.length; i++) {
		var str = _(translatableElements[i].dataset.localize);
		if (translatableElements[i].dataset.param) {
			str = str.replace('%', _(translatableElements[i].dataset.param));
		}
		if (translatableElements[i].tagName == "INPUT") {
			translatableElements[i].setAttribute("value", str);
		} else if (translatableElements[i].tagName == "IMG") {
			translatableElements[i].alt = str;
		} else {
			if (translatableElements[i].dataset.htmlcontent) {
				translatableElements[i].innerHTML = str;
			} else {
				translatableElements[i].textContent = str;
			}
		}
	}
}

function setDynamicLocalText(elt, strId, param) {
	if (strId) {
		elt.dataset.localize = strId;
		elt.dataset.param = param;
	} else {
		delete elt.dataset.localize;
		delete elt.dataset.param;
	}
	str = _(strId);
	if (param) {
		str = str.replace('%', param);
	}
	elt.textContent = elt.title = str;
}

function setUIState(busy, inputDone) {
	gIsBusy = busy;
	if (inputDone !== undefined) {
		gIsInputDone = inputDone;
	}
	refreshUIState();
}

// Enables fields and buttons depending on busy status, specified fields and errors
function refreshUIState() {
	if (gIsBusy) {
		el(ELT_ROM_FILE).disabled = true;
		el(ELT_ROM_BTN).disabled = true;
		el(ELT_PATCH_SELECT).disabled = true;
		el(ELT_SHOW_ALL_OPTION).disabled = true;
		el(ELT_APPLY).disabled = true;
		el(ELT_AREA_INPUT).classList.add(CLASS_DISABLED);
		el(ELT_AREA_OUTPUT).classList.add(CLASS_DISABLED);
		el(ELT_AREA_INPUT).classList.remove(CLASS_DROP_FIRST);
	} else {
		el(ELT_ROM_FILE).disabled = false;
		el(ELT_ROM_BTN).disabled = false;
		el(ELT_PATCH_SELECT).disabled = !el(ELT_PATCH_SELECT).options.length || !el(ELT_PATCH_SELECT).value;
		el(ELT_SHOW_ALL_OPTION).disabled = !gIsInputDone;
		el(ELT_APPLY).disabled = !patchSelectVal() || !gInputRom;
		el(ELT_AREA_INPUT).classList.remove(CLASS_DISABLED);
		el(ELT_AREA_OUTPUT).classList.remove(CLASS_DISABLED);
		if (gInputRomId) {
			el(ELT_AREA_INPUT).classList.remove(CLASS_DROP_FIRST);
		} else {
			el(ELT_AREA_INPUT).classList.add(CLASS_DROP_FIRST);
		}
	}

	if (gIsInputDone) {
		el(ELT_AREA_OUTPUT).classList.remove(CLASS_HIDDEN_FIRST);
		el(ELT_AREA_OUTPUT).classList.remove(CLASS_HIDDEN);
		el(ELT_ARROW).classList.remove(CLASS_HIDDEN_FIRST);
		el(ELT_ARROW).classList.remove(CLASS_HIDDEN);
	} else {
		el(ELT_AREA_OUTPUT).classList.add(CLASS_HIDDEN);
		el(ELT_ARROW).classList.add(CLASS_HIDDEN);
	}
}


function setMessage(msgId, type, param) {
	var messageBox = el(ELT_MSG);
	if (msgId) {
		if (type === MSG_TYPE_LOADING) {
			var spinSpan, textSpan;
			if (messageBox.classList.contains(MSG_CLASS[type])) { // reuse the spinner instead of recreating it
				spinSpan = messageBox.querySelector('.' + CLASS_MESSAGE_LOADING_SPIN);
				textSpan = messageBox.querySelector('.' + CLASS_MESSAGE_LOADING_TEXT);
			} else {
				setDynamicLocalText(messageBox, '');
				spinSpan = document.createElement("span");
				textSpan = document.createElement("span");
				spinSpan.className = CLASS_MESSAGE_LOADING_SPIN;
				textSpan.className = CLASS_MESSAGE_LOADING_TEXT;
				messageBox.appendChild(spinSpan);
				messageBox.appendChild(textSpan);
			}
			setDynamicLocalText(textSpan, msgId, param);
		} else {
			setDynamicLocalText(messageBox, msgId, param);
		}
		messageBox.className = CLASS_MESSAGE + " " + MSG_CLASS[type];
	} else {
		setDynamicLocalText(messageBox, '');
		messageBox.className = CLASS_MESSAGE;
	}
}

// Builds the content in the scroll list and selects a default item
function updatePatchSelect(showAllIfEmpty) {
	var inputId = gInputRomId;

	var oldSelection = patchSelectVal();
	var defaultSelectionCandidates = {};

	clearPatchSelect();
	if (inputId) {
		var showAllVersions = el(ELT_SHOW_ALL_OPTION).checked;
		Object.keys(PATCH_VERSIONS).sort(function(a, b) {
			return PATCH_VERSIONS[a].sort(PATCH_VERSIONS[b]);
		}).forEach(function(cur) {
			var curObj = PATCH_VERSIONS[cur];
			var inputObj = PATCH_VERSIONS[inputId];
			if (inputId != cur && (curObj.getGameId() == inputObj.getGameId())
				&& (showAllVersions || curObj.isWorthShowing())) {
				var opt = document.createElement("option");
				opt.value = cur;
				opt.text = PATCH_VERSIONS[cur].getDesc(false, true);
				opt.title = curObj.getExtraNote() || '';
				el(ELT_PATCH_SELECT).add(opt);

				if (!findRoute(inputId, cur)) {
					opt.text += " ⛔";
					opt.className = CLASS_OPTION_UNAVAILABLE;
					return;
				}

				if (curObj.isUpdateOf(inputObj)) {
					opt.text += " " + _("txtDescUpdate");
				}

				// Default selection
				if (oldSelection && oldSelection == cur) {
					defaultSelectionCandidates.oldSelection = cur; // the value that was selected before
				} else if (oldSelection && (curObj.isSameProjectAs(PATCH_VERSIONS[oldSelection]))) {
					defaultSelectionCandidates.sameProject = cur; // another version of the translation that was selected before
				} else if (curObj.isLatestVersion() && (inputObj.isSameProjectAs(curObj))) {
					defaultSelectionCandidates.updateInput = cur; // a value that will update the user’s input ROM
				} else if (!inputObj.isAltLatestVersion() && (inputObj.isSameProjectAs(curObj))) {
					defaultSelectionCandidates.otherVersion = cur; // another version of the user’s input ROM
				} else if (curObj.getLangId().startsWith(gUserPrefLangId)) {
					defaultSelectionCandidates.userLanguage = cur; // a language that corresponds to the user
				} else if (curObj.parentProject.isOfficial()) {
					defaultSelectionCandidates.official = cur; // a basic, unpatched ROM
				}

			}
		});
		var defaultSelection = defaultSelectionCandidates.oldSelection || defaultSelectionCandidates.sameProject || defaultSelectionCandidates.updateInput
				|| defaultSelectionCandidates.otherVersion || defaultSelectionCandidates.userLanguage || defaultSelectionCandidates.official;
		if (defaultSelection) {
			el(ELT_PATCH_SELECT).value = defaultSelection;
		}

		if (!el(ELT_PATCH_SELECT).options.length) { // if the list ends up being empty...
			if (showAllIfEmpty && !showAllVersions) {
				el(ELT_SHOW_ALL_OPTION).checked = true;
				return updatePatchSelect();
			} else {
				var emptyOpt = document.createElement("option");
				emptyOpt.value = '';
				emptyOpt.text = _('txtNoTranslation');
				emptyOpt.hidden = emptyOpt.disabled = emptyOpt.selected = true;
				el(ELT_PATCH_SELECT).add(emptyOpt);
			}
		}

		updatePatchInfo(FOR_OUTPUT);
		refreshUIState();
	}
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

		addEltsToFrame(infoFrame, [
			patchObj.parentProject.getLangFlag() + ' ',
			patchObj.getDesc(true, false),
			' (' + patchObj.getYear() + ')'
		], CLASS_INFO_TITLE);

		// Box art
		var img = document.createElement("img");
		img.src = PATCH_BOXARTS + patchObj.parentProject.getBoxart();
		img.alt = patchObj.getGameLocalName();
		img.className = CLASS_INFO_BOXART;
		infoFrame.appendChild(img);

		// Info and website for this version
		var detailsDiv = document.createElement("div");
		detailsDiv.className = CLASS_INFO_REFERENCES;
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

		// Readme file
		if (patchObj.hasDoc()) {
			var docLink = document.createElement("a");
			docLink.href = `patches/${id}.txt`;
			docLink.setAttribute("download", `${_('txtReadmeFile')} ${patchObj.getGameLocalName()} ${patchObj.getExportName()}.txt`);
			docLink.title = docLink.textContent =  _('txtReadDoc');
			addEltsToFrame(detailsDiv, [docLink], CLASS_INFO_DOC);
		}

		// Website
		if (patchObj.parentProject.getWebsiteFallback()) {
			var urlStr = patchObj.parentProject.getWebsiteFallback();
			var text = _('txtVisitSite').replace('%', patchObj.parentProject.getAuthorFallback());
			addLinkToFrame(detailsDiv, text, urlStr, CLASS_INFO_WEBSITE);
		}

		// Patch usage
		if (target == FOR_OUTPUT || !patchObj.parentProject.isOfficial()) {
			var nbUsesElts = _('txtUsage').split('%');
			var nbUsesP = addEltsToFrame(infoFrame, nbUsesElts, CLASS_INFO_NB_USES);
			nbUsesP.classList.add(CLASS_INFO_LOADING);

			patchObj.requestPatchUsage()
				.then(function(nbUses) {
					if (nbUsesP && nbUsesP.isConnected) { // to check if the view hasn’t been reloaded with another id since then
						addEltsToFrame(infoFrame, [_('txtUsage').replace('%', _('txtUsageXTimes')).replace('%', nbUses)], CLASS_INFO_NB_USES).classList.remove(CLASS_INFO_LOADING);
					}
				})
				.catch(function() {
					if (nbUsesP && nbUsesP.isConnected) {
						addEltsToFrame(infoFrame, [_('txtUsage').replace('%', _('txtUsageUnknown'))], CLASS_INFO_NB_USES).classList.remove(CLASS_INFO_LOADING);
					}
				});
		}

		if (target == FOR_OUTPUT) { // output-specific stuff, like button text
			if (!findRoute(gInputRomId, id)) {
				el(ELT_APPLY).value = '⚠ ' + _('txtApplyPatch');
			} else if (patchObj.isUpdateOf(PATCH_VERSIONS[gInputRomId])) {
				el(ELT_APPLY).value = _('txtUpdate');
			} else {
				el(ELT_APPLY).value = _('txtApplyPatch');
			}
		}
	} else {
		if (target == FOR_OUTPUT) {
			el(ELT_APPLY).value = _('txtApplyPatch');
		}
	}
}

function addLinkToFrame(frameElt, text, url, className) {
	var websiteLink = document.createElement("a");
	websiteLink.href = url;
	websiteLink.setAttribute("target", "_blank");
	websiteLink.setAttribute("rel", "noopener");
	websiteLink.title = websiteLink.textContent = text;
	var websiteDetails = document.createElement("span");
	websiteDetails.title = websiteDetails.textContent = _('txtVisitSiteAt').replace('%', Utils.getHostname(url));
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
			textElt.title = eltsToAdd[i];
			eltsToAdd[i] = textElt;
		}
		paragraph.appendChild(eltsToAdd[i]);
	}
	return paragraph;
}

function playGoSound() {
	const source = gAudioContext.createBufferSource();
	source.buffer = gAudioBuffer;
	var gainNode = gAudioContext.createGain();
	gainNode.gain.value = SFX_VOLUME;
	gainNode.connect(gAudioContext.destination);
	source.connect(gainNode);
	source.start();
}

function reset() {
	setGameAnim();
	setUIState(false, false);
	// Input
	gInputRom = null;
	gInputRomId = null;
    updatePatchInfo(FOR_INPUT);
	setDynamicLocalText(el(ELT_CHECKSUM), '');
	el(ELT_ROM_FILENAME).textContent = '';
	el(ELT_AREA_INPUT).classList.add(CLASS_DROP_FIRST);
	el(ELT_AREA_OUTPUT).classList.add(CLASS_HIDDEN_FIRST);
	setMessage('txtDropRom');
	// Output
	clearPatchSelect();
}


//==========================================
// PATCHING METHODS
//==========================================

function parseInputRom() {
	gWorkerChecksum.onmessage = event => {
		onParsedInputRom(event.data);
	};
	gWorkerChecksum.onerror = event => {
		setMessage(event.message.replace('Error: ',''), MSG_TYPE_ERROR);
		setUIState(false);
	};

	if (gInputRom.readString(4).startsWith(ZIP_MAGIC)) {
		setMessage('txtUnzipping', MSG_TYPE_LOADING)
        parseZIPFile(gInputRom, ROMS_IN_ZIP)
        	.then(unzippedFile => {
        		if (unzippedFile) {
					setMessage('txtAnalyzingRom', MSG_TYPE_LOADING);
					gInputRom = unzippedFile;
					gWorkerChecksum.postMessage({u8array:unzippedFile._u8array, startOffset:0}, [unzippedFile._u8array.buffer]);
				} else {
					setMessage('error_no_rom_in_zip', MSG_TYPE_ERROR);
					setUIState(false);
				}
        	})
        	.catch(function() {
				setMessage('error_unzipping', MSG_TYPE_ERROR);
				setUIState(false);
       	});
	} else {
		setMessage('txtAnalyzingRom', MSG_TYPE_LOADING)
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
        }
    }

    if (gInputRomId) {
		setMessage('txtRomIdentified', MSG_TYPE_OK);
		updatePatchInfo(FOR_INPUT);
		setDynamicLocalText(el(ELT_CHECKSUM), 'txtChecksum', Utils.toHex(PATCH_VERSIONS[gInputRomId].getCrc()));
		setDynamicLocalText(el(ELT_PATCH_SELECT_LABEL), gInputRomId ? 'txtAllTranslations' : 'txtNoTranslation', PATCH_VERSIONS[gInputRomId].getGameFullName());
		el(ELT_SHOW_ALL_OPTION).checked = false;
		updatePatchSelect(true);
		setTimeout(function() {
			setGameAnim(PATCH_VERSIONS[gInputRomId].getGameId());
			setUIState(false, true);
		}, 600);
	} else {
        setMessage("error_unknown_rom", MSG_TYPE_ERROR);
		setDynamicLocalText(el(ELT_CHECKSUM), 'txtChecksum', Utils.toHex(data.crc32));
		updatePatchSelect();
		setUIState(false);
    }
}

function startApply(rom, romId, destination) {
	if (!romId) {
		endProcessWithError(_("error_no_rom_info"));
		return;
	}
	var route = findRoute(romId, destination);
	if (route && route.length > 1) {
		processListOfPatches(rom, route, 0);
		playGoSound();
	} else {
		endProcessWithError(_("error_no_patch_route"));
	}
}

// Recursive function; finds a sequence of patches to apply, to turn one ROM into another
function findRoute(start, destination, currentRoute) {
	if (!currentRoute) {
		currentRoute = [];
	}
	if (!PATCH_VERSIONS[start] || !PATCH_VERSIONS[destination]) {
		return null;
	}
	var currentRouteClone = [...currentRoute];
	currentRouteClone.push(start);
	if (start == destination) {
		return currentRouteClone;
	} else {
		for (var i in PATCH_VERSIONS) { // look deeper
			if (i != start && PATCH_VERSIONS[i].getBaseRomId() == start && !currentRoute.includes(i)) {
				var lookDeeper = findRoute(i, destination, currentRouteClone);
				if (lookDeeper) {
					return lookDeeper;
				}
			}
		}
		if (!currentRoute.includes(PATCH_VERSIONS[start].getBaseRomId())
				&& PATCH_VERSIONS[start].isReversible()) {
			var lookHigher = findRoute(PATCH_VERSIONS[start].getBaseRomId(), destination, currentRouteClone);
			if (lookHigher) {
				return lookHigher;
			}
		}
	}
	return null;
}

// Recursive function; applies list of patches to ROM according to the given route
function processListOfPatches(rom, route, step) {
	setUIState(true);

	if (!rom) {
		endProcessWithError(_("error_no_rom"));
		return;
	}

	if (step + 1 < route.length) {
		var destId = route[step + 1];
		var patchId;
		if (PATCH_VERSIONS[route[step]].getBaseRomId() == route[step + 1]) { // reverse patching
			patchId = route[step];
		} else { // normal patching
			patchId = destId;
		}
		var progressStr = '';
		if (route.length > 2) {
			progressStr += ` ${step + 1}/${route.length - 1}`;
		}

		setMessage("txtDownloading", MSG_TYPE_LOADING, progressStr);
		var patchFileName = PATCH_VERSIONS[patchId].getPatchFileName();
		downloadPatch(patchFileName, rom)
			.then(function(patchFile) {
				setMessage("txtApplyingPatch", MSG_TYPE_LOADING, progressStr);
				return applyPatch(rom, patchFile, PATCH_VERSIONS[destId].getCrc());
			})
			.then(function(outputRom) {
				processListOfPatches(outputRom, route, step + 1);
			})
			.catch(function(errorMsg) {
				endProcessWithError(_(errorMsg || "error_patching"));
			});
	} else { // our process is finished now!
		setMessage("txtFinalizing")
		var finalPatch = PATCH_VERSIONS[route[step]];
		finalPatch.incrementPatchUsage()
			.then(function(nbUses) {
				if (!nbUses) {
					//console.log('Already incremented this one!');
				} else {
					//console.log('Incremented usage data: ' + nbUses);
				}
			})
			.catch(function() {
				console.warn('Failed to increment patch usage.');
			})
			.finally(function() {
				updatePatchInfo(FOR_OUTPUT);
				deliverFinalRom(rom, finalPatch);
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
						failureCallback(response.statusText.replace('Error: ',''));
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
				failureCallback(event.data.errorMessage);
			} else {
				var patchedRom = new MarcFile(event.data.patchedRomU8Array.buffer);
				patchedRom.crc32 = event.data.crc32;
				if (crc32(patchedRom) == expectedChecksum) {
					successCallback(patchedRom);
				} else {
					failureCallback();
				}
			}
		}
		gWorkerApply.onerror = event => {
			failureCallback(event.message.replace('Error: ',''));
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
	setUIState(false);
}

function deliverFinalRom(finalRomFile, finalPatch) {
	var fileNameAppend = ` (${finalPatch.getExportName()})`;
	finalRomFile.fileName = gInputRom.fileName.replace(/\.([^\.]*?)$/, fileNameAppend + '.$1');
	finalRomFile.save();
	setMessage('txtEndMsg', MSG_TYPE_OK);
	setUIState(false);
}
