const Pool = require ('pg').Pool;


const pool = new Pool (
    {
        user: 'postgres',
        host: 'localhost',
        database: 'Ricardo2',
        password: 'senha',
        port: 5432
    }
)

module.exports = pool;