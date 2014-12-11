var	React = require('react'),
	PanelUrlView = require('./views/panelUrlView.jsx');

var PanelUrl = function(mountNode) {
	this._mountNode = mountNode;
	this._isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
};

PanelUrl.prototype._mountNode = false;

PanelUrl.prototype._isMac = false;

PanelUrl.prototype._viewRender = function(url, x, y, isHidden) {
	React.render(
		<PanelUrlView url={url} x={x} y={y} isHidden={isHidden} isMac={this._isMac} />, 
		this._mountNode
	);
}

PanelUrl.prototype.set = function(url, x, y) {
	this._viewRender(url, x, y);
}

PanelUrl.prototype.unset = function() {
	this._viewRender(false, 0, 0, true);
}

module.exports = PanelUrl;