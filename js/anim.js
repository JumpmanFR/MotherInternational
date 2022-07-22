const ELT_ANIMATION = "animation";
const ELT_PRELOAD = "preload";

const ANIM_FOLDER = "anim";
const ANIM_TIME_PER_FRAME = 20;
//var ANIM_SUBFOLDERS = [{name:"m1", nbFrames:192}, {name:"m2", nbFrames:139}, {name:"m3", nbFrames:410}];
var NB_FRAMES_PER_GAME = {"m1": 192, "m2": 139, "m3": 410};

const NO_OP = Function();

var gTimeWhenLastUpdate;
var gTimeFromLastUpdate;
var gFrameNumber;
var gGame;
var gNextFrame;

//==========================================
// EVENT METHODS AND ENTRY POINTS
//==========================================

//addEvent(window,'load', function(){setAnim("m3")});

addEvent(document, 'DOMContentLoaded', function() {
	animPreload();
});


//==========================================
// ANIMATION
//==========================================

function animPreload() {
	for (var i in NB_FRAMES_PER_GAME) {// 1; i < ANIM_SUBFOLDERS.length + 1; i++) {
		for (var j = 0; j < NB_FRAMES_PER_GAME[i]; j++) {
			var div = document.createElement("div");
			div.id = "preload-image-" + i + "-" + j;
			div.style.cssText = `background-image: url('${ANIM_FOLDER}/${i}/${i}-${j}.png');`;
			//console.log(div.outerHTML);
			el(ELT_PRELOAD).appendChild(div);
		}
	}
}

function animStep(startTime) {
	if (gGame) {
		if (!gTimeWhenLastUpdate) {
			gTimeWhenLastUpdate = startTime;
		}

		gTimeFromLastUpdate = startTime - gTimeWhenLastUpdate;

		if (gTimeFromLastUpdate > ANIM_TIME_PER_FRAME) {
			el(ELT_ANIMATION).setAttribute('src', `${ANIM_FOLDER}/${gGame}/${gGame}-${gFrameNumber}.png`);
			gTimeWhenLastUpdate = startTime;

			if (gFrameNumber >= NB_FRAMES_PER_GAME[gGame] - 1) {
				gFrameNumber = 0;
			} else {
				gFrameNumber = gFrameNumber + 1;
			}        
		}
		gNextFrame(animStep);
	}
}

function setAnim(id) {
	if (id != gGame) {
		gGame = id;
		if (id) {
			gFrameNumber = 1;
			gNextFrame = requestAnimationFrame;
			gNextFrame(animStep);
			el(ELT_ANIMATION).style.visibility = "hidden";
		} else {
			el(ELT_ANIMATION).style.visibility = "visible";
		}
	}
}
