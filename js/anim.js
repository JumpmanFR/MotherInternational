const ELT_ANIMATION = "animation";
const ELT_PRELOAD = "preload";

const ANIM_FOLDER = "anim";
const ANIM_TIME_PER_FRAME = 30;
var NB_FRAMES_PER_GAME = {[GAME_MOTHER_1]: 192, [GAME_MOTHER_2]: 139, [GAME_MOTHER_3]: 410};
var GAMES_IN_CARDS = 	{[CARD_MOTHER_1]: 	[GAME_MOTHER_1],
						 [CARD_MOTHER_2]: 	[GAME_MOTHER_2],
						 [CARD_MOTHER_3]: 	[GAME_MOTHER_3],
						 [CARD_MOTHER_1_2]:	[GAME_MOTHER_1, GAME_MOTHER_2]};

const NO_OP = Function();

var gTimeWhenLastUpdate;
var gTimeFromLastUpdate;
var gFrameNumber;
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
	for (var i in NB_FRAMES_PER_GAME) {
		for (var j = 0; j < NB_FRAMES_PER_GAME[i]; j++) {
			var div = document.createElement("div");
			div.id = "preload-image-" + i + "-" + j;
			div.style.cssText = `background-image: url('${ANIM_FOLDER}/${i}/${i}-${j}.png');`;
			el(ELT_PRELOAD).appendChild(div);
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
			var games = GAMES_IN_CARDS[gGameCard];
			var currentGame, subFrameNumber;
			var countFrames = 0;
			// Chain animations when multiple games in ROM (typically for MOTHER 1+2)
			for (var i = 0; i < games.length; i++) {
				if (gFrameNumber < countFrames + NB_FRAMES_PER_GAME[GAMES_IN_CARDS[games[i]]]) {
					currentGame = games[i];
					subFrameNumber = gFrameNumber - countFrames;
					break;
				} else {
					countFrames += NB_FRAMES_PER_GAME[GAMES_IN_CARDS[games[i]]];
				}
			}
			
			if (!currentGame) {
				currentGame = games[0];
				gFrameNumber = subFrameNumber = 0;
			}
			
			el(ELT_ANIMATION).setAttribute('src', `${ANIM_FOLDER}/${currentGame}/${currentGame}-${subFrameNumber}.png`);

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
			el(ELT_ANIMATION).style.visibility = "visible";
		} else {
			el(ELT_ANIMATION).style.visibility = "hidden";
		}
	}
}
