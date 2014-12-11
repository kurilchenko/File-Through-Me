var ScreenManager = function() {};

ScreenManager.prototype._screens = [];

ScreenManager.prototype.addScreen = function(screen) {
	this._screens.push(screen);
};

ScreenManager.prototype.getScreen = function(target) {
	var screens = this._screens,
		targetScreen,
		i = 0;

	switch(typeof target) {
		case 'string':
			for(i = 0; i < screens.length; i += 1) {
				if (target === screens[i].name) {
					targetScreen = screens[i];
					break;
				}
			}
			break;
		case 'object':
			for(i = 0; i < screens.length; i += 1) {
				if (target === screens[i]) {
					targetScreen = screens[i];
					break;
				}
			}		
			break;
	}

	if (!targetScreen) {
		console.log("Didn't find a screen:", target);
	}

	return targetScreen;
}

ScreenManager.prototype.setScreen = function(target, options) {
	var targetScreen = this.getScreen(target);

	if (!targetScreen) {
		return;
	}

	this._screens.forEach(function(screen) { 
		if (screen === targetScreen) {
			screen.set();
		}
		else {
			screen.unset();
		}
	});

	return targetScreen;
};

module.exports = ScreenManager;