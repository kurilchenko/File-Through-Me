var app = app || {},
	cloud = require('./cloudPlatform'),
	FileDataList = require('./fileDataList'),
	UploadManager = require('./uploadManager'),
	ScreenManager = require('./screens/screenManager'),
	LandingScreen = require('./screens/landingScreen'),
	AppScreen = require('./screens/appScreen.jsx'),
	PanelUrl = require('./panelUrl.jsx');

app.fileDataList = new FileDataList();

global.app = app;

function main() {
	var screenManager = new ScreenManager(),
		uploadManager = new UploadManager(app.fileDataList),
		appScreen = new AppScreen(screenManager, app.fileDataList, {
			uploadManager: uploadManager
		}),
		landingScreen = new LandingScreen(screenManager);

	screenManager.addScreen(appScreen);
	screenManager.addScreen(landingScreen);

	app.panelUrl = new PanelUrl(document.getElementById('panelContainer'));

	cloud.start(function(status, error) {
		if (status !== cloud.authStatus.SIGNED_IN) {
			screenManager.setScreen(landingScreen);
		}
		else {
			screenManager.setScreen(appScreen);
		}
	});
}

window.addEventListener('load', function load() { 
	window.removeEventListener('load', load, false);
	main();
});


