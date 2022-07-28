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
	this.addVersion = function(version) { // argument is PatchVersion object
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

PatchProject.prototype.getLangName = function() {
	// TODO replace: this.getLang().getName();?
	return this.getLang().name;
}
PatchProject.prototype.getLangFlag = function() {
	// TODO replace: this.getLang().getFlag();?
	return this.getLang().flag;
}
PatchProject.prototype.getVersions = function() {
	return this.versions;
}
PatchProject.prototype.getLatestVersion = function() {
	return this.latestVersion;
}
/*PatchProject.prototype.getLatestVersionValue = function() {
	return this.latestVersion.getVersionValue();
}*/
PatchProject.prototype.getLatestVersionAuthor = function() {
	return this.getLatestVersion().getAuthor();
}

PatchProject.prototype.getWebsiteFallback = function() {
	return this.getWebsite() || (this.latestVersion ? this.latestVersion.getWebsite() : undefined);
}

PatchProject.prototype.getExtraNoteFallback = function() {
	return this.getExtraNote() || (this.latestVersion ? this.latestVersion.getExtraNote() : undefined);
}

PatchProject.prototype.getDesc = function(withGameTitle) {
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

PatchProject.createFromJson = function(fullJson) {
	var res = [];
	for (var i in fullJson) {
		res[fullJson[i].projectId] = new PatchProject(fullJson[i]);
	}
	return res;
}
