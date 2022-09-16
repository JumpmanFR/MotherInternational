const LANG_CODES = ['aa','ab','ae','af','ak','am','an','ar-EG','ar-DZ','ar-SD','ar-MA','ar-SA','ar-TN','ar-YE','as','av','ay','az','ba','be','bg','bh','bi','bm','bn','bo','br','bs','ca','ce','ch','co','cr','cs','cu','cv','cy','da','de','dv','dz','ee','el','en','eo','es-ES','es-AR','es-CO','es-MX','es-VE','es-PE','es-CL','et','eu','fa','ff','fi','fj','fo','fr','fy','ga','gd','gl','gn','gu','gv','ha','he','hi','ho','hr','ht','hu','hy','hz','ia','id','ie','ig','ii','ik','io','is','it','iu','ja','jv','ka','kg','ki','kj','kk','kl','km','kn','ko','kr','ks','ku','kv','kw','ky','la','lb','lg','li','ln','lo','lt','lu','lv','mg','mh','mi','mk','ml','mn','mr','ms','mt','my','na','nb','nd','ne','ng','nl','nn','no','nr','nv','ny','oc','oj','om','or','os','pa','pi','pl','ps','pt-BR','pt-PT','qu','rm','rn','ro','ru','rw','sa','sc','sd','se','sg','si','sk','sl','sm','sn','so','sq','sr','ss','st','su','sv','sw','ta','te','tg','th','ti','tk','tl','tn','to','tr','ts','tt','ty','ug','uk','ur','uz','ve','vi','vo','wa','wo','xh','yi','yo','za','zh','zh-CN','zh-HK','zh-TW','zu'];

var applyTimeout;

var latestVersions;

function _(str) {return LOCALIZATION["en"][str]}
function el(str) {return document.getElementById(str)}
function isTypeNewVersion() {return el("form-type").dataset.value == "type-new-version"}
function isTypeNewBaseRom() {return el("form-type").dataset.value == "type-new-baserom"}

document.addEventListener('DOMContentLoaded', function() {
    sortFillAnyParam("language", LANG_CODES, function() {
        return Utils.getFlagEmoji(this) + " " + Utils.getLangName(this, true);
    }, function() {return this}, function() {
        return Utils.getLangName(this, true);
    });
    sortFillAnyParam("authors", PATCH_VERSIONS, PatchVersion.prototype.getAuthorFallback);
    sortFillAnyParam("versions", PATCH_VERSIONS, function() {return this.getVersionValue()});
    fillPatches("existing-translations", PATCH_PROJECTS);

    el("form-type").addEventListener("change", onFormTypeChange);
    el("game").addEventListener("change", refreshListBaseroms);
    el("existing-translations").addEventListener("change", initListVersions);
    el("existing-translations").addEventListener("change", refreshListBaseroms);
    el("author").addEventListener("input", refreshRequiredVerAuthor);
    el("version").addEventListener("input", onVersionNameChange);
    el("version-button-latest").addEventListener("click", onVersionsMakeLatest);
    el("version-button-reset").addEventListener("click", initModelVersions);
    el("crc").addEventListener("input", onCrcChange);
    el("crc-hex").addEventListener("input", onCrcHexChange);
    el("version-override").addEventListener("change", onVersionOverrideChange);
    el("version-author").addEventListener("input", refreshRequiredAuthor);
    el("result-project").addEventListener("click", onClickResults);
    el("result-version").addEventListener("click", onClickResults);
    var allInputs = document.querySelectorAll("input, select");
    for (var i = 0; i < allInputs.length; i++) {
        allInputs[i].addEventListener("change", prepareApply);
        allInputs[i].addEventListener("input", prepareApply);
    }
});

function onVersionOverrideChange(event) {
    event.target.dataset.checked = event.target.checked;
    refreshShowHideOverrides();
	refreshRequiredAuthor();
}
function onCrcChange(event) {
    if (/^\d*$/.test(event.target.value) || !event.target.validity.valid) {
        el("crc-hex").disabled = false;
        el("crc-hex").checked = (el("crc-hex").dataset.checked == "true");
    } else {
        el("crc-hex").checked = true;
        el("crc-hex").disabled = true;
    }
}
function onCrcHexChange(event) {
    event.target.dataset.checked = event.target.checked;
}
function onClickResults(event) {
    event.target.select();
    event.target.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(event.target.value);
}
function onFormTypeChange(event) {
    el("form-type").dataset.value = event.target.id;
    refreshFormType();
	refreshListBaseroms();
    refreshRequiredVerAuthor();
}
function onVersionNameChange(event) {
    var version = event.target.value;
    if (el("new-version-row")) {
		el("new-version-row").dataset.version = version;
        el("new-version-row").querySelector('input[type=radio]').value = version;
        el("new-version-row").querySelector('input[type=checkbox]').value = version;
        el("new-version-row").querySelector('th').textContent = "This new version" + (version ? " (" + version + ")" : "");
    }
	el("version-button-latest").disabled = !version;
}
function onVersionsMakeLatest(event) {
	if (window.confirm("Also uncheck previously highlighted versions?")) {
		latestVersions = [el("version").value];
	} else {
		latestVersions.unshift(el("version").value);
	}
	refreshListVersions();
	
}
function onLatestVerListItemSelect(event) {
	latestVersions[0] = event.target.value;
	refreshListVersions();
	prepareApply();
}
function onHighlightVerListItemSelect(event) {
	if (event.target.checked) {
		if (!latestVersions.includes(event.target.value)) {
			latestVersions.push(event.target.value);
		}
	} else {
		var index = latestVersions.indexOf(event.target.value);
		if (index > 0) { // not -1 and not 0
			latestVersions.splice(index, 1);
		}
	}
	prepareApply();
}
function initListVersions() {
	var container = el("latest-versions-set");
	var tbody = container.querySelector("tbody");
	tbody.textContent = '';	
	var addRow = function(version, isNew) {
		var tr = document.createElement("tr");
		var textTh = document.createElement("th");
		textTh.textContent = isNew ? "This new version" : version || "[Unnamed version]";
		var latestTd = document.createElement("td");
		latestTd.className = "latest";
		var radioLabel = document.createElement("label");
		var radio = document.createElement("input");
		radio.type = "radio";
		radio.name = "latest";
		radio.value = version;
		radio.onchange = onLatestVerListItemSelect;
		var highlightTd = document.createElement("td");
		highlightTd.className = "highlight";
		var checkboxLabel = document.createElement("label");
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.value = version;
		checkbox.onchange = onHighlightVerListItemSelect;
		tbody.appendChild(tr);
		tr.appendChild(textTh);
		tr.appendChild(latestTd);
		tr.appendChild(highlightTd);
		if (isNew) {
			tr.id = "new-version-row";
		}
		tr.dataset.version = version;
		latestTd.appendChild(radioLabel);
		highlightTd.appendChild(checkboxLabel);
		radioLabel.appendChild(radio);
		checkboxLabel.appendChild(checkbox);
		return tr;
	}
	var projectVersions = PATCH_PROJECTS[el("existing-translations").value].getVersions();
	for (var i in projectVersions) {
		addRow(projectVersions[i].getVersionValue());//, projectVersions[i].isLatestVersion(), projectVersions[i].isAltLatestVersion());
	}
    if (projectVersions.length) {
		container.classList.remove("empty");
	} else {
		container.classList.add("empty");
	}
	var newRow = addRow("", true/*, false, false*/);
	newRow.id = "new-version-row";
	initModelVersions();
}
function initModelVersions() {
	latestVersions = [];
	var projectVersions = PATCH_PROJECTS[el("existing-translations").value].getVersions();
	for (var i in projectVersions) {
		if (projectVersions[i].isLatestVersion()) {
			latestVersions.unshift(projectVersions[i].getVersionValue());
		} else if (projectVersions[i].isAltLatestVersion() && !latestVersions.includes(projectVersions[i].getVersionValue())) {
			latestVersions.push(projectVersions[i].getVersionValue());
		}
	}
	refreshListVersions();
}
function refreshListVersions() {
	var versionRows = el("latest-versions-set").querySelectorAll("tbody tr");
	for (var i = 0; i < versionRows.length; i++) {
		if (versionRows[i].dataset.version == latestVersions[0]) {
			versionRows[i].querySelector("input[type=radio]").checked = true;
			versionRows[i].querySelector("td.highlight").style.display = "none";
		} else {
			versionRows[i].querySelector("input[type=checkbox]").checked = latestVersions.includes(versionRows[i].dataset.version);
			versionRows[i].querySelector("td.highlight").style.display = "";
		}
	}
}
function refreshFormType() {
    if (isTypeNewVersion()) {
		el("form-new-version").disabled = false;
		el("form-new-translation").disabled = true;
    } else {
 		el("form-new-version").disabled = true;
		el("form-new-translation").disabled = false;
	}

    if (isTypeNewBaseRom()) {
        el("baserom").required = false;
        el("format").required = false;
    } else {
        el("baserom").required = true;
        el("format").required = true;
    }

}
function refreshListBaseroms() {
    if (isTypeNewVersion() && el('existing-translations').value) {
        fillPatches("baserom", PATCH_VERSIONS, PATCH_PROJECTS[el('existing-translations').value].getGameId());
    } else {
        fillPatches("baserom", PATCH_VERSIONS, el("game").value);
    }
}
function refreshShowHideOverrides() {
    if (el("version-override").checked || (!isTypeNewVersion() && !el("author").value)) {
        el("version-override-set").disabled = false;
    } else {
        el("version-override-set").disabled = true;
    }
}

function refreshRequiredAuthor() {
    if (el("version-override").checked && el("version-author").value) {
		el("author").classList.remove("almost-required");
	} else {
		el("author").classList.add("almost-required");
	}
}
function refreshRequiredVerAuthor() {
    if (!isTypeNewVersion() && !el("author").value) {
        el("version-author").required = true;
        el("version-override").disabled = true;
        el("version-override").checked = true;
    } else {
        el("version-author").required = false;
        el("version-override").disabled = false;
        el("version-override").checked = (el("version-override").dataset.checked == "true");
    }
    refreshShowHideOverrides();
}
function sortFillAnyParam(parentElt, datatable, textFn, valueFn, sortFn) {
    parentElt.textContent = '';
    valueFn = valueFn || textFn;
    sortFn = sortFn || textFn;
    var allValues = {};
    for (var i in datatable) {
        allValues[sortFn.apply(datatable[i], [])] = {text:textFn.apply(datatable[i], []), value:valueFn.apply(datatable[i], [])};
    }
    var parentElt = el(parentElt);
    if (parentElt.tagName == "SELECT") {
        allValues[" "] = {text:'– Please select –', value:''};
    }
    Object.keys(allValues).sort().forEach(function(i) {
        var elt = document.createElement("option");
        elt.textContent = allValues[i].text;
        elt.value = allValues[i].value;
        if (!elt.value) {
            elt.disabled = elt.selected = true;
        }
        parentElt.appendChild(elt);
    });
}
function fillPatches(parentElt, datatable, gameFilter) {
    var parentElt = el(parentElt);
	if (gameFilter && gameFilter == parentElt.dataset.filter) {
		return;
	}
	parentElt.dataset.filter = gameFilter;
    parentElt.textContent = '';
    var elt = document.createElement("option");
    elt.value = '';
    elt.textContent = "– Please select –";
    elt.selected = elt.disabled = true;
    parentElt.appendChild(elt);
    for (var i in datatable) {
        if (gameFilter === undefined || gameFilter == datatable[i].getGameId()) {
            var elt = document.createElement("option");
            elt.value = i;
            elt.textContent = datatable[i].getDesc(true);
			if (datatable[i].getCrc) {
				elt.textContent += " (" + datatable[i].getCrc() + ")";
			}
            parentElt.appendChild(elt);
        }
    }
}
function prepareApply() {
	clearTimeout(applyTimeout);
	applyTimeout = setTimeout(apply, 400);
}

function apply() {
	if (el("form").checkValidity()) {
		var pjJson = {};
		if (isTypeNewVersion()) {
			pjJson.projectId = el('existing-translations').value;
			var pjObj = PATCH_PROJECTS[pjJson.projectId];
			pjJson.game = pjObj.getGameId();
			pjJson.lang = pjObj.getLangId();
			if (latestVersions.length > 1) {
				pjJson.latest = latestVersions;
			} else {
				pjJson.latest = latestVersions[0];
			}
			pjJson.author = pjObj.getAuthor() || undefined;
			pjJson.website = pjObj.getWebsite() || undefined;
			pjJson.extraNote = pjObj.getExtraNote() || undefined;
			pjJson.isOfficial = pjObj.isOfficial() || undefined;
			el("result-project-label").textContent = `Go to database.js and replace the line starting with “projectId:'${pjJson.projectId}'” in PATCH_PROJECTS with this: (click to copy)`;
		} else {
			var resGame = el("game").value;
			var resLang = el("language").value
			var resPjIdBase = resGame + "-" + resLang.split('-')[0];
			var suffix = '';
			if (PATCH_PROJECTS[resPjIdBase] || PATCH_PROJECTS[resPjIdBase + 'A']) {
				suffix = 'B';
				while (PATCH_PROJECTS[resPjIdBase + suffix]) {
					suffix = String.fromCharCode(suffix.charCodeAt(0) + 1);
				}
			}
			pjJson.projectId = resPjIdBase + suffix;
			pjJson.game = resGame;
			pjJson.lang = resLang;
			pjJson.author = el("author").value || undefined;
			pjJson.website = el("website").value || undefined;
			pjJson.extraNote = el("extra-note").value || undefined;
			pjJson.isOfficial = el("official").checked || undefined;
			el("result-project-label").textContent = "Append this to PATCH_PROJECTS in database.js: (click to copy)";

		}

		/*for (var i in LANG_LIST) { // to unify language varieties
			if (LANG_LIST[i].nameId == pjJson.lang) {
				pjJson.lang = i;
			}
		}*/

		var pjStr = JSON.stringify(pjJson);
		pjStr = pjStr.replace(/"(\w+)":/g, "$1:"); // remove quotes on keys
		pjStr = pjStr.replace(/(\w+):"([^"']*)"/g, "$1:'$2'"); // simple quotes for values
		pjStr = pjStr.replace(/(\w+):("[^"]+"|'[^']+'|\w+|\{[^\}]+\}|\[[^\]]+\]),/g, "$1:$2, "); // space after commas

		try { // let’s try to replace the language value with the associated const in const.js
			var constJs = el("constsjs").contentWindow.document.body.innerHTML;
			var re = new RegExp(`\\n\\s*const\\s+(LANG_[A-Z_]*)\\s*=\\s*['"]${pjJson.lang}['"];`);
			var langConst = constJs.match(re)[1];
			pjStr = pjStr.replace(/([,\s\t])lang:['"\w-]+([,\s\t\}])/, '$1lang:' + langConst + '$2');
		} catch (e) {
		}

		var verJson = {};

		var crcValue = parseInt(el("crc").value, el("crc-hex").checked ? 16 : 10);
		verJson.crc = '0x' + crcValue.toString("16").padStart(8, '0');

		verJson.projectId = pjJson.projectId;
		var resVersion = el("version").value;
		verJson.patchId = pjJson.projectId + resVersion.replace(/\./g,"");
		if (!isTypeNewBaseRom()) {
			if (el("zip").checked) {
				verJson.patchExt = ".zip";
			} else {
				verJson.patchExt = "." + el("format").value;
			}
			verJson.baserom = el("baserom").value;
		}
		verJson.hasDoc = el("readme").checked || undefined;
		verJson.year = el("year").value || undefined;
		verJson.version = resVersion || undefined;
		verJson.isSpecialHidden = el("special-hidden").checked || undefined;
		verJson.extraNote = el("version-extra-note").value || undefined;
		if (el("version-override").checked) {
			verJson.author = el("version-author").value || undefined
			verJson.website = el("version-website").value || undefined;
		}
		verJson.isOneWayOnly = (el("format").value != 'ups') || undefined;

		var verStr = JSON.stringify(verJson);
		verStr = verStr.replace(/"(\w+)":/g, "$1:"); // remove quotes on keys
		verStr = verStr.replace(/(\w+):"([^"']*)"/g, "$1:'$2'");  // simple quotes for values
		verStr = verStr.replace(/(\w+):("[^"]+"|'[^']+'|\w+|\{[^\}]+\}|\[[^\]]+\]),/g, "$1:$2, "); // space after commas

		el("result-project").value = pjStr
		el("result-version").value = verStr;

		var instrArray = [];
		if (!isTypeNewBaseRom()) {
			if (el("zip").checked) {
				instrArray.push(`Create a zip archive that only contains your patch file, name it ${verJson.patchId}.zip and upload it to the patches folder on the server.`);
			} else {
				instrArray.push(`Rename your patch file ${verJson.patchId}${verJson.patchExt} and upload it to the patches folder on the server.`);
			}
		}
		if (verJson.hasDoc) {
			instrArray.push(`Rename the readme file of the translation ${verJson.patchId}.txt and upload it to the patches folder on the server.`);
		}
		if (isTypeNewBaseRom()) {
			instrArray.push("Go to Mother International and make sure your new base ROM is working as expected: ROM info display on the UI and patching from this ROM if appropriate.");
		} else if (verJson.isOneWayOnly) {
			instrArray.push("Go to Mother International and make sure your new translation is working as expected: readme file, translation info on the UI, credits and patching.");
		} else {
			instrArray.push("Go to Mother International and make sure your new translation is working as expected: readme file, translation info on the UI, credits and patching in both directions (by generating the translated ROM *and* using it as in input).");
		}

		var instrElt = el("instructions");
		instrElt.textContent = '';
		for (var i in instrArray) {
			var li = document.createElement("li");
			li.textContent = instrArray[i];
			instrElt.appendChild(li);
		}
	}

}
