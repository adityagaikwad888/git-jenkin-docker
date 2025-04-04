const request = require("supertest");
const app = require("../app");
const dotenv = require("dotenv");
dotenv.config();

describe("API Endpoints", () => {
  it("should return welcome message on root route", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "Welcome to the |--> APIs on AWS via CI/CD For Cloud Computing"
    );
    expect(response.body.status).toBe("success");
  });

  it("should return health status", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status");
    expect(response.body.status).toBe("UP");
  });

  it("should return environment variable", async () => {
    const response = await request(app).get("/env-var");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("env var value here --> 1 <--");
  });

  it("should return 404 for undefined routes", async () => {
    const response = await request(app).get("/undefined-route");

    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe("error");
  });
});
