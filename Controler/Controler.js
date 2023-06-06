const pool = require ("../DB/DBconnection")

const getUser = (req, res) => {
    pool.query('select * from users', (err, results)=>{
        if(err){
            throw err
        }

        res.status(200).json(results.rows)
    })
}

const localize = (req, res) =>{
   pool.query(`select * from users where id = ${req.body.id}`, (err, results)=>{
        if (err){
            throw err
        }

        if (results){
            res.status(200).json(rows)
        }
    })

   
    
}

module.exports = {getUser, localize}