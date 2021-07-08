import request from "supertest";

const server = request("http://localhost:3000");

class MockUser {
  username: string;
  password: string;
  constructor() {
    this.username = "teste";
    this.password = "testepassword";
  }
}

describe("users", () => {
  it("should validate if the username was passed", async () => {
    const user = new MockUser();

    const response = await server.post("/user").send(user);

    expect(response.status).toBe(200);
  });
  it("should validate if the username was NOT passed", async () => {
    const user = { password: "testepassword" };

    const response = await server.post("/user").send(user);

    expect(response.status).toBe(400);
  });
});
