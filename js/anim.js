/* Mother International, Web version
JumpmanFR 2021-2022
Animation method taken from Michael Romanov https://www.sitepoint.com/frame-by-frame-animation-css-javascript/
Animations by Sam the Salmon */

const ANIM_FOLDER = "assets/anim";
const ANIM_TIME_PER_FRAME = 50;
const ANIM_TIME_BETWEEN_LOOPS = 4000;
var NB_FRAMES_PER_GAME = {[ID_MOTHER_1]: 192, [ID_MOTHER_2]: 139, [ID_MOTHER_3]: 410};

var gGameCard;
var gCurrentGameIndex;

var gLoopTimeout;

function startOneAnim() {
	clearTimeout(gLoopTimeout);
	var gameId = GAMES_LIST[gGameCard] ? GAMES_LIST[gGameCard].included[gCurrentGameIndex] : "";
	if (gameId) {
		// To reset the animation:
		el(ELT_ANIMATION).style.animation = 'none';
		el(ELT_ANIMATION).offsetHeight; // DOM reflow
		el(ELT_ANIMATION).style.animation = null;

		var nbFrames = NB_FRAMES_PER_GAME[gameId];
		var animDuration = ANIM_TIME_PER_FRAME * nbFrames / 1000;
		el(ELT_ANIMATION).style.backgroundImage = `url('${ANIM_FOLDER}/${gameId}.png')`;
		el(ELT_ANIMATION).style.animationDuration = `${animDuration}s`;
		el(ELT_ANIMATION).style.animationTimingFunction = `steps(${nbFrames - 1})`;
		el(ELT_ANIMATION).onanimationend = onAnimLoop;
	} else {
		el(ELT_ANIMATION).style.backgroundImage = "none";
		el(ELT_ANIMATION).onanimationend = function() {};
	}
}

function setGameAnim(gameCard) {
	gCurrentGameIndex = 0;
	gGameCard = gameCard;
	startOneAnim();
}

function onAnimLoop(e) {
	gLoopTimeout = setTimeout(function() {
		gCurrentGameIndex = (gCurrentGameIndex + 1) % GAMES_LIST[gGameCard].included.length;
		startOneAnim();
	}, ANIM_TIME_BETWEEN_LOOPS);
}
