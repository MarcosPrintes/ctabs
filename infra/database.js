import pg from "pg";

const { Client } = pg;

async function query(queryObject) {
  // const client = new Client(
  //   `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
  // );

  console.log("======>", process.env.DB_URL);
  // const client = new Client(process.env.DB_URL);

  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });

  try {
    await client.connect();
    const res = await client.query(queryObject);
    return res;
  } catch (error) {
    console.log("ERROR: DB CONNECTION:", error);
  } finally {
    await client.end();
    console.log("QUERY: FINALLY DISCONNECTED:", queryObject);
  }
}

export default {
  query: query,
};
