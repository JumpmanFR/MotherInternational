/* Mother International, Web version
JumpmanFR 2021-2022
Animation method taken from Michael Romanov https://www.sitepoint.com/frame-by-frame-animation-css-javascript/
Animations by Sam the Salmon */


const ANIM_FOLDER = "anim";
const ANIM_TIME_PER_FRAME = 30;
var ANIM_PARAMS = {[ID_MOTHER_1]: 192, [ID_MOTHER_2]: 139, [ID_MOTHER_3]: 410};
const ANIM_HEIGHT = 34;
const SCALE = 2;

var gGameCard;
var gCurrentGameIndex;

//==========================================
// EVENT METHODS AND ENTRY POINTS
//==========================================


addEvent(document, 'DOMContentLoaded', function() {
	setGameAnim("m2");
});


//==========================================
// ANIMATION
//==========================================

function startOneAnim() {
	var gameId = GAMES_LIST[gGameCard] ? GAMES_LIST[gGameCard].included[gCurrentGameIndex] : "";
	if (gameId) {
		el(ELT_ANIMATION).onanimationiteration = onAnimLoop;
		var nbFrames = ANIM_PARAMS[gameId];
		var height = ANIM_HEIGHT * SCALE;
		var animDuration = ANIM_TIME_PER_FRAME * nbFrames / 1000;
		var lastFrameTranslate = -(nbFrames - 1) * 100 / nbFrames / SCALE;

		document.documentElement.style.setProperty("--anim-transform-end", `${lastFrameTranslate * SCALE}%`);

		// To reset the animation:
		el(ELT_ANIMATION).style.animation = 'none';
		el(ELT_ANIMATION).offsetHeight; // DOM reflow
		el(ELT_ANIMATION).style.animation = null;

		el(ELT_ANIMATION).style.backgroundImage = `url('${ANIM_FOLDER}/${gameId}.png')`;
		//el(ELT_ANIMATION).src = `${ANIM_FOLDER}/${gameId}.png`;
		el(ELT_ANIMATION_MASK).style.height = `${height}px`;
		el(ELT_ANIMATION).style.height = `${height * nbFrames}px`;
		el(ELT_ANIMATION).style.animationDuration = `${animDuration}s`;
		el(ELT_ANIMATION).style.animationTimingFunction = `steps(${nbFrames - 1})`;
	} else {
		el(ELT_ANIMATION).style.backgroundImage = "none";
		el(ELT_ANIMATION).onanimationiteration = function() {};
	}
}

function setGameAnim(gameCard) {
	gCurrentGameIndex = 0;
	gGameCard = gameCard;
	startOneAnim();
}

function onAnimLoop(e) {
	if (GAMES_LIST[gGameCard].included.length > 1) {
		gCurrentGameIndex = (gCurrentGameIndex + 1) % GAMES_LIST[gGameCard].included.length;
	}
	startOneAnim();
	console.log("LOOP");
}
