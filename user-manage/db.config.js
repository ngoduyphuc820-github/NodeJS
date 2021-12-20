const pg = require('pg');
//connect pg
const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'nodejsDemo',
  password: '111111',
  port: 5432,
};

async function connectClient() {
  const client = new pg.Client(config);
  await client.connect();
  return client;
}
module.exports = {connectClient};