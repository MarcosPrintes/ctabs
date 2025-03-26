import database from "infra/database";

async function status(request, response) {
  const res = await database.query("SELECT 1 + 1;");

  response.status(200).send({
    status: "OKs",
  });
}

export default status;
