function PatchProject(json) {
	//PatchProject.instances[id] = this;
	this.versions = [];

	this.getGameId = function() {
		// TODO replace: Game.instances[json.game];?
		return json.game;
	}
	this.getGameFullName = function() {
		// TODO replace: getFullName();?
		return GAMES_LIST[json.game].fullName;
	}
	this.getGameShortName = function() {
		// TODO replace: getShortName();?
		return GAMES_LIST[json.game].shortName;
	}
	this.getLangId = function() { // TODO remove if useless?
		return json.lang;
	}
	this.getLang = function() {
		// TODO replace: Lang.instances[json.lang]?
		return LANG_LIST[json.lang];
	}
	this.addVersion = function(patchVersion) { // argument is PatchVersion object
		this.versions.push(patchVersion); // TODO change?
		patchVersion.setParentProject(this);
		json.latest = json.latest || [];
		if (typeof(json.latest) == "string") {
			json.latest = [json.latest];
		}
		if (json.latest[0] == patchVersion.getVersionValue() || (!json.latest && !patchVersion.isSpecialHidden())) {
			this.latestVersion = patchVersion;
		} else if (json.latest.includes(patchVersion.getVersionValue())) {
			this.altLatestVersions = this.altLatestVersions || [];
			this.altLatestVersions.push(patchVersion);
		}
	}
	this.getAuthor = function() {
		return json.author;
	}
	this.getWebsite = function() {
		return json.website;
	}
	this.getExtraNote = function() {
		return json.extraNote;
	}
	this.isOfficial = function() {
		return !!json.isOfficial;
	}
}

PatchProject.prototype.getLangName = function() {
	// TODO replace: this.getLang().getName();?
	return this.getLang().name;
}
PatchProject.prototype.getLangFlag = function() {
	// TODO replace: this.getLang().getFlag();?
	if (PatchProject.areFlagEmojiSupported()) {
		return this.getLang().flag;
	} else {
		return "";
	}
}
PatchProject.prototype.getVersions = function() {
	return this.versions;
}
PatchProject.prototype.thisIsLatestVersion = function(patchVersion) {
	return this.latestVersion === patchVersion;
}
PatchProject.prototype.thisIsAltLatestVersion = function(patchVersion) {
	return (this.thisIsLatestVersion(patchVersion)) || (this.altLatestVersions && this.altLatestVersions.includes(patchVersion));
}
PatchProject.prototype.getLatestVersionAuthor = function() {
	return this.latestVersion.getAuthor();
}

PatchProject.prototype.getAuthorFallback = function() {
	return this.getAuthor() || this.getLatestVersionAuthor();
}

PatchProject.prototype.getWebsiteFallback = function() {
	return this.getWebsite() || (this.latestVersion ? this.latestVersion.getWebsite() : undefined);
}

PatchProject.prototype.getExtraNoteFallback = function() {
	return this.getExtraNote() || (this.latestVersion ? this.latestVersion.getExtraNote() : undefined);
}

PatchProject.prototype.getDesc = function(withGameTitle) {
	var res = "";
	res += this.getLangFlag() + " "; // TODO objet lang?
	if (withGameTitle) {
		res += this.getGameFullName() + " – "; // TODO objet games?
	}
	res += this.getLangName() + " "; // TODO objet lang?
	if (this.getAuthorFallback()) {
		res += _("txtDescBy") + " " + this.getAuthorFallback() + " ";
	}
	if (this.getExtraNote()) {
		res += "(" + this.getExtraNote() + ") ";
	}
	if (this.isOfficial()) {
		res += " " + _("txtDescOfficial");
	}
	return res.trim();
}

PatchProject.createFromJson = function(fullJson) {
	var res = [];
	for (var i in fullJson) {
		res[fullJson[i].projectId] = new PatchProject(fullJson[i]);
	}
	return res;
}

PatchProject.areFlagEmojiSupported = function() {
	if (PatchVersion.knownFlagEmojiSupport === undefined) {
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
				knownFlagEmojiSupport = true;
				return true;
			}
			i+=4;
		}
		PatchVersion.knownFlagEmojiSupport = false;
		return false;
	} else {
		return PatchVersion.knownFlagEmojiSupport;
	}
}
