var	React = require('react'),
	cloud = require('../cloudPlatform'),
	FilesView = require('../views/filesView.jsx');

var AppView = React.createClass({
	handleSignOutButtonClick: function(event) {
		this.props.screenManager.setScreen('landing');
		cloud.signOut(function() {});
	},

	handleFileInputButtonClick: function(event) {
		this.refs.filesInput.getDOMNode().click();
	},

	handleFileInputChange: function(event) {
		if (this.props.uploadManager) {
			this.props.uploadManager.sendFiles(event.target.files);
		}
		
	},

	render: function() {
		return (
			<div id="app" className="screen">
				<header>
					<a id="signOutButton" onClick={this.handleSignOutButtonClick}>Sign Out</a>
				</header>
				<section className={ 
					this.props.files.length > 0 ? 'uploadArea' : 'uploadArea fullscreen'
				}>
					<div className="wrapper">
						<h1 className="logo">File Through Me</h1>
						<div className="center">
							<h2>
								<em>Drop</em> your files here<br />
								or <em><a id="filesInputLink" onClick={this.handleFileInputButtonClick}>Attach</a></em>
							</h2>
						</div>
						<div className="inputWrapper">
							<input type="file" ref="filesInput" onChange={this.handleFileInputChange} multiple id="filesInput" name="files[]" multiple />
						</div>
					</div>
				</section>
				<section className="files">
					<div className="wrapper">
						<div className="progress-wrapper uploading">
							<div className="progress"></div>
						</div>
						<div id="filesView">
							<FilesView files={this.props.files} />
						</div>
					</div>
				</section>
			</div>
		);
	}
});

module.exports = AppView;