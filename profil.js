// Init
const Discord = require('discord.js');
const pg = require('pg');
const connection = process.env.DATABASE_URL;

// On connecte le bot à la bdd
var client = new pg.Client(connection);
client.connect((err) => {
	if (err) {
		console.log('connection error : ' + err.stack);
		client.end();
		return 0;
	} else {
		console.log('connected');
	}
});


// Fonctions
function lvlUp (msg, lvl) {
	var user = msg.author;
	
	const embed = new Discord.RichEmbed()
	  .setAuthor("LVL UP", "https://www.dbarj.com.br/wp-content/uploads/2017/08/large1.png")
	  .setColor(0xFF9900)
	  .setDescription(user.username + ' passe niveau ' + lvl + ' !!')
	  .setThumbnail(user.avatarURL);

	msg.channel.send({embed});
}

var newMessage = function (msg) {
	var user = msg.author;
	client.query('SELECT id FROM members WHERE id=$1', [user.id], (err, res) => {
		if (err) {
			console.log(err.stack);
		} else {
			// On teste si le membre est dans la bdd
			if (res.rowCount === 0) {
				// Si non, on l'ajoute
				console.log(user.username + ' n\'est pas dans la bdd');
				client.query('INSERT INTO members(id, name, lvl, xp, messages, money) VALUES($1, $2, 1, 0, 1, 1000)', [user.id, user.username], (err) => {
					if (err) {
						console.log(err.stack);
						return 0;
					} else {
						console.log(user.username + ' a été ajouté à la table members');
					}
				});
			} else {
				// Si oui, on gère tout le bazard
				console.log(user.username + ' est dans la bdd');
				client.query('SELECT messages, xp, lvl FROM members WHERE id=$1', [user.id], (err, res) => {
					if (err) {
						console.log(err.stack);
						return 0;
					} else {
						var nbrMsg = res.rows[0].messages + 1,
						    xp = res.rows[0].xp + 1,
						    lvl = res.rows[0].lvl;
						// On incrémente le nombre de messages
						client.query('UPDATE members SET messages=messages+1 WHERE id=$1', [user.id], (err) => {
							if (err) {
								console.log(err.stack);
							}
						});
						// On lvl up si besoin
						var forLvl = Math.round((4*(Math.pow(lvl, 2)))/5);
						if (xp >= forLvl) {
							xp -= forLvl;
							lvl++;
							lvlUp(msg, lvl);
						}
						// On met tout dans la bdd
						client.query('UPDATE members SET lvl=$1 WHERE id=$2', [lvl, user.id], (err) => {
							if (err) {
								console.log(err.stack);
							}
						});
						client.query('UPDATE members SET xp=$1 WHERE id=$2', [xp, user.id], (err) => {
							if (err) {
								console.log(err.stack);
							}
						});
					}
				});
			}
		}
	});
};


// Export
module.exports = {
  newMessage: newMessage
};
