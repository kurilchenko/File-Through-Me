var FileData = function(data) {
	this.setData(data);
};

FileData.prototype.setData = function(data) {
	data = data || {};
	this.platform = this.platform || data.platform
	this.name = this.name || data.name;
	this.version = this.version || data.version;
	this.modifiedAt = this.modifiedAt || data.modifiedAt;
	this.path = this.path || data.path;
	this.url = this.url || data.url;
	this.thumbnailUrl = this.thumbnailUrl || data.thumbnailUrl;

	if (this.view) {
		this.view.setState({
			file: this
		});
	}
};


FileData.prototype.subscribe = function(view) {
	this.view = view;
};

module.exports = FileData;