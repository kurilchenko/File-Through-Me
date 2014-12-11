var React = require('react'),
	FileView = require('../views/fileView.jsx');

var FilesView = React.createClass({
	render: function() {
		function renderFiles(files) {
			var fileViews = [];

			files.forEach(function(file) {
				fileViews.push( 
					<FileView key={file.path} file={file} />
				);
			});

			return fileViews;
		}

		return (
			<ul>
				{renderFiles(this.props.files)}
			</ul>
		);
	}
});

module.exports = FilesView;