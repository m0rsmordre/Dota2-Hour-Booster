
try {

        SteamUser = require('steam-user');

        SteamTOTP = require('steam-totp');

} catch (ex) {

   console.log('| [Modules] |: Missing dependencies. Install a version with dependecies or use npm install.');
   console.log(ex);
   process.exit(1);
}


const steam_idle = new SteamUser();
