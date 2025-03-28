import pg from "pg";

const { Client } = pg;

async function query(queryObject) {
  try {
    const client = new Client({
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    });

    await client.connect();

    const res = await client.query(queryObject);

    await client.end();
    return res;
  } catch (error) {
    console.log("ERROR: DB CONNECTION:", error);
  }
}

export default {
  query: query,
};
