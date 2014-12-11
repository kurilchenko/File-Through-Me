var cloud = require('./cloudPlatform'),
	FileData = require('./fileData');

var UploadManager = function(fileDataList) {
	this._fileDataList = fileDataList;

	window.addEventListener('dragover', this.handleDragOver.bind(this), false);
	window.addEventListener('drop', this.handleFileSelect.bind(this), false);
};

UploadManager._fileDataList = false;

UploadManager.prototype.handleFileSelect = function(event) {
	event.stopPropagation();
	event.preventDefault();

	var files = event.type == 'drop' ? event.dataTransfer.files : event.target.files;
	this.sendFiles(files);
}

UploadManager.prototype.sendFiles = function(files) {
	for (var i = 0, f; f = files[i]; i++) {

		var fileData = new FileData({ 
			name: f.name,
			// setting 'path' for the sake of creating a key for a view
			// TODO: it may bring a bug when the path is repeating an existing one
			path: cloud.defaultFolder+'/'+f.name 
		});

		this._fileDataList.add(fileData);

		cloud.writeFile(cloud.defaultFolder+'/'+f.name, f, fileData);
	}
}

UploadManager.prototype.handleDragOver = function(event) {
	event.stopPropagation();
	event.preventDefault();
	event.dataTransfer.dropEffect = 'copy';
}

module.exports = UploadManager;