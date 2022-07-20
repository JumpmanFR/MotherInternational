/* ZIP module for Rom Patcher JS, Mother International version - Marc Robledo 2016-2019, JumpmanFR 2021-2022 */
const ZIP_MAGIC='\x50\x4b\x03\x04';

function parseZIPFile(zipFile, regex) {
	
	return new Promise((successCallback, failureCallback) => {
		var arrayBuffer=zipFile._u8array.buffer;
		zip.createReader(
			new zip.BlobReader(new Blob([arrayBuffer])),
			function (zipReader) {
				zipReader.getEntries(function(zipEntries) {
					var targetFile;
					for(var i = 0; i < zipEntries.length; i++) {
						if (regex.test(zipEntries[i].filename) || zipEntries.length == 1) {
							targetFile = zipEntries[i];
							break;
						}
					}

					if (targetFile) {
						unzipEntry(targetFile)
							.then(unzippedFile => {
								successCallback(unzippedFile);
							});
					} else {
						successCallback();
					}
				});
			},
			function (zipReader) {
				failureCallback(); // TODO erreur dézip
			}
		);
	});
}

function unzipEntry(zipEntry){
	return new Promise((successCallback, failureCallback) => {
		zipEntry.getData(new zip.BlobWriter(), function(blob){
			var fileReader = new FileReader();
			fileReader.onload = function(){
				var unzippedFile = new MarcFile(this.result);
				unzippedFile.fileName = zipEntry.filename;
				successCallback(unzippedFile);
			};
			fileReader.readAsArrayBuffer(blob);
		});
	});
}

function createZIPFile(entryFiles, zipName, callback) {
	//var arrayBuffer = entryFiles[0]._u8array.buffer;
	zipBlob(entryFiles, function(zippedBlob) {
		// unzip the first file from zipped data stored in zippedBlob
		zippedBlob.name=zipName;
		zippedBlob.lastModifiedDate = new Date();
		var mf = new MarcFile(zippedBlob, function() {
			if (callback) {
				callback(mf);
			}
		});
	});
}

function zipBlob(files, callback) {
  // use a zip.BlobWriter object to write zipped data into a Blob object
  zip.createWriter(new zip.BlobWriter("application/zip"), function(zipWriter) {
    // use a BlobReader object to read the data stored into blob variable
    addFilesToZIP(zipWriter, files, function() {
    //zipWriter.add(filename, new zip.BlobReader(blob), function() {
      // close the writer and calls callback function
      zipWriter.close(callback);
    });
  }, onerror);
}

function addFilesToZIP(zipWriter, entryFiles, callback) {
	var firstFile = entryFiles.pop();
	if (firstFile) {
		var fileName = firstFile.fileName;
		var blob = new Blob([firstFile._u8array.buffer]);
		zipWriter.add(fileName, new zip.BlobReader(blob), function() {
			addFilesToZIP(zipWriter, entryFiles, callback);
		});
	} else {
		if (callback) {
			callback();
		}
	}
}