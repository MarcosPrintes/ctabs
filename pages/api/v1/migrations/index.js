import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const dbClient = await database.getDbClient();

  const DEFAULT_MIGRATION_CONFIG = {
    dbClient,
    migrationsTable: "pgmigrations",
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
  };

  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner({
      ...DEFAULT_MIGRATION_CONFIG,
    });
    await dbClient.end();
    return response.status(200).send(pendingMigrations);
  }

  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...DEFAULT_MIGRATION_CONFIG,
      dryRun: false,
    });

    await dbClient.end();

    return response.status(200).send(migratedMigrations);
  }

  return response.status(405).end();
}
