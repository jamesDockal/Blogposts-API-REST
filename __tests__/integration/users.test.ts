// library to make the request to the API
import request from "supertest";

import dotenv from "dotenv";
dotenv.config();

// URL of the api
const server = request(`http://localhost:${process.env.SERVER_PORT || 3000}`);

class MockUser {
  username: string;
  password: string;
  constructor() {
    this.username = "any_username";
    this.password = "any_username";
  }
}

class AdminUser {
  username: string;
  password: string;
  token: string;
  constructor() {
    this.username = "admin";
    this.password = "admin";
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
  it("should to validate a wrong password", async () => {
    const user = {
      username: "admin",
      password: "wrong_password",
    };

    const response = await server.post("/user/login").send(user);

    expect(response.status).toBe(401);
  });
});

describe("Loged routes", () => {
  it("should return a error if no token on header was provided", async () => {
    const user = new MockUser();

    const response = await server.post("/user/private-route-test").send(user);

    expect(response.status).toBe(401);
  });

  it("should return a error if the token does not have the word 'Bearer'", async () => {
    const user = new MockUser();

    const response = await server
      .post("/user/private-route-test")
      .send(user)
      .set({ authorization: "teste" });

    expect(response.status).toBe(400);
  });
  it("should return ok with passing a valid token", async () => {
    const user = new AdminUser();

    const loginResponse = await server.post("/user/login").send(user);
    const { token } = loginResponse.body;

    const response = await server
      .post("/user/private-route-test")
      .send(user)
      .set({ authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
  });
});

describe("blogpost", () => {
  it("should not create if the user is not logged", async () => {
    // to see if the user is logged, there must be the jwt on the header
    const blogpost = {};

    const response = await server
      .post("/blogpost/create")
      .set({
        authorization: `Bearer invalid token`,
      })
      .send(blogpost);

    expect(response.status).toBe(400);
  });
  it("should not create if there are lack of information", async () => {
    const adminUser = new AdminUser();
    const blogpost = {};

    const loginResponse = await server.post("/user/login").send(adminUser);
    const { token } = loginResponse.body;

    const response = await server
      .post("/blogpost/create")
      .set({
        authorization: `Bearer ${token}`,
      })
      .send(blogpost);

    expect(response.status).toBe(400);
  });
  it("should create the post if the information were paseed and the user is logged", async () => {
    // to see if the user is logged, there must be the jwt on the header
    const adminUser = new AdminUser();

    const loggedUser = await server.post("/user/login").send(adminUser);
    const { token, id } = loggedUser.body;

    const blogpost = {
      title: "teste",
      content: "teste",
      slug: "teste",
      created_by: id,
    };

    const response = await server
      .post("/blogpost/create")
      .set({
        authorization: `Bearer ${token}`,
      })
      .send(blogpost);

    expect(response.status).toBe(200);
  });
});
