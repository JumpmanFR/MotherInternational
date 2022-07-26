const ANIM_FOLDER = "anim";
const ANIM_TIME_PER_FRAME = 30;
var NB_FRAMES_PER_GAME = {[ID_MOTHER_1]: 192, [ID_MOTHER_2]: 139, [ID_MOTHER_3]: 410};

const NO_OP = Function();

var gTimeWhenLastUpdate;
var gTimeFromLastUpdate;
var gFrameNumber;
var gCurrentFrame;
var gDoNextFrame;
var gGameCard;

//==========================================
// EVENT METHODS AND ENTRY POINTS
//==========================================


addEvent(document, 'DOMContentLoaded', function() {
	animPreload();
});


//==========================================
// ANIMATION
//==========================================

function animPreload() {
	var div = el(ELT_ANIMATION_CONTAINER);
	for (var i in NB_FRAMES_PER_GAME) {
		for (var j = 0; j < NB_FRAMES_PER_GAME[i]; j++) {
			//var div = document.createElement("div");
			//div.id = "preload-image-" + i + "-" + j;
			//div.style.cssText = `background-image: url('${ANIM_FOLDER}/${i}/${i}-${j}.png');`;
			//el(ELT_PRELOAD).appendChild(div);
			var img = document.createElement("img");
			img.className = CLASS_ANIMATION;
			img.id = CLASS_ANIMATION + "-" + i + "-" + j;
			img.src = `${ANIM_FOLDER}/${i}/${i}-${j}.png`;
			div.appendChild(img);
		}
	}
}

function animStep(time) {
	if (gGameCard) {
		if (!gTimeWhenLastUpdate) {
			gTimeWhenLastUpdate = time;
		}

		gTimeFromLastUpdate = time - gTimeWhenLastUpdate;

		if (gTimeFromLastUpdate > ANIM_TIME_PER_FRAME) {
			var games = GAMES_LIST[gGameCard].included;
			var currentGame, subFrameNumber;
			var countFrames = 0;
			// Chain animations when multiple games in ROM (typically for MOTHER 1+2)
			for (var i = 0; i < games.length; i++) {
				if (gFrameNumber < countFrames + NB_FRAMES_PER_GAME[GAMES_LIST[games[i]].included]) {
					currentGame = games[i];
					subFrameNumber = gFrameNumber - countFrames;
					break;
				} else {
					countFrames += NB_FRAMES_PER_GAME[GAMES_LIST[games[i]].included];
				}
			}

			if (!currentGame) {
				currentGame = games[0];
				gFrameNumber = subFrameNumber = 0;
			}

			if (gCurrentFrame) {
				gCurrentFrame.style.opacity = 0;
			}
			gCurrentFrame = el(CLASS_ANIMATION + "-" + currentGame + "-" + subFrameNumber);
			gCurrentFrame.style.opacity = 1;

			gTimeWhenLastUpdate = time;

			gFrameNumber++;
		}
		gDoNextFrame(animStep);
	}
}

function setAnim(gameCard) {
	if (gameCard != gGameCard) {
		gGameCard = gameCard;
		if (gameCard) {
			gFrameNumber = 0;
			gDoNextFrame = requestAnimationFrame;
			gDoNextFrame(animStep);
			el(ELT_ANIMATION_CONTAINER).style.visibility = "visible";
		} else {
			el(ELT_ANIMATION_CONTAINER).style.visibility = "hidden";
			gDoNextFrame = NO_OP;
		}
	}
}
