import pg from "pg";

const { Client } = pg;

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: process.env.NODE_ENV !== "development",
  });

  try {
    await client.connect();
    const res = await client.query(queryObject);
    return res;
  } catch (error) {
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
