function PatchProject(json, game, lang) {
	this.versions = [];

	this.getGameId = function() {
		return json.game;
	}
	this.getGameFullName = function() {
		return game.fullName;
	}
	this.getGameShortName = function() {
		return game.shortName;
	}
	this.getGameLocalName = function() {
		if (lang && lang.useJapName) {
			return game.japName;
		} else {
			return game.shortName;
		}
	}
	this.getLangId = function() {
		return lang ? lang.nameId || json.lang : json.lang;
	}
	this.getLangFlag = function() {
		return Utils.getFlagEmoji(lang ? lang.flagId || json.lang : json.lang);
	}
	this.getBoxart = function() {
		return json.game + (lang ? lang.boxartId || "" : "") + ".jpg";
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
	this.getDescForSort = function() {
		var lastVersionYear = this.getLatestVersionYear() || "0";
		return game.year + " " + this.getLangName(true) + " " + lastVersionYear + " " + this.getAuthor();
	}
	this.addVersion = function(patchVersion) { // argument is PatchVersion object
		this.versions.push(patchVersion);
		patchVersion.setParentProject(this);
		json.latest = json.latest || [''];
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
}

PatchProject.prototype.getLangName = function(brief) {
	var langId = this.getLangId();
	if (brief) {
		langId = langId.substr(0,2);
	}
	return Utils.getLangName(langId);
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
	return this.latestVersion ? this.latestVersion.getAuthor() : "";
}

PatchProject.prototype.getLatestVersionYear = function() {
	return this.latestVersion ? this.latestVersion.getYear() : "";
}
PatchProject.prototype.getAuthorFallback = function() {
	return this.getAuthor() || this.getLatestVersionAuthor();
}

PatchProject.prototype.getWebsiteFallback = function() {
	return this.getWebsite() || (this.latestVersion ? this.latestVersion.getWebsite() : "");
}

PatchProject.prototype.getDesc = function(withGameTitle) {
	var res = "";
	if (withGameTitle) {
		res += " " + this.getGameLocalName();
		res += " – " + this.getLangName();
	} else {
		res += this.getLangFlag();
		res += " " + Utils.capitalizeFirstLetter(this.getLangName());
	}
	if (this.getAuthorFallback()) {
		res += " " + _("txtDescBy") + " " + this.getAuthorFallback();
	}
	if (this.getExtraNote()) {
		res += " (" + this.getExtraNote() + ")";
	}
	if (this.isOfficial()) {
		res += " " + _("txtDescOfficial");
	}
	return res.trim();
}

PatchProject.prototype.toString = function() {
	return this.getDesc(true);
}

PatchProject.prototype.sort = function(otherProject) {
	return this.getDescForSort().localeCompare(otherProject.getDescForSort());
}

PatchProject.createFromJson = function(fullJson, games, langs) {
	var res = [];
	for (var i in fullJson) {
		res[fullJson[i].projectId] = new PatchProject(fullJson[i], games[fullJson[i].game], langs[fullJson[i].lang]);
	}
	return res;
}
