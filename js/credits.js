/* Mother International, Web version
JumpmanFR 2021-2022 */

//==========================================
// EVENT METHODS AND ENTRY POINTS
//==========================================

addEvent(document, 'DOMContentLoaded', function() {
	addEvent(el(ELT_ABOUT_BTN), 'click', function(e) {onClickCredits(e, true)});
	addEvent(el(ELT_ABOUT_CLOSE_BTN), 'click', function(e) {onClickCredits(e, false)});
	addEvent(el(ELT_ABOUT_OVERLAY), 'click', function(e) {onClickCredits(e, false)});
	addEvent(document, 'keydown', function(e) {if (e.key === 'Escape') onClickCredits(e, false)});
});

function onClickCredits(e, value) {
	initCredits();
	if (value) {	// open
		el(ELT_ABOUT_WINDOW).classList.remove(CLASS_CLOSED_CREDITS);
		el(ELT_ABOUT_OVERLAY).classList.remove(CLASS_CLOSED_CREDITS);
	} else {		// close
		el(ELT_ABOUT_WINDOW).classList.add(CLASS_CLOSED_CREDITS);
		el(ELT_ABOUT_OVERLAY).classList.add(CLASS_CLOSED_CREDITS);
	}
	e.stopPropagation();
	e.preventDefault();
}


//==========================================
// METHODS FOR CREDITS DISPLAY
//==========================================

function initCredits() {
	// Translator contact
	if (el(ELT_ABOUT_TRANSLATOR_CONTACT)) {
		var uri = `mailto:${encodeURIComponent(MAIL_ADDRESS)}`;
		uri += `?subject=${encodeURIComponent(MAIL_SUBJECT)}`;
		uri += `&body=${encodeURIComponent(MAIL_BODY)}`;
		appendTextWithLinks(el(ELT_ABOUT_TRANSLATOR_CONTACT), _("txtAboutTranslator1"), ["%"], [uri], [_("txtAboutTranslator2")]);
	}
	if (el(ELT_ABOUT_SOURCE)) {
		appendTextWithLinks(el(ELT_ABOUT_SOURCE), _("txtAboutSource"), ["%","‰"],
			["https://github.com/JumpmanFR/MotherInternational", "https://opensource.org/licenses/mit-license.php"], [_("txtAboutSourceGitHub"), _("txtAboutSourceLicense")]);
	}

	var localeModifiedDate = new Date(LAST_MODIFIED).toLocaleString(document.documentElement.getAttribute("lang"), {month: "long", year: "numeric"});

	el(ELT_ABOUT_VERSION).textContent = _("txtAboutVersion").replace('%', VERSION).replace("‰", localeModifiedDate);

	initListAllTranslations();

	initListCreditsTexts();
}

function initListAllTranslations() {
	el(ELT_ABOUT_ALL_TRANSLATIONS).textContent = '';
	var defaultOpt = document.createElement("option");
	defaultOpt.value = '';
	defaultOpt.text = _('txtAboutAllTransLabel');
	defaultOpt.hidden = defaultOpt.disabled = defaultOpt.selected = true;
	el(ELT_ABOUT_ALL_TRANSLATIONS).add(defaultOpt);
	var curGroupName;
	var curGroup;

	Object.keys(PATCH_PROJECTS).sort(function(a, b) {
		return PATCH_PROJECTS[a].sort(PATCH_PROJECTS[b]);
	}).forEach(function(cur) {
		var curProj = PATCH_PROJECTS[cur];
		if (!curProj.isOfficial()) {
			if (curProj.getGameFullName() != curGroupName) {
				curGroup = document.createElement("optgroup");
				curGroup.label = curProj.getGameFullName();
				el(ELT_ABOUT_ALL_TRANSLATIONS).add(curGroup);
			}
			var opt = document.createElement("option");
			opt.value = cur;
			opt.text = curProj.getDesc(false);
			opt.title = curProj.getWebsiteFallback() || '';
			curGroup.appendChild(opt);
			curGroupName = curProj.getGameFullName();
		}
	});
	el(ELT_ABOUT_ALL_TRANSLATIONS).onchange = function(e) {
		var selected = PATCH_PROJECTS[el(ELT_ABOUT_ALL_TRANSLATIONS).value];
		if (url = selected.getWebsiteFallback()) {
			if (!window.open(url, '_blank')) {
				var author = selected.getAuthorFallback();
				if (window.confirm(_('txtAboutAllTransSiteAsk').replace('%',author).replace('‰',Utils.getHostname(url)))) { // for devices like iOS that don’t allow window.open
					window.location.href = url;
				}
			}
		} else {
			window.alert(_('txtAboutAllTransNoSite').replace('%',selected.getDesc(true)));
		}
		el(ELT_ABOUT_ALL_TRANSLATIONS).value = '';
	}
}

function initListCreditsTexts() {
	var selectElt = el(ELT_ABOUT_CREDITS_TEXTS);
	var docLang = document.documentElement.getAttribute("lang");
	var listCreditsTexts = selectElt.querySelectorAll('option');
	for(var i = 0; i < listCreditsTexts.length; i++) {
		var langId = listCreditsTexts[i].value;
		listCreditsTexts[i].textContent = listCreditsTexts[i].textContent.replace('%', Utils.getLangName(langId));
	}
	selectElt.value = docLang;
	selectElt.onchange = function(e) {
		setLanguage(selectElt.value);
		initCredits();
		updatePatchInfo(FOR_INPUT);
		updatePatchSelect();
	}
}

function appendTextWithLinks(parentNode, mainText, wildcards, linkUrls, linkTexts) {
	var re = new RegExp(`[${wildcards.join("")}]`,'g')
	var mainTextParts = mainText.split(re);
	var nodes = [];
	var curPos = 0;
	parentNode.textContent = '';
	for (var i in mainTextParts) {
		parentNode.appendChild(document.createTextNode(mainTextParts[i]));
		curPos += mainTextParts[i].length; // let’s look at the wildcard character that should be at the end of this part
		var curWildcard = mainText[curPos];
		var index = wildcards.indexOf(curWildcard);
		if (index != -1) {
			curPos += curWildcard.length;
			var linkElt = document.createElement("a");
			linkElt.setAttribute("target", "_blank");
			linkElt.setAttribute("rel", "noopener");
			linkElt.href = linkUrls[index];
			linkElt.textContent = linkTexts[index];
			parentNode.appendChild(linkElt);
		}
	}
}
