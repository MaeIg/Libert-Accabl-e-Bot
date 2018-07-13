const pg = require('pg');
const connection = process.env.DATABASE_URL;
const client = new pg.Client(connection);


function inBase (id) {
	client.query('SELECT id FROM members WHERE id='+id, (err, res) => {
		if (err) {
			return false;
		} else {
			return true;
		}
	});
}

function newMessage (user) {
	client.connect((err) => {
		if (err) {
			console.log('connection error : ' + err.stack);
			client.end()
			return 0;
		} else {
			console.log('connected');
		}
	});
	
	if (inBase(user.id)) {
		client.query('SELECT messages FROM members WHERE id='+user.id, (err, res) => {
			if (err) {
				console.log(err.stack);
				client.end()
				return 0;
			} else {
				console.log(res);
			}
		});
	} else {
		client.query('INSERT INTO members VALUES (' + user.id + ', \'' + user.username + '\', 1, 0, 1, 1000)', (err) => {
			if (err) {
				console.log(err.stack);
				client.end()
				return 0;
			} else {
				console.log(name + ' a été ajouté à la table members');
			}
		});
	}
	
	client.end()
}
