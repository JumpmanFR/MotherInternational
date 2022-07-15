/* ZIP module for Rom Patcher JS, Mother International version - Marc Robledo 2016-2019, JumpmanFR 2021-2022 */
const ZIP_MAGIC='\x50\x4b\x03\x04';

function parseZIPFile(zipFile, unzipEntryName){
	var regex=(zipFile===patchFile)? /\.(ups)$/i : /\.(gba|agb|bin)$/i;
	var txtRegex=(zipFile===patchFile)? /\.(txt)$/i : /^$/i;
	setMessage('apply', _('unzipping'), 'loading');

	var arrayBuffer=zipFile._u8array.buffer;
	zip.createReader(
		new zip.BlobReader(new Blob([arrayBuffer])),
		function(zipReader){
			zipReader.getEntries(function(zipEntries){
				var zippedFiles=[];
				var txtFile;
				for(var i=0; i<zipEntries.length; i++){
					if(typeof unzipEntryName==='string' && unzipEntryName === zipEntries[i].filename){
						zippedFiles=[zipEntries[i]];
						break;
					}else if(regex.test(zipEntries[i].filename)){
						zippedFiles.push(zipEntries[i]);
					}else if(txtRegex.test(zipEntries[i].filename)){
						txtFile=zipEntries[i];
					}
				}

				if(zippedFiles.length>=1){
					if (txtFile) {
						txtFile.isDocFile = true;
						unzipEntry(txtFile);
					}
					zippedFiles[0].originalZipFile=zipFile;
					unzipEntry(zippedFiles[0]);
				}else{
					if(zipFile===romFile){
						romFile=null;
						setMessage('apply', _('error_no_rom_in_archive'), 'error');
					}else{
						patchFile=null;
						setMessage('apply', _('error_invalid_patch'), 'error');
					}
					setTabApplyEnabled(true);
				}
			});
		},
		function(zipReader){
			setTabApplyEnabled(true);
			setMessage('apply', _('error_unzipping'), 'error');
		}
	);
}

function unzipEntry(zipEntry){
	zipEntry.getData(new zip.BlobWriter(), function(blob){
		var fileReader=new FileReader();
		fileReader.onload=function(){
			var unzippedFile=new MarcFile(this.result);
			unzippedFile.fileName=zipEntry.filename;
			if(zipEntry.originalZipFile===romFile){
				romFile=unzippedFile;
				_parseROM();
			}else if(zipEntry.originalZipFile===patchFile){
				patchFile=unzippedFile;
				_readPatchFile();
			}else if(zipEntry.isDocFile) {
				docFile=unzippedFile;
			}
		};
		fileReader.readAsArrayBuffer(blob);
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

function _evtClickZipEntry(evt){
	document.body.removeChild(this.parentElement.parentElement.parentElement);
	unzipEntry(this.zipEntry);
}