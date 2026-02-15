// import pkg from 'pg';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import dotenv from 'dotenv';

// dotenv.config();

// const { Client } = pkg;
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// async function initializeDatabase() {
//   const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
//   });

//   try {
//     console.log('🔌 Connecting to database...');
//     await client.connect();
//     console.log('✅ Connected to database');

//     console.log('📄 Reading schema file...');
//     const schemaPath = path.join(__dirname, '..', 'schema.sql');
//     // const schema = fs.readFileSync(schemaPath, 'utf8');
//     const schema = fs.readFileSync('./schema.sql', 'utf-8');


//     console.log('🔨 Executing schema...');
//     await client.query(schema);
//     console.log('✅ Database schema initialized successfully');

//     console.log('✨ Database is ready!');
//   } catch (error) {
//     console.error('❌ Error initializing database:', error);
//     process.exit(1);
//   } finally {
//     await client.end();
//   }
// }

// initializeDatabase();
import pkg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initializeDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected to database');

    console.log('📄 Reading schema file...');
    const schemaPath = path.join(__dirname, '..', 'schema.sql');
const schema = fs.readFileSync('./schema.sql', 'utf-8');


    console.log('🔨 Executing schema...');
    await client.query(schema);
    console.log('✅ Database schema initialized successfully');

    console.log('✨ Database is ready!');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

initializeDatabase();