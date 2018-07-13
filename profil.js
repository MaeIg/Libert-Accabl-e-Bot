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
var newMessage = function (user) {
	client.query('SELECT id FROM members WHERE id=$1', [user.id], (err, res) => {
		if (err) {
			console.log(err.stack);
		} else {
			if (res.rowCount === 0) {
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
				console.log(user.username + ' est dans la bdd');
				client.query('SELECT messages, xp, lvl FROM members WHERE id=$1', [user.id], (err, res) => {
					if (err) {
						console.log(err.stack);
						return 0;
					} else {
						var nbrMsg = res.rows[0].messages + 1;
						console.log(res);
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
