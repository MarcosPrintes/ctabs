test("Should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();

  expect(responseBody.updated_at).toBeDefined();

  const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();

  expect(responseBody).toEqual({
    status: "database is running",
    updated_at: parseUpdatedAt,
    database: {
      postgres_version: "16.8",
      max_connections: 100,
    },
  });
});
