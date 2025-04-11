import database from "infra/database";

/**
 * versão do postgres
 *
 * conexões máximas
 *
 * conexões usadas
 */
async function status(request, response) {
  const serverVersion = await database.query("SHOW server_version;");
  const postgresVersion = serverVersion.rows[0].server_version;

  const maxConnectionsShow = await database.query("SHOW max_connections;");
  const maxConnections = parseInt(maxConnectionsShow.rows[0].max_connections);

  const updatedAt = new Date().toISOString();

  const dbName = process.env.POSTGRES_DB;

  const currentConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname=$1;",
    values: [dbName],
  });

  response.status(200).send({
    status: "database is running",
    updated_at: updatedAt,
    database: {
      postgres_version: postgresVersion,
      max_connections: maxConnections,
    },
  });
}

export default status;
