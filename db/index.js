const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'guayaba',
  password: 'contraseña',
  port: 5432 ,
})

module.exports = {
    query: (text, params) => pool.query(text, params),
}