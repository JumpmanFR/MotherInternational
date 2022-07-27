function Translation(json) {
	//Translation.instances[id] = this;
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
	this.addVersion = function(version) { // argument is TransVersion object
		this.versions.push(version); // TODO change?
		version.setParentProject(this);
		if ((!json.latest && !version.isSpecialAltRom()) || json.latest == version.getVersionValue()) {
			this.latestVersion = version;
		}
	}
	this.getAuthor = function() {
		return json.author || this.getLatestVersionAuthor();
	}
	this.getWebsite = function() {
		return json.website;
	}
	this.getExtraNote = function() {
		return json.extraNote;
	}
}

Translation.prototype.getLangName = function() {
	// TODO replace: this.getLang().getName();?
	return this.getLang().name;
}
Translation.prototype.getLangFlag = function() {
	// TODO replace: this.getLang().getFlag();?
	return this.getLang().flag;
}
Translation.prototype.getVersions = function() {
	return this.versions;
}
Translation.prototype.getLatestVersion = function() {
	return this.latestVersion;
}
/*Translation.prototype.getLatestVersionValue = function() {
	return this.latestVersion.getVersionValue();
}*/
Translation.prototype.getLatestVersionAuthor = function() {
	return this.getLatestVersion().getAuthor();
}

Translation.prototype.getWebsiteFallback = function() {
	return this.getWebsite() || (this.latestVersion ? this.latestVersion.getWebsite() : undefined);
}

Translation.prototype.getExtraNoteFallback = function() {
	return this.getExtraNote() || (this.latestVersion ? this.latestVersion.getExtraNote() : undefined);
}

Translation.prototype.getDesc = function(withGameTitle) {
	var res = "";
	if (gFlagEmojiSupported) {
		res += this.getLangFlag() + " "; // TODO objet lang?
	}
	if (withGameTitle) {
		res += this.getGameFullName() + " – "; // TODO objet games?
	}
	res += this.getLangName() + " "; // TODO objet lang?
	if (this.getAuthor()) {
		res += _("txtDescBy") + " " + this.getAuthor() + " ";
	}
	return res;
}

Translation.createFromJson = function(fullJson) {
	var res = [];
	for (var i in fullJson) {
		res[fullJson[i].projectId] = new Translation(fullJson[i]);
	}
	return res;
}
