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
client.query('CREATE TABLE members(id SERIAL PRIMARY KEY, name text, lvl int, xp int, messages int, money int)');
client.query('SELECT * from members', (err, res) => {
	if (err) {
		console.log(err.stack);
	} else {
		console.log(res)
	}
	client.end()
});