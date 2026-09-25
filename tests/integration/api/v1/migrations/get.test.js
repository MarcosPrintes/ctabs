import database from "infra/database";
// import database from "../../../../../infra/database";

async function clearDb() {
  await database.query("drop schema public cascade; create schema public;");
}

beforeAll(clearDb);
test("GET migration", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");

  expect(response.status).toStrictEqual(200);

  const body = await response.json();

  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
});
