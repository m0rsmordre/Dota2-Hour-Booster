

try {
    // Checking if module colors is installed
    colors = require('colors');
    // Checking if module moment is installed
    moment = require('moment');
} catch (ex) {
    // If modules are not installed showing an clear error message to user.
    console.log('| [Modules] |: Missing dependencies. Install a version with dependecies or use npm install.');
    console.log(ex);
    process.exit(1);
}

// We recommend not editing stuff that is in this file.

// Importing files into project
const package = require('./../package.json');
const config = require('./Settings/config.js');

t = module.exports = {

    // Method for disabling auto generating codes
    AutoGenerateLoginCodes: function() {
        return config.SteamGuardAuto == true;
    },

    // Method for disabling update notifications
    UpdateNotifDisable: function() {
        return config.UpdateNotif_Enable == true;
    },

    
        
    }
}

