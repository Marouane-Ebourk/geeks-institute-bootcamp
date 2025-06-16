const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'password',
        database: 'quiz_db',
        port: 5432
    }
});

module.exports = db;