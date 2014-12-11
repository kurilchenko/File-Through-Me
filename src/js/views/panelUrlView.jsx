var	React = require('react');

var PanelUrlView = React.createClass({
	componentDidUpdate: function() {
		if (this.props.url) {
			this.refs.urlOutput.getDOMNode().focus();
			this.refs.urlOutput.getDOMNode().select();
		}
	},

	render: function() {
		return (
			<div className={ this.props.isHidden ? 'panel hidden' : 'panel' } style={{
				top: this.props.y,
				left: this.props.x
			}}>
				<p>Press <strong>{ this.props.isMac ? '⌘C' : 'Ctrl+C'}</strong> to copy URL</p>
				<input type="text" ref="urlOutput" readOnly value={this.props.url} />
			</div>
		);	
	}
});

module.exports = PanelUrlView;