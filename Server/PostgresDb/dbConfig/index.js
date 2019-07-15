import { Pool } from 'pg';

import { environment } from '../../myEnvironment';

const connectionString = { connectionString: process.env.DATABASE_URL };
const connection = environment || connectionString;

const pool = new Pool(connection);

(async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'caradstate') THEN
            CREATE TYPE CarAdState AS ENUM ('new', 'used');
          END IF;
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'caradstatus') THEN
            CREATE TYPE CarAdStatus AS ENUM ('sold', 'available');
          END IF;
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'caradbody') THEN
            CREATE TYPE CarAdBody AS ENUM ('car', 'truck', 'trailer', 'van');
          END IF;
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'carorderstatus') THEN
            CREATE TYPE CarOrderStatus AS ENUM ('pending', 'accepted', 'rejected');
          END IF;
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'carflagreason') THEN
            CREATE TYPE CarFLagReason AS ENUM ('pricing', 'weird demands');
          END IF;
        END
        $$;
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(50) NOT NULL UNIQUE,
        "first_name" VARCHAR(50) NOT NULL,
        "last_name" VARCHAR(50) NOT NULL,
        "is_admin" BOOLEAN DEFAULT FALSE,
        address TEXT NOT NULL,
        "phone_number" VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        "created_on" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS cars(
        id SERIAL PRIMARY KEY,
        owner INT NOT NULL,
        "created_on" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        state CarAdState NOT NULL,
        status CarAdStatus DEFAULT 'available',
        price REAL NOT NULL,
        manufacturer VARCHAR(255) NOT NULL,
        model VARCHAR(255) NOT NULL,
        "body_type" CarAdBody NOT NULL,
        images JSON [] NOT NULL,
        FOREIGN KEY (owner) REFERENCES users (id) ON DELETE CASCADE
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders(
        id SERIAL PRIMARY KEY,
        buyer INT NOT NULL,
        "car_id" INT NOT NULL,
        amount REAL NOT NULL,
        status CarOrderStatus NOT NULL DEFAULT 'pending',
        "price_offered" REAL NOT NULL,
        "oldPrice_offered" REAL,
        "created_on" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (buyer) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY ("car_id") REFERENCES cars (id) ON DELETE CASCADE
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS flags(
        id SERIAL PRIMARY KEY,
        creator INT NOT NULL,
        "car_id" INT NOT NULL,
        reason CarFLagReason NOT NULL,
        description TEXT NOT NULL,
        "created_on" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (creator) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY ("car_id") REFERENCES cars(id) ON DELETE CASCADE
      );
    `);
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
})().catch(err => console.log(err.stack));

export default {
  query: (text, params, callback) => pool.query(text, params, callback),
};
