const app = require("express")();
require('dotenv').config();
let port = process.env.port || 3000;

app.get('/', (req,res) => {
	res.send("sa");
})

app.listen(port, () =>{
	console.log("Server ayakta");
	console.log(`Server is running on port ${port}.`);
})

try {

	SteamUser = require('steam-user');

	SteamTotp = require('steam-totp');

	SteamCommunity = require('steamcommunity');
} catch (ex) {
	
	console.log('| [Modules] |: Missing dependencies. Install a version with dependecies or use npm install.');
	console.log(ex);
	process.exit(1);
}


//const config = require('./Settings/config.js');
const Steam = require('./steam.js');
const infolog = require('./infolog.js');
const method = require('./methods');

const client = new SteamUser();
const community = new SteamCommunity();


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

// APP START

// If auto generate method is used use options for login auto
if(method.AutoGenerateLoginCodes())
    {
    client.logOn(LogOnOptionsAUTO);
}
// If auto generate method is disabled use options for login manual
if(!method.AutoGenerateLoginCodes())
	{
    client.logOn(LogOnOptionsMANUAL);
}
    

// Set Idle Game
client.on('loggedOn', () => {
	client.setPersona(SteamUser.Steam.EPersonaState.LookingToTrade,);
	infolog.correct(` LOGIN |: User is logined to steam and script is ready to set idling game...`);
	// Setting game to idle for
	client.gamesPlayed(process.env.GameID,true);
	infolog.info(`| [IDLE] | GAMES |: Bot started idling for ${process.env.GameID}`);
});


// Steam-Games-Idle - Bot built by Refloow (-MajokingGames)

/* 
  Here is contact info: refloowlibrarycontact@gmail.com 
  or main dev steam: https://steamcommunity.com/id/MajokingGames/

 */
