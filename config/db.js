import pg from 'pg';
const { Pool } = pg;

import 'dotenv/config'

const { DB_USER, DB_HOST, DB_DATABASE, DB_PASS } = process.env

const config = {
    host: DB_HOST,
    user: DB_USER,
    database: DB_DATABASE,
    password: DB_PASS,
    allowExitOnIdle: true
}

const pool = new Pool(config);


export default pool
