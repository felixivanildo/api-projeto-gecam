const Pool = require ('pg').Pool;


const pool = new Pool (
    {
        user: 'postgres',
        host: 'localhost',
        database: 'Laudos',
        password: 'senha',
        port: 5432
    }
)

module.exports = pool;