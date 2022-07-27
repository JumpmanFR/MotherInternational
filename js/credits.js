/* Mother International, Web version
Animation method taken from Michael Romanov https://www.sitepoint.com/frame-by-frame-animation-css-javascript/
JumpmanFR 2021-2022 */

// Saturn (or anything) animation
const CREDITS_ANIM_FRAME_PREFIX = "credits-animation-"
const CREDITS_ANIM_NB_FRAMES = 2;
const CREDITS_ANIM_TIME_PER_FRAME = 500;
var gCreditsDoNextFrame;
var gCreditsAnimTimeFromLastUpdate;
var gCreditsAnimTimeWhenLastUpdate;
var gCreditsFrameNumber = 1;
var gCreditsCurrentFrameElt;

//==========================================
// EVENT METHODS AND ENTRY POINTS
//==========================================

addEvent(document, 'DOMContentLoaded', function() {
	addEvent(el(ELT_ABOUT_BTN), 'click', function(e) {onClickCredits(e, true)});
	addEvent(el(ELT_ABOUT_CLOSE_BTN), 'click', function(e) {onClickCredits(e, false)});
	addEvent(el(ELT_ABOUT_WRAPPER), 'click', function(e) {onClickCredits(e, false)});
	addEvent(document, 'keydown', function(e) {if (e.key === 'Escape') onClickCredits(e, false)});
	initCredits();
});

function onClickCredits(e, value) {
	if (value) {	// open
		el(ELT_ABOUT_WINDOW).classList.remove(CLASS_CLOSED_CREDITS);
		el(ELT_ABOUT_WRAPPER).classList.remove(CLASS_CLOSED_CREDITS);
		gCreditsDoNextFrame = requestAnimationFrame;
		gCreditsDoNextFrame(creditsNextFrame);
	} else {		// close
		el(ELT_ABOUT_WINDOW).classList.add(CLASS_CLOSED_CREDITS);
		el(ELT_ABOUT_WRAPPER).classList.add(CLASS_CLOSED_CREDITS);
		gCreditsDoNextFrame = function() {};
	}
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

	el(ELT_ABOUT_VERSION).textContent = _("txtAboutVersion").replace("%", VERSION);

	initCreditsSelect();
}

function initCreditsSelect() {
	var defaultOpt = document.createElement("option");
	defaultOpt.value = '';
	defaultOpt.text = _('txtAboutAllTransLabel');
	defaultOpt.hidden = defaultOpt.disabled = defaultOpt.selected = true;
	el(ELT_ABOUT_ALL_TRANSLATIONS).add(defaultOpt);
	var curGroupName;
	var curGroup;
	for (var cur in PROJECTS_LIST) {
		if (!PROJECTS_LIST[cur].specialAltRom) {
			if (PROJECTS_LIST[cur].game != curGroupName) {
				curGroup = document.createElement("optgroup");
				curGroup.label = GAMES_LIST[PROJECTS_LIST[cur].game].nameFull;
				el(ELT_ABOUT_ALL_TRANSLATIONS).add(curGroup);
			}
			var opt = document.createElement("option");
			opt.value = cur;
			opt.text = romDesc(PROJECTS_LIST[cur].latest, false, false) + (PROJECTS_LIST[cur].versionLabel ? ` (${PROJECTS_LIST[cur].versionLabel})` : '');
			opt.title = PROJECTS_LIST[cur].website || '';
			curGroup.appendChild(opt);
			curGroupName = PROJECTS_LIST[cur].game;
		}
	}
	el(ELT_ABOUT_ALL_TRANSLATIONS).onchange = function(e) {
		if (url = PROJECTS_LIST[el(ELT_ABOUT_ALL_TRANSLATIONS).value].website) {
			if (!window.open(url, '_blank')) {
				window.location.href = url; // for devices like iOS that don’t allow window.open
			}
		} else {
			window.alert(_('txtAboutAllTransNoSite'));
		}
		el(ELT_ABOUT_ALL_TRANSLATIONS).value = '';
	}
}

function appendTextWithLinks(parentNode, mainText, wildcards, linkUrls, linkTexts) {
	var re = new RegExp(`[${wildcards.join("")}]`,'g')
	var mainTextParts = mainText.split(re);
	var nodes = [];
	var curPos = 0;
	for (var i in mainTextParts) {
		parentNode.appendChild(document.createTextNode(mainTextParts[i]));
		curPos += mainTextParts[i].length; // let’s look at the wildcard character that should be at the end of this part
		var curWildcard = mainText[curPos];
		var index = wildcards.indexOf(curWildcard);
		if (index != -1) {
			curPos += curWildcard.length;
			var linkElt = document.createElement("a");
			linkElt.href = linkUrls[index];
			linkElt.textContent = linkTexts[index];
			parentNode.appendChild(linkElt);
		}
	}
}


//==========================================
// METHODS FOR CREDITS ANIMATION
//==========================================

function creditsNextFrame(time) {
	if (!gCreditsAnimTimeWhenLastUpdate) {
		gCreditsAnimTimeWhenLastUpdate = time;
	}

	gCreditsAnimTimeFromLastUpdate = time - gCreditsAnimTimeWhenLastUpdate;

	if (gCreditsAnimTimeFromLastUpdate > CREDITS_ANIM_TIME_PER_FRAME) {
		if (gCreditsCurrentFrameElt) {
			gCreditsCurrentFrameElt.style.opacity = 0;
		}
		gCreditsCurrentFrameElt = el(CREDITS_ANIM_FRAME_PREFIX + gCreditsFrameNumber);
		gCreditsCurrentFrameElt.style.opacity = 1;

		gCreditsAnimTimeWhenLastUpdate = time;

		if (gCreditsFrameNumber >= CREDITS_ANIM_NB_FRAMES) {
			gCreditsFrameNumber = 1;
		} else {
			gCreditsFrameNumber++;
		}
	}

	gCreditsDoNextFrame(creditsNextFrame);
}
