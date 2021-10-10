const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const client = new Client({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

module.exports = { client }