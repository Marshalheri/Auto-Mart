import { Pool } from 'pg';

import { environment } from '../../myEnvironment';

const connectionString = { connectionString: process.env.DATABASE_URL };
const connection = connectionString || environment;

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
        "firstName" VARCHAR(50) NOT NULL,
        "lastName" VARCHAR(50) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT FALSE,
        address TEXT NOT NULL,
        "phoneNumber" VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        "createdOn" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS cars(
        id SERIAL PRIMARY KEY,
        owner INT NOT NULL,
        "createdOn" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        state CarAdState NOT NULL,
        status CarAdStatus DEFAULT 'available',
        price REAL NOT NULL,
        manufacturer VARCHAR(255) NOT NULL,
        model VARCHAR(255) NOT NULL,
        "bodyType" CarAdBody NOT NULL,
        images JSON [] NOT NULL,
        FOREIGN KEY (owner) REFERENCES users (id)
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders(
        id SERIAL PRIMARY KEY,
        buyer INT NOT NULL,
        "carId" INT NOT NULL,
        amount REAL NOT NULL,
        status CarOrderStatus NOT NULL DEFAULT 'pending',
        "priceOffered" REAL NOT NULL,
        "oldPriceOffered" REAL,
        "createdOn" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (buyer) REFERENCES users (id),
        FOREIGN KEY ("carId") REFERENCES cars (id)
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS flags(
        id SERIAL PRIMARY KEY,
        creator INT NOT NULL,
        "carId" INT NOT NULL,
        reason CarFLagReason NOT NULL,
        description TEXT NOT NULL,
        "createdOn" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (creator) REFERENCES users(id),
        FOREIGN KEY ("carId") REFERENCES cars(id)
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
