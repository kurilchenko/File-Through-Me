var Screen = require('../screens/screen'),
	cloud = require('../cloudPlatform');

var LandingScreen = function(screenManager) {
	Screen.call(this, 'landing');

	var context = this;

	this._landingScreenElement = document.getElementById('landing');
	this._screenManager = screenManager;
	this._loadingScreenElement = document.getElementById('loadingScreen');

	document.getElementById('signInButton').addEventListener('click', function(event) { 
		event.preventDefault();

		context._loadingScreenElement.classList.remove('hidden');

		cloud.signIn(function(status) {
			if (status === cloud.authStatus.SIGNED_IN) {
				
			}
		});
	});
}

LandingScreen.prototype = Object.create(Screen.prototype);

LandingScreen.prototype.constructor = LandingScreen;

LandingScreen.prototype._landingScreenElement = false;

LandingScreen.prototype._screenManager = false;

LandingScreen.prototype._loadingScreenElement = false;

LandingScreen.prototype.set = function() {
	this._landingScreenElement.classList.remove('hidden');
	this._loadingScreenElement.classList.add('hidden');
};

LandingScreen.prototype.unset = function() {
	this._landingScreenElement.classList.add('hidden');
	this._loadingScreenElement.classList.remove('hidden');
};

module.exports = LandingScreen;