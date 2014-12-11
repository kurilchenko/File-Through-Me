var FileDataList = function(files) {
	this.setFiles(files);
};

FileDataList.prototype.files = [];

FileDataList.prototype.setFiles = function(files) {
	this.files = files || this.files;
	this.inform();
};

FileDataList.prototype.inform = function() {
	if (this.viewRender) {
		this.viewRender();
	}
};

FileDataList.prototype.add = function(fileData) {
	this.files.unshift(fileData);
	fileData.subscribe(this.inform);
	this.inform();
};

FileDataList.prototype.merge = function(fileDataList) {
	this.files = this.files.concat(fileDataList.files);
	this.viewRender = this.viewRender || fileDataList.viewRender;
	this.inform();
};

FileDataList.prototype.subscribe = function(viewRender) {
	this.viewRender = viewRender;
};

FileDataList.prototype.sortBy = function(options) {
	// Sort by date.
	this.files.sort(function(fileA, fileB) { 
		if (fileA.modifiedAt > fileB.modifiedAt) {
			return -1;
		}
		else if (fileA.modifiedAt < fileB.modifiedAt) {
			return 1;
		}
		return 0;
	});

	this.inform();
};

module.exports = FileDataList;