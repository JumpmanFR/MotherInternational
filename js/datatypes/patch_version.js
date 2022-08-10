function PatchVersion(json) {
	this.getCrc = function() {
		return json.crc;
	}
	this.getPatchFileName = function() {
		return json.patchId + json.patchExt;
	}
	this.getVersionValue = function() {
		return json.version || "";
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
	this.getYear = function() {
		return json.year ? json.year.toString() : "";
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

	this.requestPatchUsage = function() {
		var _this = this;
		return new Promise((successCallback, failureCallback) => {
			var preSuccess = function(result) {
				_this.usage = result;
				successCallback(result);
			}

			if (_this.usage) {
				preSuccess(_this.usage);
			} else if (!STATS_FAKE) {
				var xhr = new XMLHttpRequest();
				xhr.open('GET', `${STATS_VALUE_URL}?${STATS_VALUE_PARAM}=${json.patchId}`);
				xhr.onreadystatechange = function() {
					if (xhr.readyState === XMLHttpRequest.DONE) {
						if (xhr.status === 200 && xhr.responseText) {
							preSuccess(xhr.responseText);
						} else {
							failureCallback();
						}
					}
				};
				xhr.onerror = function() {
					failureCallback();
				}
				xhr.send('');
			} else {
				console.log(`FAKE server request: number of uses for patch ${json.patchId}`);
				setTimeout(function () {
					var fakeValue = Math.floor(Math.random() * 1000);
					console.log(`FAKE server response: returning ${fakeValue} uses for patch ${json.patchId}`);
					preSuccess(fakeValue + "🤥");
				}, 2000);
			}
		});
	}

	this.incrementPatchUsage = function() {
		var _this = this;
		return new Promise((successCallback, failureCallback) => {
			var preSuccess = function(result) {
				if (result) {
					_this.usage = result;
					_this.usageIncremented = true;
				}
				successCallback(result);
			}
			if (_this.usageIncremented) { // don’t count a patchId twice for the same session
				preSuccess(NaN);
			} else if (!STATS_FAKE) {
				var xhr = new XMLHttpRequest();
				xhr.open('POST', STATS_INCREMENT_URL);
				xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				xhr.onreadystatechange = function() {
					if (xhr.readyState === XMLHttpRequest.DONE) {
						if (xhr.status === 200 && xhr.responseText) {
							preSuccess(xhr.responseText);
						} else {
							failureCallback();
						}
					}
				};
				xhr.onerror = function() {
					failureCallback();
				}
				xhr.send(`${STATS_INCREMENT_PARAM}=${json.patchId}`);
			} else {
				console.log(`FAKE server request: incrementation of uses for patch ${json.patchId}`);
				setTimeout(function () {
					var fakeValue;
					if (_this.usage) {
						fakeValue = parseInt(_this.usage) + 1;
					} else {
						fakeValue = Math.floor(Math.random() * 1000);
					}
					console.log(`FAKE server response: incremented to ${fakeValue} uses for patch ${json.patchId}`);
					preSuccess(fakeValue + "🤥");
				}, 2000);
			}
		});
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
PatchVersion.prototype.getGameLocalName = function() {
	return this.parentProject.getGameLocalName();
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
PatchVersion.prototype.isUpdateOf = function(targetVersion) {
	return this.isSameProjectAs(targetVersion) && this.isLatestVersion() && !targetVersion.isAltLatestVersion() && !targetVersion.isSpecialHidden();
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

PatchVersion.prototype.getExportName = function() {
	var res = '';
	
	if (this.parentProject.isOfficial()) {
		res += _('txtUnpatched').replace('%', this.parentProject.getLangName(true));
	} else {
		res += _('txtPatched').replace('%', this.parentProject.getLangName(true));
		res += ' ';
		if (this.getVersionValue()) {
			if (this.getAuthorFallback()) {
				res += this.getAuthorFallback().charAt(0);
			}
			res += this.getVersionValue();
		} else {
			if (this.getAuthorFallback()) {
				res += this.getAuthorFallback();
			}
		}
	}

	return res;
}

PatchVersion.prototype.getDesc = function(withGameTitle, withDetails, withYear) {
	var res = "";
	res += this.parentProject.getLangFlag();
	if (withGameTitle) {
		res += " " + this.getGameLocalName();
		res += " – " + this.parentProject.getLangName()
	} else {
		res += " " + Utils.capitalizeFirstLetter(this.parentProject.getLangName());
	}
	if (this.getVersionValue() && !this.isSpecialHidden()) {
		res += " " + _("txtDescVersion") + this.getVersionValue();
	}
	if (this.getAuthorFallback() && (!this.parentProject.isOfficial() || withDetails)) {
		res += " " + _("txtDescBy") + " " + this.getAuthorFallback();
	}
	if (this.isSpecialHidden() && this.getVersionValue()) { // here the version field acts as a description for this special hidden ROM
		res += " (" + this.getVersionValue() + ")";
	}
	if (withDetails && this.parentProject.getExtraNote()) {
		res += " (" + this.parentProject.getExtraNote() + ")";
	} else if (withDetails && this.parentProject.isOfficial()) {
		res += " (" + _('txtDescOfficial')  + ")";
	}

	if (withYear && this.getYear()) {
		res += " (" + this.getYear() + ")";
	}
	return res.trim();
}

PatchVersion.prototype.sort = function(otherVersion) {
	return this.parentProject.sort(otherVersion.parentProject)
		|| ((this.getYear() && otherVersion.getYear()) ? this.getYear().localeCompare(otherVersion.getYear()) : 0)
		|| ((this.getVersionValue()).localeCompare(otherVersion.getVersionValue()));
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
