const ELT_ANIMATION = "animation";
const ELT_PRELOAD = "preload";

const ANIM_FOLDER = "anim";
const ANIM_TIME_PER_FRAME = 20;
var ANIM_SUBFOLDERS = [{name:"m1", nbFrames:192}, {name:"m2", nbFrames:139}, {name:"m3", nbFrames:410}];

const NO_OP = Function();

var gTimeWhenLastUpdate;
var gTimeFromLastUpdate;
var gFrameNumber;
var gGame;
var gNextFrame;

//==========================================
// EVENT METHODS AND ENTRY POINTS
//==========================================

addEvent(window,'load', function(){setGame(3)});

addEvent(document, 'DOMContentLoaded', function() {
	animPreload();
});


//==========================================
// ANIMATION
//==========================================

function animPreload() {
	for (var i = 1; i < ANIM_SUBFOLDERS.length + 1; i++) {
		for (var j = 0; j < ANIM_SUBFOLDERS[i - 1].nbFrames; j++) {
			var div = document.createElement("div");
			div.id = "preload-image-" + i + "-" + j;
			div.style.cssText = `background-image: url('${ANIM_FOLDER}/m${i}/m${i}-${j}.png');`;
			//console.log(div.outerHTML);
			el(ELT_PRELOAD).appendChild(div);
		}
	}
}

function animStep(startTime) {
	if (gGame != 0) {
		if (!gTimeWhenLastUpdate) {
			gTimeWhenLastUpdate = startTime;
		}

		gTimeFromLastUpdate = startTime - gTimeWhenLastUpdate;

		if (gTimeFromLastUpdate > ANIM_TIME_PER_FRAME) {
			el(ELT_ANIMATION).setAttribute('src', `${ANIM_FOLDER}/m${gGame}/m${gGame}-${gFrameNumber}.png`);
			gTimeWhenLastUpdate = startTime;

			if (gFrameNumber >= ANIM_SUBFOLDERS[gGame - 1].nbFrames - 1) {
				gFrameNumber = 0;
			} else {
				gFrameNumber = gFrameNumber + 1;
			}        
		}
		gNextFrame(animStep);
	}
}

function setGame(id) {
	if (id != gGame) {
		gGame = id;
		if (id == 0) {
			el(ELT_ANIMATION).style.visibility = "hidden";
		} else {
			el(ELT_ANIMATION).style.visibility = "visible";
			gFrameNumber = 1;
			gNextFrame = requestAnimationFrame;
			gNextFrame(animStep);
		}
	}
}
