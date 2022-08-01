Utils = {};

Utils.getLangName = function (id) {
	var localLangNames = new Intl.DisplayNames([Utils.langId], { type: 'language', style: 'narrow', languageDisplay:'dialect' })
	return localLangNames.of(id).replace(/ \(....+\)/g, '');
}

Utils.getFlagEmoji = function (id) {
	if (!this.areFlagEmojiSupported()) {
		return '';
	}
	var split = id.toUpperCase().split(/-|_/);
    var lang = split[0];
    var code = split.pop();

    const a = String.fromCodePoint(code.codePointAt(0) - 0x41 + 0x1F1E6);
    const b = String.fromCodePoint(code.codePointAt(1) - 0x41 + 0x1F1E6);
    return a + b;
}

Utils.areFlagEmojiSupported = function() {
	if (Utils.knownFlagEmojiSupport === undefined) {
		var canvas = document.createElement("canvas");
		canvas.height = 10;
		canvas.width = canvas.height * 2;
		var ctx = canvas.getContext("2d");
		ctx.font = canvas.height + "px Arial";
		ctx.fillText("🇬🇧", 0, canvas.height);
		var data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
		var i = 0;
		while(i < data.length) {
			if (data[i] !== data[i + 1] || data[i] !== data[i + 2]) {
				Utils.knownFlagEmojiSupport = true;
				return true;
			}
			i+=4;
		}
		Utils.knownFlagEmojiSupport = false;
		return false;
	} else {
		return Utils.knownFlagEmojiSupport;
	}
}

Utils.getHostname = function(url) {
	var urlObj = new URL(url);
	return urlObj.hostname.replace(/^www\./g,'');
}
