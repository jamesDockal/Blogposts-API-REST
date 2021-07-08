import request from "supertest";

const server = request("http://localhost:3000");

class MockUser {
  username: string;
  password: string;
  constructor() {
    this.username = "any_username";
    this.password = "any_password";
  }
}

describe("users", () => {
  it("should validate if the password was NOT provided", async () => {
    const user = { username: "testeusername" };

    const response = await server.post("/user").send(user);

    expect(response.status).toBe(400);
  });
  it("should validate if the username was NOT provided", async () => {
    const user = { password: "testepassword" };

    const response = await server.post("/user").send(user);

    expect(response.status).toBe(400);
  });
  it("should NOT created an user if the username is alredy in use", async () => {
    // this is the default user
    // that was created in the migration
    const user = {
      username: "admin",
      password: "anypassword",
    };

    const response = await server.post("/user").send(user);

    expect(response.status).toBe(400);
  });
});
