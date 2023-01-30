const { Pool } = require("pg");

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'backendtest',
    password: 'postgres',
    port: 5432,
    idleTimeoutMillis: 500
  })

module.exports = pool