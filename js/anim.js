/* Mother International, Web version
JumpmanFR 2021-2022
Animation method taken from Michael Romanov https://www.sitepoint.com/frame-by-frame-animation-css-javascript/
Animations by Sam the Salmon */


const ANIM_FOLDER = "anim";
const ANIM_TIME_PER_FRAME = 30;
var ANIM_PARAMS = {[ID_MOTHER_1]: {nbFrames:192, height:26}, [ID_MOTHER_2]: {nbFrames:139, height:27}, [ID_MOTHER_3]: {nbFrames:410, height:34}};


//==========================================
// EVENT METHODS AND ENTRY POINTS
//==========================================


addEvent(document, 'DOMContentLoaded', function() {
	setGameAnim("m2");
});


//==========================================
// ANIMATION
//==========================================


function setGameAnim(gameCard) {
	if (gameCard) {
		var nbFrames = ANIM_PARAMS[gameCard].nbFrames;
		var height = ANIM_PARAMS[gameCard].height;
		var animDuration = ANIM_TIME_PER_FRAME * nbFrames / 1000;	
		var lastFrameTranslate = -(nbFrames - 1) * 100 / nbFrames;
		
		document.documentElement.style.setProperty("--anim-transform-end", `${lastFrameTranslate}%`);
		
		restartAnim();
		
		el(ELT_ANIMATION).style.backgroundImage = `url('${ANIM_FOLDER}/${gameCard}.png')`;
		el(ELT_ANIMATION_MASK).style.height = `${height}px`;
		el(ELT_ANIMATION).style.height = `${height * nbFrames}px`;
		el(ELT_ANIMATION).style.animationDuration = `${animDuration}s`;
		el(ELT_ANIMATION).style.animationTimingFunction = `steps(${nbFrames - 1})`;
	} else {
		el(ELT_ANIMATION).style.backgroundImage = "none";
	}
}

function restartAnim() {
	el(ELT_ANIMATION).style.animation = 'none';
	el(ELT_ANIMATION).offsetHeight; // DOM reflow
	el(ELT_ANIMATION).style.animation = null;
}
