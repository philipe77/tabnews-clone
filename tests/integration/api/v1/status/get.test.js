test("Get to /api/v1/status should return 200", async () => {
  const resp = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await resp.json();
  const date = new Date(responseBody.updated_at).toISOString();
  
  expect(resp.status).toBe(200);
  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.updated_at).toEqual(date);
  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});

