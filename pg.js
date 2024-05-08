const { Client } =require('pg');

const client = new Client({
  user: 'postgres',
  host: 'aws_endpoint',
  database: 'database',
  password: 'password',
  port: 5432, // Default PostgreSQL port
});


// async function connectToDatabase() {
//   try {
//     await client.connect();
//     console.log('Connected to PostgreSQL');
//   } catch (err) {
//     console.error('Connection error', err);
//   }
// }

client.connect()
  // .then(() => console.log('Connected to PostgreSQL'))
  // .catch(err => console.error('Connection error', err));


// async function createTable() {
//   try {
//     const createTableQuery = `
//       CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         username VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL UNIQUE
//       )
//     `;
//     await client.query(createTableQuery);
//     console.log('Table created successfully');
//   } catch (err) {
//     console.error('Error creating table', err);
//   }
// }
// async function insert(name,email) {
//   try {
//     const query = `
//       insert into table1(name,email) values($1,$2)`;
//       const values=[name,email]
//     await client.query(query,values);
//     console.log('Table created successfully');
//   } catch (err) {
//     console.error('Error creating table', err);
//   }
// }

module.exports= {client};
