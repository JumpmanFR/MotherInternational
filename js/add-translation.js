const TYPE_NEW_BASEROM = "type-new-baserom";
const TYPE_NEW_TRANSLATION = "type-new-translation";
const TYPE_NEW_VERSION = "type-new-version";

const LANG_CODES = ['aa','ab','ae','af','ak','am','an','ar','as','av','ay','az','ba','be','bg','bh','bm','bi','bn','bo','br','bs','ca','ce','ch','co','cr','cs','cu','cv','cy','da','de','dv','dz','ee','el','en','eo','es-ES','es-AR','es-MX','et','eu','fa','ff','fi','fj','fo','fr','fy','ga','gd','gl','gn','gu','gv','ha','he','hi','ho','hr','ht','hu','hy','hz','ia','id','ie','ig','ii','ik','io','is','it','iu','ja','jv','ka','kg','ki','kj','kk','kl','km','kn','ko','kr','ks','ku','kv','kw','ky','la','lb','lg','li','ln','lo','lt','lu','lv','mg','mh','mi','mk','ml','mn','mr','ms','mt','my','na','nb','nd','ne','ng','nl','nn','no','nr','nv','ny','oc','oj','om','or','os','pa','pi','pl','ps','pt-BR','pt-PT','qu','rm','rn','ro','ru','rw','sa','sc','sd','se','sg','si','sk','sl','sm','sn','so','sq','sr','ss','st','su','sv','sv-SE','sv-FI','sw','ta','te','tg','th','ti','tk','tl','tn','to','tr','ts','tt','tw','ty','ug','uk','ur','uz','ve','vi','vo','wa','wo','xh','yi','yo','za','zh','zh-CN','zh-HK','zh-TW','zu'];

function _(str) {return LOCALIZATION["en"][str]}
function el(str) {return document.getElementById(str)}

function sortFillAnyParam(parentElt, datatable, textFn, valueFn) {
    parentElt.textContent = '';
    valueFn = valueFn || textFn;
    var allValues = {};
    for (var i in datatable) {
        allValues[textFn.apply(datatable[i], [])] = valueFn.apply(datatable[i], []);
    }
    var parentElt = el(parentElt);
    if (parentElt.tagName == "SELECT") {
        allValues[" – Please select – "] = ""; // keep initial space to make it appear on top
    }
    Object.keys(allValues).sort().forEach(function(i) {
        var elt = document.createElement("option");
        elt.textContent = i;
        elt.value = allValues[i];
        if (!elt.value) {
            elt.disabled = elt.selected = true;
        }
        parentElt.appendChild(elt);
    });
}
function fillPatches(parentElt, datatable, gameFilter) {
    var parentElt = el(parentElt);
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
            parentElt.appendChild(elt);
        }
    }
}
function fillVersions(parentElt, project) {
    var parentElt = el(parentElt);
    parentElt.textContent = '';
    var projectVersions = project.getVersions();
    for (var i in projectVersions) {
        var label = document.createElement("label");
        var elt = document.createElement("input");
        elt.type = "checkbox";
        elt.value = projectVersions[i].getVersionValue();
        if (projectVersions[i].isAltLatestVersion()) {
            elt.checked = true;
        }
        label.appendChild(elt);
        label.appendChild(document.createTextNode(projectVersions[i].getVersionValue() || "[Default version]"));
        parentElt.appendChild(label);
    }
    var label = document.createElement("label");
    var elt = document.createElement("input");
    elt.type = "checkbox";
    elt.id = "new-version";
    elt.setAttribute("disabled", "disabled");
    label.appendChild(elt);
    label.style = "color: grey;";
    var labelTxt = document.createElement("span");
    labelTxt.id = "new-version-label";
    label.appendChild(labelTxt);
    parentElt.appendChild(label);
    refreshNewVersion();
}
function refreshFormType() {
    el("form").className = el("form-type").dataset.value;

    if (el("form-type").dataset.value == TYPE_NEW_VERSION) {
        el("game").required = false;
        el("language").required = false;
        el("existing-translations").required = true;
    } else {
        el("game").required = true;
        el("language").required = true;
        el("existing-translations").required = false;
    }

    if (el("form-type").dataset.value == TYPE_NEW_BASEROM) {
        el("baserom").required = false;
        el("format").required = false;
    } else {
        el("baserom").required = true;
        el("format").required = true;
    }

    refreshRequiredAuthor();
}
function refreshListBaseroms() {
    if (el("form-type").dataset.value == TYPE_NEW_VERSION && el('existing-translations').value) {
        fillPatches("baserom", PATCH_VERSIONS, PATCH_PROJECTS[el('existing-translations').value].getGameId());
    } else {
        fillPatches("baserom", PATCH_VERSIONS, el("game").value);
    }
}
function refreshListVersions() {
    if (el("existing-translations").value) {
        fillVersions("latest-versions-inputs", PATCH_PROJECTS[el("existing-translations").value]);
    }
}
function refreshShowHideOverrides() {
    if (el("version-override").checked || (el("form-type").dataset.value != TYPE_NEW_VERSION && !el("author").value)) {
        el("version-override-set").disabled = false;
    } else {
        el("version-override-set").disabled = true;
    }
}
function refreshNewVersion() {
    var version = el("version").value;
    if (el("new-version")) {
        el("new-version").value = version;
        el("new-version").checked = el("last-version").checked;
        el("new-version-label").textContent = "This new version" + (version ? " (" + version + ")" : "");
    }
}
function onFormTypeChange(event) {
    el("form-type").dataset.value = event.target.id;
    refreshFormType();
}
function refreshRequiredAuthor() {
    if (el("form-type").dataset.value != TYPE_NEW_VERSION && !el("author").value) {
        el("version-author").required = true;
        el("version-override").dataset.checked = el("version-override").checked;
        el("version-override").disabled = true;
        el("version-override").checked = true;
    } else {
        el("version-author").required = false;
        el("version-override").disabled = false;
        el("version-override").checked = (el("version-override").dataset.checked == "true");
    }
    refreshShowHideOverrides();
}
function onIsLatestChange(event) {
    if (this.checked) {
        var versionChecks = el("latest-versions-inputs").querySelectorAll("input[type=checkbox]");
        var actionUncheckRep;
        for (var i = 0; i < versionChecks.length; i++) {
            if (versionChecks[i].checked && versionChecks[i].id != "new-version-label") {
                if (actionUncheckRep || window.confirm("Also uncheck previously defined “latest” versions?")) {
                    actionUncheckRep = true;
                    versionChecks[i].checked = false;
                }
            }
        }
    }
    refreshNewVersion();
}
function onVersionOverrideChange(event) {
    this.dataset.checked = this.checked;
    refreshShowHideOverrides();
}
function init() {
    sortFillAnyParam("language", LANG_CODES, function() {
        return new Intl.DisplayNames(['en'], { type: 'language', style: 'long', languageDisplay: 'standard' }).of(this);
    }, function() {return this});
    sortFillAnyParam("authors", PATCH_VERSIONS, PatchVersion.prototype.getAuthorFallback);
    sortFillAnyParam("versions", PATCH_VERSIONS, function() {return this.getVersionValue()});
    fillPatches("existing-translations", PATCH_PROJECTS);

    el("form-type").addEventListener("change", onFormTypeChange);
    el("form-type").addEventListener("change", refreshListBaseroms);
    el("game").addEventListener("change", refreshListBaseroms);
    el("existing-translations").addEventListener("change", refreshListVersions);
    el("existing-translations").addEventListener("change", refreshListBaseroms);
    el("author").addEventListener("input", refreshRequiredAuthor);
    el("version").addEventListener("input", refreshNewVersion);
    el("last-version").addEventListener("change", onIsLatestChange);
    el("version-override").addEventListener("change", onVersionOverrideChange);
    //el("apply").addEventListener("click", function(e) {apply(); e.preventDefault()});
    var allInputs = document.querySelectorAll("input, select");
    for (var i = 0; i < allInputs.length; i++) {
        allInputs[i].addEventListener("change", apply);
        allInputs[i].addEventListener("input", apply);
    }
    refreshListVersions();
}

function apply() {
    if (validate()) {
        result();
    }
}

function validate() {
    return true;
}

function result() {
    //var pj_id;
    //var pj_game;
    //var pj_lang;
    //var pj_latest;
    //var pj_author;
    //var pj_website;
    //var pj_extraNote;
    //var pj_isOfficial;
    var pjJson = {};
    if (el("form-type").dataset.value != TYPE_NEW_VERSION) {
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
        // latest, highlighted
        pjJson.author = el("author").value || undefined;
        pjJson.website = el("website").value || undefined;
        pjJson.extraNote = el("extra-note").value || undefined;
        pjJson.isOfficial = el("official").checked || undefined;

    } else {
        pjJson.projectId = el('existing-translations').value;
        var pjObj = PATCH_PROJECTS[pjJson.projectId];
        pjJson.game = pjObj.getGameId();
        pjJson.lang = pjObj.getLangId();
        /*pjJson.latest = pjObj.latestVersion;
        if (pjObj.altLatestVersions && pjObj.altLatestVersions.length) {
            pjJson.latest = [pjJson.latest]
        }*/
        pjJson.author = pjObj.getAuthor() || undefined;
        pjJson.website = pjObj.getWebsite() || undefined;
        pjJson.extraNote = pjObj.getExtraNote() || undefined;
        pjJson.isOfficial = pjObj.isOfficial() || undefined;
    }
    var pjStr = JSON.stringify(pjJson);
    pjStr = pjStr.replace(/"([^"]+)":"([^"]*)"/g, "$1:'$2'");
    pjStr = pjStr.replace(/"([^"]+)":/g, "$1:");
    pjStr = pjStr.replace(/',(\w)/g, "', $1") + ',';

    var verJson = {};
    verJson.crc = el("crc").value;
    verJson.projectId = pjJson.projectId;
    var resVersion = el("version").value;
    verJson.patchId = pjJson.projectId + resVersion.replace(/\./g,"");
    if (el("form-type").dataset.value != TYPE_NEW_BASEROM) {
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
    if (el("version-override").checked) {
        verJson.author = el("version-author").value || undefined
        verJson.website = el("version-website").value || undefined;
    }

    var verStr = JSON.stringify(verJson);
    verStr = verStr.replace(/"([^"]+)":"([^"]*)"/g, "$1:'$2'"); // 3 same lines as pjStr
    verStr = verStr.replace(/"([^"]+)":/g, "$1:");
    verStr = verStr.replace(/',(\w)/g, "', $1") + ',';

    el("result").textContent = pjStr + '\n' + verStr;
}

init();
