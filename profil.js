const pg = require('pg');
const connection = process.env.DATABASE_URL;

const client = new pg.Client(connection);
client.connect((err) => {
	if (err) {
		console.log('connection error : ' + err.stack)
	} else {
		console.log('connected')
	}
});
client.query('SELECT id FROM members WHERE name LIKE "Maelg"', (err, res) => {
	if (err) {
		console.log(error);
	} else {
		console.log(res)
	}
	client.end()
});
