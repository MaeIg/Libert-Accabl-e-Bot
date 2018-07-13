// Init
const pg = require('pg');
const connection = process.env.DATABASE_URL;

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

client.query('SELECT * FROM members', (err, res) => {
	if (err) {
		console.log(err.stack);
	} else {
		console.log(res);
	}
});

// Fonctions
function inBase (client, id) {
	client.query('SELECT id FROM members WHERE id=$1', [id], (err, res) => {
		if (err) {
			console.log(err.stack);
			console.log('Je renvoie false');
			return false;
		} else {
			console.log(res);
			console.log('Je renvoie true');
			return true;
		}
	});
}

var newMessage = function (user) {
	var bool = inBase(client, user.id);
	console.log('Valeur de la variable : ' + bool);
	if (bool === 1) {
		console.log(user.username + ' est déjà dans la bdd');
		client.query('SELECT messages FROM members WHERE id=$1', [user.id], (err, res) => {
			if (err) {
				console.log(err.stack);
				return 0;
			} else {
				console.log(res);
			}
		});
	} else {
		console.log(user.username + ' n\'est pas dans la bdd');
		client.query('INSERT INTO members(id, name, lvl, xp, messages, money) VALUES($1, $2, 1, 0, 1, 1000)', [user.id, user.username], (err) => {
			if (err) {
				console.log(err.stack);
				return 0;
			} else {
				console.log(user.username + ' a été ajouté à la table members');
			}
		});
	}
};


// Export
module.exports = {
  newMessage: newMessage
};
