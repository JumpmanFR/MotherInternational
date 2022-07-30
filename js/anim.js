/* Mother International, Web version
JumpmanFR 2021-2022
Animation method taken from Michael Romanov https://www.sitepoint.com/frame-by-frame-animation-css-javascript/
Animations by Sam the Salmon */


const ANIM_FOLDER = "anim";
const ANIM_TIME_PER_FRAME = 40;
var NB_FRAMES_PER_GAME = {[ID_MOTHER_1]: 192, [ID_MOTHER_2]: 139, [ID_MOTHER_3]: 410};

var gGameCard;
var gCurrentGameIndex;


function startOneAnim() {
	var gameId = GAMES_LIST[gGameCard] ? GAMES_LIST[gGameCard].included[gCurrentGameIndex] : "";
	if (gameId) {
		el(ELT_ANIMATION).onanimationiteration = onAnimLoop;
		var nbFrames = NB_FRAMES_PER_GAME[gameId];
		var animDuration = ANIM_TIME_PER_FRAME * nbFrames / 1000;

		// To reset the animation:
		el(ELT_ANIMATION).style.animation = 'none';
		el(ELT_ANIMATION).offsetHeight; // DOM reflow
		el(ELT_ANIMATION).style.animation = null;

		el(ELT_ANIMATION).style.backgroundImage = `url('${ANIM_FOLDER}/${gameId}.png')`;
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
		startOneAnim();
	}
}
