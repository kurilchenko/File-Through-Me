var Screen = require('../screens/screen'),
	cloud = require('../cloudPlatform'),
	React = require('react'),
	AppView = require('../views/appView.jsx');

var AppScreen = function(screenManager, fileDataList, options) {
	Screen.call(this, 'app');

	this._screenManager = screenManager;
	this._fileDataList = fileDataList;

	if (options) {
		this._uploadManager = false || options.uploadManager;
	}
};

AppScreen.prototype = Object.create(Screen.prototype);

AppScreen.prototype.constructor = AppScreen;

AppScreen.prototype._screenManager = false;

AppScreen.prototype._fileDataList = false;

AppScreen.prototype._uploadManager = false;

AppScreen.prototype.set = function() {
	var context = this;

	function renderView() {
		React.render(
			<AppView 
				files={context.getFileDataList().files} 
				uploadManager={context._uploadManager}
				screenManager={context._screenManager} />, 
			document.getElementById('appContainer')
		);
	}

	renderView();

	this.getFileDataList().subscribe(renderView);

	cloud.readFileNames(cloud.defaultFolder, function(fileNames) {
		if (fileNames.length == 0) { 
			return;
		}

		cloud.makeFileDataList(cloud.defaultFolder, fileNames, function(fileDataList) {
			context.getFileDataList().merge(fileDataList);
			context.getFileDataList().sortBy('date');
		});
	});
};

AppScreen.prototype.unset = function() {
	React.unmountComponentAtNode(document.getElementById('appContainer'));
};

AppScreen.prototype.getFileDataList = function() {
	return this._fileDataList;
};

AppScreen.prototype.setFileDataList = function(fileDataList) {
	this._fileDataList = fileDataList;
};

module.exports = AppScreen;