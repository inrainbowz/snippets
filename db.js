const Pool = require('pg').Pool

const pool = new Pool ({
    user: "postgres",
    password: "ab0221211A$$",
    host: "localhost",
    port: "5432",
    database: "users"
})

module.exports = pool