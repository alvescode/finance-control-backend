test("GET para /status deve retornar 200", async () => {
  const response = await fetch("http://localhost:3001/status");
  expect(response.status).toBe(200);
});
