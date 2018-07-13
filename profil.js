// Init
const pg = require('pg');
const connection = process.env.DATABASE_URL;

// Fonctions
function inBase (client, id) {
	client.query('SELECT id FROM members WHERE id='+id, (err, res) => {
		if (err) {
			return false;
		} else {
			return true;
		}
	});
}

var newMessage = function (user) {
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
	
	client.query('SELECT * FROM membres', (err, res) => {
		if (err) {
			console.log(err.stack);
			client.end();
			return 0;
		} else {
			console.log(res);
		}
	});
	
	if (inBase(client, user.id)) {
		console.log(user.username + ' est déjà dans la bdd');
		client.query('SELECT messages FROM members WHERE id='+user.id, (err, res) => {
			if (err) {
				console.log(err.stack);
				client.end();
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
				client.end();
				return 0;
			} else {
				console.log(name + ' a été ajouté à la table members');
			}
		});
	}
	
	client.end();
};


// Export
module.exports = {
  newMessage: newMessage
};
