function PatchVersion(json) {
	this.getCrc = function() {
		return json.crc;
	}
	this.getFileName = function() {
		return json.patchId + json.patchExt;
	}
	this.getVersionValue = function() {
		return json.version;
	}
	this.getAuthor = function() {
		return json.author;
	}
	this.hasDoc = function() {
		return !!json.hasDoc;
	}
	this.getWebsite = function() {
		return json.website;
	}
	this.getExtraNote = function() {
		return json.extraNote;
	}
	this.isReversible = function() {
		return !json.isOneWayOnly;
	}
	this.getBaseRomId = function() {
		return json.baseRom || json.patchId;
	}
	this.isSpecialHidden = function() { // things such as «EarthBound rom with header, sometimes used as in input»
		return !!json.isSpecialHidden;
	}
}

PatchVersion.prototype.setParentProject = function(patchProject) {
	this.parentProject = patchProject;
}
PatchVersion.prototype.getAuthorFallback = function() {
	 return this.getAuthor() || (this.parentProject ? this.parentProject.getAuthor() : undefined);
}
PatchVersion.prototype.getPatchProject = function() {
	return this.parentProject;
}
PatchVersion.prototype.getGameId = function() {
	return this.parentProject.getGameId();
}
PatchVersion.prototype.getGameShortName = function() {
	return this.parentProject.getGameShortName();
}
PatchVersion.prototype.getGameFullName = function() {
	return this.parentProject.getGameFullName();
}
PatchVersion.prototype.getLangId = function() {
	return this.parentProject.getLangId();
}
PatchVersion.prototype.isSameProjectAs = function(targetVersion) {
	return this.parentProject && (this.parentProject == targetVersion.parentProject);
}

PatchVersion.prototype.isLatestVersion = function() {
	if (this.parentProject) {
		return this.parentProject.thisIsLatestVersion(this);
	} else {
		return false;
	}
}
PatchVersion.prototype.isAltLatestVersion = function() {
	if (this.parentProject) {
		return this.parentProject.thisIsAltLatestVersion(this);
	} else {
		return false;
	}
}
PatchVersion.prototype.isWorthShowing = function() {
	return this.isAltLatestVersion() && !this.isSpecialHidden();
}

PatchVersion.prototype.getDesc = function(withGameTitle, alwaysWithAuthor, withProjectNote) {
	var res = "";
	res += this.parentProject.getLangFlag() + " ";
	if (withGameTitle) {
		res += this.getGameFullName() + " – ";
	}
	res += this.parentProject.getLangName() + " ";
	if (this.getVersionValue() && !this.isSpecialHidden()) {
		res += _("txtDescVersion") + this.getVersionValue() + " ";
	}
	if (this.getAuthorFallback() && (!this.parentProject.isOfficial() || alwaysWithAuthor)) {
		res += _("txtDescBy") + " " + this.getAuthorFallback() + " ";
	}
	if (this.isSpecialHidden() && this.getVersionValue()) { // here the version field acts as a description for this special hidden ROM
		res += "(" + this.getVersionValue() + ") ";
	}
	if (withProjectNote && this.parentProject.getExtraNote()) {
		res += "(" + this.parentProject.getExtraNote() + ") ";
	}
	if (withProjectNote && this.parentProject.isOfficial()) {
		res += " " + _("txtDescOfficial");
	}
	return res.trim();
}

PatchVersion.prototype.toString = function() {
	return this.getDesc(true, false);
}

PatchVersion.createFromJson = function(fullJson, patchProjects) {
	var res = {};
	for (var i in fullJson) {
		res[fullJson[i].patchId] = new PatchVersion(fullJson[i]);
		if (patchProjects && patchProjects[fullJson[i].projectId]) {
			patchProjects[fullJson[i].projectId].addVersion(res[fullJson[i].patchId]);
		}
	}
	return res;
}

// Fields present in both PatchProject and PatchVersion: extraNote, website, author
