var FileDataList = require('./fileDataList');
var FileData = require('./fileData');
var cloud = {};

cloud.name = 'Dropbox';
cloud.APP_KEY = 'vt1ky4411qzbwvo';
cloud.authStatus = Object.freeze({
	FAIL: 0, 
	SIGNED_OFF: 1, 
	SIGNED_IN: 2
});
cloud.client = new Dropbox.Client({ key: cloud.APP_KEY });
cloud.defaultFolder = 'Default';

cloud.start = function(callback) {
	var client = cloud.client;

	// Try to use cached credentials.
	client.authenticate({interactive: false}, function(error, client) {
		var status;

		if (error) {
			status = cloud.authStatus.FAIL;
		}
		else {
			status = client.isAuthenticated() ? cloud.authStatus.SIGNED_IN : cloud.authStatus.SIGNED_OFF;
		}

		callback(status);
	});
};

cloud.signIn = function(callback) {
	var client = cloud.client;

	console.log('signing IN...');

	client.authenticate(function(error, client) {
		var status;

		if (error) {
			status = cloud.authStatus.FAIL;
		}
		else {
			status = cloud.authStatus.SIGNED_IN;
			console.log('signed IN!');
		}

		if (callback) {
			callback(status);
		}
	});
};

cloud.signOut = function(callback) {
	var client = cloud.client;

	console.log('signing OUT...');

	client.signOut({}, function(error) {
		if (error) {

		}

		console.log('signed OFF!');

		if (callback) {
			callback();
		}
	});
}

cloud.readFileNames = function(directoryName, callback) {
	var client = cloud.client;

	client.readdir(directoryName, {}, function(error, fileNames) {
		if (error) {
			console.log(error);
			return;
		}

		callback(fileNames);
	});
}

cloud.makeFileDataList = function(directoryName, fileNames, callback) {
	var client = cloud.client;
	var stats = [];
	
	fileNames.forEach(function(fileName) {
		var pathToFile = directoryName + '/' + fileName;

		client.stat(pathToFile, {}, function(error, stat) {
			if (error) {
				console.log(error);
				return;
			}

			stats.push(stat);

			// When reading the last stat.
			if (fileNames.length == stats.length) {
				var fileDataList = cloud.getFileDataList(directoryName, stats)
				callback(fileDataList);
			}
		});
	});
}

cloud.readFiles = function(directoryName, callback) {
	var client = cloud.client;
	var stats = [];

	client.readdir(directoryName, {}, function(error, fileNames) {
		if (error) {
			console.log(error);
			return;
		}

		fileNames.forEach(function(fileName) {
			var pathToFile = directoryName + '/' + fileName;

			client.stat(pathToFile, {}, function(error, stat) {

				stats.push(stat);

				// When reading the last stat.
				if (fileNames.length == stats.length) {
					var fileDataList = cloud.getFileDataList(directoryName, stats)
					callback(fileDataList);
				}
			});

		});
	});
};

cloud.getFileDataList = function(directoryName, stats) {
	var client = cloud.client;
	var files = [];

	stats.forEach(function(stat) {
		files.push(cloud.getFileData(stat));
	});

	return new FileDataList(files);
};

cloud.getDataFrom = function(stat) {
	var client = cloud.client;

	return {
		platform: cloud.name,
		name: stat.name, 
		version: stat.versionTag,
		modifiedAt: stat.modifiedAt,
		path: stat.path,
		thumbnailUrl: stat.hasThumbnail ? client.thumbnailUrl(stat.path, {size: 'm'}) : ''
	}
}

cloud.makeUrlFor = function(fileData, stat) {
	var client = cloud.client;

	/*
	* We want to have long-living direct/download links for images and
	* long-living preview links for other types of files.
	*/
	// If mimeType matches 'image/' e.g 'image/jpeg', 'image/png'.
	var urlOptions = stat.mimeType.indexOf('image/') > -1 ?
		{ downloadHack: true } : 
		{ long: true };

	client.makeUrl(stat.path, urlOptions, function(error, shareUrl) { 
		fileData.setData({
			url: shareUrl.url
		});
	});	
}

cloud.getFileData = function(stat) {
	var client = cloud.client;

	var fileData = new FileData(cloud.getDataFrom(stat));

	cloud.makeUrlFor(fileData, stat);

	return fileData;
};

cloud.writeFile = function(path, file, outFileData, callback) {
	cloud.client.writeFile(path, file, { noOverwrite: true }, function(error, stat) {
		if (error) {
			console.log(error);
			return;
		}

		if (outFileData) {
			outFileData.setData(cloud.getDataFrom(stat));
			cloud.makeUrlFor(outFileData, stat);
		}

		if (callback) {
			callback();
		}
	});
};

module.exports = cloud;