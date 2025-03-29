const request = require("supertest");
const app = require("../app");

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
    expect(response.body.envVar).toBe(process.env.ENV_VAR);
  });

  it("should return 404 for undefined routes", async () => {
    const response = await request(app).get("/undefined-route");

    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe("error");
  });
});
