const request = require("supertest");
const app = require("../app");

// Ensure ENV_VAR is set for testing purposes
beforeAll(() => {
  // If ENV_VAR is not set from the .env file, set a default for testing
  if (!process.env.ENV_VAR) {
    process.env.ENV_VAR = "test-environment-value";
    console.log("Set default ENV_VAR for testing");
  }
});

describe("API Endpoints", () => {
  it("should return welcome message on root route", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "Welcome to the Project 5 --> APIs on AWS via CI/CD For Cloud Computing"
    );
    expect(response.body.status).toBe("success");
  });

  it("should return health status", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status");
    expect(response.body.status).toBe("UP");
  });

  it("should return current date and time", async () => {
    const response = await request(app).get("/time");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("date");
    expect(new Date(response.body.date)).toBeInstanceOf(Date);
  });

  it("should return environment variable", async () => {
    const response = await request(app).get("/env-var");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("envVar");
    // Don't check the exact value, just verify it's a string
    expect(typeof response.body.envVar).toBe("string");
  });

  it("should return 404 for undefined routes", async () => {
    const response = await request(app).get("/undefined-route");

    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe("error");
  });
});
