// library to make the request to the API
import request from "supertest";

// URL of the api
const server = request("http://localhost:3000");

class MockUser {
  username: string;
  password: string;
  constructor() {
    this.username = "any_username";
    this.password = "any_username";
  }
}

describe("Register", () => {
  it("should see if the password was NOT provided", async () => {
    const user = { username: "teste_username" };

    // it gonna make the request, but gonna return a error on the UserMiddleware passedCrendentials
    // because no password passed was provided
    const response = await server.post("/user/register").send(user);

    expect(response.status).toBe(400);
  });
  it("should see if the username was NOT provided", async () => {
    const user = { password: "teste_password" };

    // it gonna make the request, but gonna return a error, status 400, on the UserMiddleware passedCrendentials
    // because no email was provided
    const response = await server.post("/user/register").send(user);

    expect(response.status).toBe(400);
  });
  it("should NOT created an user if the username is alredy in use", async () => {
    // this is the default user
    // that was created in the migration
    const user = {
      username: "admin",
      password: "anypassword",
    };

    // it gonna return a error, status 400, becuase the user alredy exist on the database
    const response = await server.post("/user/register").send(user);

    expect(response.status).toBe(400);
  });
});

describe("login", () => {
  it("should see if the password was NOT provided", async () => {
    const user = { username: "teste_username" };

    // it gonna make the request, but gonna return a error on the UserMiddleware passedCrendentials
    // because no password passed was provided
    const response = await server.post("/user/login").send(user);

    expect(response.status).toBe(400);
  });
  it("should see if the username was NOT provided", async () => {
    const user = { password: "teste_password" };

    // it gonna make the request, but gonna return a error, status 400, on the UserMiddleware passedCrendentials
    // because no email was provided
    const response = await server.post("/user/login").send(user);

    expect(response.status).toBe(400);
  });
  it("should see if the user NOT exists", async () => {
    const user = {
      username: "username_not_cadastred",
      password: "any_password",
    };

    const response = await server.post("/user/login").send(user);

    expect(response.status).toBe(400);
  });
  it("should see if the user alredy exists", async () => {
    const user = {
      username: "admin",
      password: "admin",
    };

    const response = await server.post("/user/login").send(user);

    expect(response.status).toBe(200);
  });
});
