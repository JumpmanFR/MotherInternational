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
		return json.getAuthor || this.parentProject.getAuthor();
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
		return !json.irreversible;
	}
	this.isBaseRom = function() {
		return this.getBaseRomId() == json.patchId;
	}
	this.getBaseRomId = function() {
		return json.baseRom || json.patchId;
	}
	this.isSpecialAltRom = function() { // things such as «EarthBound rom with header, sometimes used as in input»
		return !!json.isSpecialAltRom;
	}
	this.isAltVersionOf = function() { // when a team makes a new version that doesn’t entirely replaces the old one
		return json.isAltVersionOf;
	}
}

PatchVersion.prototype.setParentProject = function(patchProject) {
	this.parentProject = patchProject;
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
PatchVersion.prototype.hasPatchRouteTo = function(targetVersion) {
	if (this.getBaseRomId() != targetVersion.getBaseRomId()) {
		return false;
	}

	return this.isReversible() || this.isBaseRom();
}
PatchVersion.prototype.isLatestVersion = function() {
	if (this.parentProject) {
		return (this.parentProject.getLatestVersion() === this)
				|| (this.getVersionValue() == this.parentProject.getLatestVersion().isAltVersionOf());
	} else {
		return false;
	}
}
PatchVersion.prototype.isWorthShowing = function() {
	return this.isLatestVersion() && !this.isSpecialAltRom();
}

PatchVersion.prototype.getDesc = function(withGameTitle) {
	var res = "";
	if (PatchVersion.areFlagEmojiSupported()) {
		res += LANG_LIST[this.getLangId()].flag + " "; // TODO objet lang?
	}
	if (withGameTitle) {
		res += this.getGameFullName() + " – "; // TODO objet games?
	}
	res += LANG_LIST[this.parentProject.getLangId()].name + " "; // TODO objet ang?
	if (this.getVersionValue() && !this.isSpecialAltRom()) {
		res += _("txtDescVersion") + this.getVersionValue() + " ";
	}
	if (this.getAuthor()) {
		res += _("txtDescBy") + " " + this.getAuthor() + " ";
	}
	if (this.isSpecialAltRom()) {
		res += "(" + this.getVersionValue() + ") ";
	}
	return res;
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

PatchVersion.areFlagEmojiSupported = function() {
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

// Fields present in both PatchProject and PatchVersion: extraNote, website, author
