// library to make the request to the API
import request from "supertest";

import dotenv from "dotenv";
dotenv.config();

// URL of the api
const server = request(`http://localhost:${process.env.SERVER_PORT || 3000}`);

// mock user just to tests
class MockUser {
  username: string;
  password: string;
  constructor() {
    this.username = "any_username";
    this.password = "any_username";
  }
}

// an user that is created if the app
class AdminUser {
  username: string;
  password: string;
  token: string;
  constructor() {
    this.username = "admin";
    this.password = "admin";
  }
}
/*
  tests of the users
  Register
  login
  Loged routes
*/
describe("user", () => {
  describe("Register", () => {
    /*
      to the user registred,
      he must provide username and password
      and the username cant be in use
    */

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
      const mocKUser = {
        username: "admin",
        password: "anypassword",
      };
      // it gonna return a error, status 400, becuase the user alredy exist on the database
      const response = await server.post("/user/register").send(mocKUser);

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
      // use the user that was created if the databse
      const user = new AdminUser();

      const response = await server.post("/user/login").send(user);

      expect(response.status).toBe(200);
    });
    it("should to validate a wrong password", async () => {
      // use the username of the user that was created if the database
      // but providing a wrong password
      const user = {
        username: "admin",
        password: "wrong_password",
      };

      const response = await server.post("/user/login").send(user);

      expect(response.status).toBe(401);
    });
  });

  describe("Loged routes", () => {
    /*
      to the user get logged, 
      he must pass his username and pasword
    */
    it("should return a error if no token on header was provided", async () => {
      const user = new MockUser();

      // send a request to an route that the use must be logged, but with no
      const response = await server.post("/user/private-route-test").send(user);

      expect(response.status).toBe(401);
    });
    it("should return a error if the token does not have the word 'Bearer'", async () => {
      // using any user
      const user = new MockUser();

      // the header is invalid, it must be "Bearer ...token"
      const response = await server
        .post("/user/private-route-test")
        .send(user)
        .set({ authorization: "teste" });

      expect(response.status).toBe(400);
    });
    it("should return ok if pass a valid token", async () => {
      // using an user that alredy exist on database
      const user = new AdminUser();

      // login the user
      // get the token and pass to header
      const loginResponse = await server.post("/user/login").send(user);
      const { token } = loginResponse.body;

      // send a request passing a valid authorization header
      const response = await server
        .post("/user/private-route-test")
        .send(user)
        .set({ authorization: `Bearer ${token}` });

      expect(response.status).toBe(200);
    });
  });
});
