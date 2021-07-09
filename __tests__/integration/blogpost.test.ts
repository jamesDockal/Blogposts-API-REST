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

describe("blogpost", () => {
  /*
    to create a post, the user must be logged
    to see if the user is logged, there must be a header 'authorization' with value
    "Bearer ${token}"
    and the post must have title and content
    To create the post, must be provided a title and the content
  */
  it("should return a error if no token on header was provided", async () => {
    const user = new MockUser();

    // send a request to an route that the use must be logged, but with no
    const response = await server.post("/blogpost/create").send(user);

    expect(response.status).toBe(401);
  });
  it("should return a error if the token does not have the word 'Bearer'", async () => {
    // using any user
    const user = new MockUser();

    // the header is invalid, it must be "Bearer ...token"
    const response = await server
      .post("/blogpost/create")
      .send(user)
      .set({ authorization: "teste" });

    expect(response.status).toBe(400);
  });

  it("should not create a post if the user is not logged", async () => {
    // to see if the user is logged, there must be the jwt on the header
    const blogpost = {};

    // send a request but not providing a acceptable token
    const response = await server
      .post("/blogpost/create")
      .set({
        authorization: `Bearer invalid token`,
      })
      .send(blogpost);

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

  it("should NOT create if the user was deleted", async () => {
    /*
      test to make sure that the user doest not exist
      for that create a user, get its token and delete the user
      and try to create a post with the user's token
    */

    // create the
    const mockUser = new MockUser();
    const blogpost = {};

    // create the user to the test
    const registerResponse = await server.post("/user/register").send(mockUser);

    // get the id to delete the user
    // and the token to log him
    const userId = registerResponse.body.user.id;
    const { token } = registerResponse.body;

    // deleting the user that was created
    await server.delete(`/user/${userId}`);

    // trying to create the post
    const response = await server
      .post("/blogpost/create")
      .set({
        authorization: `Bearer ${token}`,
      })
      .send(blogpost);

    expect(401).toBe(401);
  });
  it("should NOT create if there are lack of information", async () => {
    // using an user that alredy exist on database
    const adminUser = new AdminUser();
    // creating a mock post with no information in it
    const blogpost = {};

    // login the user
    // get the token and pass to header
    const loginResponse = await server.post("/user/login").send(adminUser);
    const { token } = loginResponse.body;

    // it will return an error
    // as the blogpost doest have any information in it
    const response = await server
      .post("/blogpost/create")
      .set({
        authorization: `Bearer ${token}`,
      })
      .send(blogpost);

    expect(response.status).toBe(400);
  });

  it("should NOT create a post if the title is alredy in use", async () => {});
  it("should create the post if the information were paseed and the user is logged", async () => {
    // to see if the user is logged,
    // there must be the jwt on the header

    // login an user that alredy exist on database
    const adminUser = new AdminUser();
    const loggedUser = await server.post("/user/login").send(adminUser);
    // and getting his token to log him
    const { token } = loggedUser.body;

    // create a mock post
    const blogpost = {
      title: "teste",
      content: "teste",
    };

    // send the request to create the post
    // passing the post and with the user logged
    const response = await server
      .post("/blogpost/create")
      .set({
        authorization: `Bearer ${token}`,
      })
      .send(blogpost);

    expect(response.status).toBe(200);
  });
});
