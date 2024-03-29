Utils = {};

Utils.toHex = function (value) {
	var hex = new Number(value).toString(16);
	return '0x' + hex.padStart(8, '0');
}

Utils.capitalizeFirstLetter = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

Utils.getLangName = function (id, isAlt) {
	var pageLang = document.documentElement.getAttribute("lang");
	var defaultLang = LANG_DEFAULT.split('-')[0];
	var localLangNames = new Intl.DisplayNames([pageLang, defaultLang], { type: 'language', style: 'narrow', languageDisplay: isAlt ? 'standard' : 'dialect' });
	return localLangNames.of(id);;
}

Utils.getFlagEmoji = function (id) {
	id = DEFAULT_FLAGS ? DEFAULT_FLAGS[id] || id : id;

	if (!id) return "";

	var split = id.toUpperCase().split(/-|_/);
    var code = split.pop();

	var res = "";
	for (var i = 0; i < code.length; i++) {
		res += String.fromCodePoint(code.codePointAt(i) - 0x41 + 0x1F1E6);
	}

    return res;
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
