
require('dotenv').config();


const port = process.env.PORT || 3000;



try {

	SteamUser = require('steam-user');

	SteamTotp = require('steam-totp');

	SteamCommunity = require('steamcommunity');
} catch (ex) {
	
	console.log('| [Modules] |: Missing dependencies. Install a version with dependecies or use npm install.');
	console.log(ex);
	process.exit(1);
}



const Steam = require('./steam.js');
const infolog = require('./infolog.js');
const method = require('./methods');

const client = new SteamUser();
const community = new SteamCommunity();

let express = require('express'), app = express()


app.listen(port, () => {
    console.log("Server listening on port " + port);
});

const LogOnOptionsAUTO = {
	accountName: process.env.loginAccName,
	password: process.env.password,
	twoFactorCode: SteamTotp.generateAuthCode(process.env.shared_secret)
}

const LogOnOptionsMANUAL = {
	accountName: process.env.loginAccName,
	password: process.env.password,
}

// Checking for correct version (updates) for bot on github
/*if(method.UpdateNotifDisable()) {
    method.check();
}*/


if(method.AutoGenerateLoginCodes())
    {
    client.logOn(LogOnOptionsAUTO);
}

if(!method.AutoGenerateLoginCodes())
	{
    client.logOn(LogOnOptionsMANUAL);
}
    

// Set Idle Game
client.on('loggedOn', () => {
	client.setPersona(SteamUser.Steam.EPersonaState.LookingToTrade,);
	infolog.correct(` LOGIN |: User is logined to steam and script is ready to set idling game...`);
	// Setting game to idle for
	client.gamesPlayed({ game_id: process.env.GameID});
	infolog.info(`| [IDLE] | GAMES |: Bot started idling for ${process.env.GameID}`);
});



