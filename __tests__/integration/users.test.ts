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
  it("should not created if has with lack of information", async () => {
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
  it("should not created the post if it was given a invalid created_by", async () => {
    const adminUser = new AdminUser();

    const blogpost = {
      title: "teste",
      content: "teste",
      slug: "teste",
      created_by: "invalid created_by",
    };
    const loginResponse = await server.post("/user/login").send(adminUser);
    const { token } = loginResponse.body;

    const response = await server
      .post("/blogpost/create")
      .set({
        authorization: `Bearer ${token}`,
      })
      .send(blogpost);

    expect(response.status).toBe(406);
  });
  it("should not created the post if the user that is loged is not the same that is creating the post", async () => {
    // to make sure that user that is logged is the same that is trying to create the post
    // we create a mock user and create a post by his id
    // after that we logged with other user
    // (in this case was the admin one, the default user)

    // creating a new user and get his id
    const mockuser = new MockUser();
    const createdMockUser = await server.post("/user/register").send(mockuser);
    const mockuser_id = createdMockUser.body.user.id;

    // logging the admin user and getting his token
    const adminUser = new AdminUser();
    const createdAdminUser = await server.post("/user/login").send(adminUser);
    const admin_token = createdAdminUser.body.token;

    // creating the blogpost if the created user (mockUser)
    const blogpost = {
      title: "teste",
      content: "teste",
      slug: "teste",
      created_by: mockuser_id,
    };

    // passing the admin token to get him logged
    const response = await server
      .post("/blogpost/create")
      .set({
        authorization: `Bearer ${admin_token}`,
      })
      .send(blogpost);

    //delete the mock user
    await server.delete(`/user/${mockuser_id}`);

    // it gonna return authorizated because the user that gonna create a post
    // is different from the user that is logged
    expect(response.status).toBe(401);
  });
});
