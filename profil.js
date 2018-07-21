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

// TEMP
client.query('SELECT * FROM members', (err,res) => {
	if (err) {
		console.log(err.stack);
	} else {
		console.log(res);
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
				client.query('INSERT INTO members(id, name, lvl, xp, messages, money, lastmsg, avatar) VALUES($1, $2, 1, 0, 1, 1000, CURRENT_TIMESTAMP, $3)', [user.id, user.username, user.avatarURL], (err) => {
					if (err) {
						console.log(err.stack);
						return 0;
					} else {
						console.log(user.username + ' a été ajouté à la table members');
					}
				});
			} else {
				// Si oui, on gère tout le bazard
				client.query('SELECT messages, xp, lvl FROM members WHERE id=$1', [user.id], (err, res) => {
					if (err) {
						console.log(err.stack);
						return 0;
					} else {
						var nbrMsg = res.rows[0].messages + 1,
						    xp = res.rows[0].xp + 1,
						    lvl = res.rows[0].lvl;
						// On incrémente le nombre de messages
						client.query('UPDATE members SET messages=messages+1, lastmsg=CURRENT_TIMESTAMP, avatar=$1 WHERE id=$2', [user.avatarURL, user.id], (err) => {
							if (err) {
								console.log(err.stack);
							}
						});
						// On lvl up si besoin
						var forLvl = Math.round((4*(Math.pow(lvl, 2)))/5);
						if (xp >= forLvl) {
							xp -= forLvl;
							lvl++;
							/*if (lvl > 5 && lvl != 7) {
								lvlUp(msg, lvl);
							}*/
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

var newCommand = function (user, command) {
	client.query('SELECT name FROM commands WHERE name=$1', [command], (err, res) => {
		if (err) {
			console.log(err.stack);
		} else {
			// On teste si la commande est dans la bdd
			if (res.rowCount === 0) {
				// Si non, on l'ajoute
				console.log(command + ' n\'est pas dans la bdd');
				client.query('INSERT INTO commands(name, nbruses, lastuse, userid) VALUES($1, 1, CURRENT_TIMESTAMP, $2)', [command, user.id], (err) => {
					if (err) {
						console.log(err.stack);
						return 0;
					} else {
						console.log(command + ' a été ajoutée à la table commands');
					}
				});
			} else {
				// Déjà dans la bdd, on l'update
				client.query('UPDATE commands SET nbruses=nbruses+1, lastuse=CURRENT_TIMESTAMP, userid=$1 WHERE name=$2', [user.id, command], (err) => {
					if (err) {
						console.log(err.stack);
					}
				});
			}
		}
	});
}

function printLadder (res, salon) {
	var rank = '';
	
	for (var i = 0 ; i < res.length ; i++) {
		var j = i+1;
		rank += '#' + j + ' ' + res[i].name + ' (lvl ' + res[i].lvl + ') ' + res[i].messages + '\n';
	}
	
	salon.send('***Classement des membres***```' + rank + '```');
}

function printLadderCommandes (res, salon) {
	var rank = '';
	
	for (var i = 0 ; i < res.length ; i++) {
		var j = i+1;
		rank += '#' + j + ' ' + res[i].name + ' (' + res[i].nbruses + ')\n';
	}
	
	salon.send('***Commandes les plus utilisées***```' + rank + '```');
}

var classement = function (salon) {
	client.query('SELECT name, lvl, messages FROM members ORDER BY messages DESC LIMIT 10', (err, res) => {
		if (err) {
			console.log(err.stack);
		} else {
			printLadder(res.rows, salon);
		}
	});
}

var classementCommandes = function (salon) {
	client.query('SELECT name, nbruses FROM commands ORDER BY nbruses DESC LIMIT 10', (err, res) => {
		if (err) {
			console.log(err.stack);
		} else {
			printLadderCommandes(res.rows, salon);
		}
	});
}

var profil = function (salon, nom) {
	client.query('SELECT lvl, xp, messages, money, lastmsg FROM members WHERE name=$1', [nom], (err,res) => {
		if (err) {
			console.log(err.stack);
		} else {
			var val = res.rows[0];
			var lvlup = Math.round((4*(Math.pow(val.lvl, 2)))/5);
			var avatar = val.avatar;
			if (avatar === null) {
				avatar = 'http://1.bp.blogspot.com/--W_nRn6KT7c/UZYb9qcs5yI/AAAAAAAAAN8/G20bdSrsba4/s1600/avatar-inconnu.jpg';
			}
			const embed = new Discord.RichEmbed()
			  .setAuthor("Profil de " + nom, "https://i62.servimg.com/u/f62/17/86/50/40/bannie12.jpg")
			  .setColor(0xFF9900)
			  .setDescription('Niveau : ' + val.lvl + '\nXP : ' + val.xp + '/' + lvlup + '\nMessages : ' + val.messages + '\nLibCoins : ' + val.money + '\nDernier message le ' + val.lastmsg)
			  .setThumbnail(avatar);
			
			salon.send({embed});
		}
	});
}


// Export
module.exports = {
	newMessage: newMessage,
	newCommand: newCommand,
	classement: classement,
	classementCommandes: classementCommandes,
	profil: profil
};
