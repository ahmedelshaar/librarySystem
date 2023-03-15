const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

/* Connecting to the database before each test */
beforeEach(async () => {
  await mongoose.connect(process.env.MongoUrl);
});

describe("Test the admin route", () => {
  test("should response status code 200", async () => {
    const response = await request(app).get("/admin");
    expect(response.statusCode).toBe(200);
  });

  //   test("should response status code 422", async () => {
  //     const response = await request(app)
  //     .post("/admin")
  //     .send({
  //       email: 'petergmail.com',
  //       password:'HdjdHdK1'
  //      });
  //     expect(response.statusCode).toBe(422);
  //   });
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});
