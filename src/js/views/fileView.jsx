var React = require('react');

var FileView = React.createClass({
	getInitialState: function() {
		this.props.file.subscribe(this);
		return { file: this.props.file };
	},

	handleClick: function(event) {
	},

	handleMouseOver: function(event) {
		if (app.panelUrl) {
			app.panelUrl.set(this.refs.link.getDOMNode().href, event.pageX, event.pageY);
		}
	},

	handleMouseMove: function(event) {
		if (app.panelUrl) {
			app.panelUrl.set(this.refs.link.getDOMNode().href, event.clientX, event.clientY);
		}
	},

	handleMouseLeave: function(event) {
		if (app.panelUrl) {
			app.panelUrl.unset();
		}
	},

	render: function() {
		var context = this;

		function renderIconOrThumbnail() {
			if (context.props.file.thumbnailUrl) {
				return (
					<div className="thumbnail" style={{
						backgroundImage: 'url(' + context.props.file.thumbnailUrl + ')'
					}}></div>
				);
			}
		}

		function renderFile(file) {
			if (file.url) {
				return (
					<li>
						<a 
							className="link" 
							target="_blank" 
							ref="link" 
							onMouseMove={context.handleMouseMove}
							onMouseLeave={context.handleMouseLeave}
							onClick={context.handleClick} href={file.url}>
								{renderIconOrThumbnail()}{file.name}
						</a>
					</li>
				);
			} 
			else {
				return (
					<li className="uploading">
						<span className="file">{renderIconOrThumbnail()}{file.name} (uploading...)</span>
					</li>
				);
			}
		}

		return renderFile(this.props.file);
	}
});

module.exports = FileView;