
try {

	colors = require('colors');
} catch (ex) {

	console.log('| [Modules] |: Missing dependencies. Install a version with dependecies or use npm install.');
	console.log(ex);
	process.exit(1);
}

require('./app/app.js');


