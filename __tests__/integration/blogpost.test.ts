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
  constructor() {
    this.username = "admin";
    this.password = "admin";
  }
}

// some mock post just to tests
class MockPost {
  title: string;
  content: string;
  constructor() {
    this.title = "A title of a post that doest exist";
    this.content = "some content";
  }
}

/* 
  tests of blogposts
  find single 
  create a post 
  update a post
  delete a post
*/
describe("blogpost", () => {
  /*
    to find a single
    it must be provie an id in the url
  */
  describe("find single post", () => {
    it("should return 400 a post if not find the post with the id", async () => {
      const response = await server.get("/blogpost/no_post_with_this_id");
      expect(response.status).toBe(404);
    });
  });

  describe("create post", () => {
    /*
      to create a post, the user must be logged
      to see if the user is logged, there must be a header 'authorization' with value
      "Bearer ${token}"
      and the post must have title and content
    */
    it("should NOT created a post if no token on header was provided", async () => {
      // send a request to an route that the use must be logged, but with no authroization header
      const response = await server.post("/blogpost/create");

      expect(response.status).toBe(401);
    });
    it("should NOT created a postr if the token does not have the word 'Bearer'", async () => {
      // using any user
      const user = new MockUser();

      // the header is invalid, 'cause it must be "Bearer ...token"
      const response = await server
        .post("/blogpost/create")
        .send(user)
        .set({ authorization: "teste" });

      expect(response.status).toBe(400);
    });
    it("should NOT created a post if the token does not have the word 'Bearer'", async () => {
      // using any user
      const user = new MockUser();

      // the header is invalid, 'cause it must be "Bearer ...token"
      const response = await server
        .post("/blogpost/create")
        .send(user)
        .set({ authorization: "Bearer ...invalid_token" });

      expect(response.status).toBe(400);
    });

    it("should NOT create a post if the user is not logged", async () => {
      // to see if the user is logged, there must be the jwt on the header

      //
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
    it("should NOT create a post if the title is alredy in use", async () => {
      const adminUser = new AdminUser();
      const loggedUser = await server.post("/user/login").send(adminUser);
      // and getting his token to log him
      const { token } = loggedUser.body;

      // create a mock post
      const blogpost = {
        title: "React, getting started!",
        content: "any_content",
      };

      // send the request to create the post
      // passing the post and with the user logged
      const response = await server
        .post("/blogpost/create")
        .set({
          authorization: `Bearer ${token}`,
        })
        .send(blogpost);

      expect(response.status).toBe(409);
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
      const registerResponse = await server
        .post("/user/register")
        .send(mockUser);

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

      expect(response.status).toBe(401);
    });

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
        title: "post that doest exists",
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

      // after create this post, when need to delete it
      const postId = response.body.post.id;

      await server
        .delete(`/blogpost/${postId}`)
        .set({ authorization: `Bearer ${token}` });

      expect(response.status).toBe(200);
    });
  });

  describe("deleting posts", () => {
    it("should NOT delete a post if the user is not logged", async () => {
      /* 
        user not logged
        to be logged there must be a header authorization if "Bearer" word and the token
      */
      const response = await server.delete("/blogpost/post-id");
      expect(response.status).toBe(401);
    });

    it("should NOT delete a post if it was not passed a valid id", async () => {
      // using an user that alredy exist on database
      const user = new AdminUser();

      // login the user
      // get the token and pass to header
      const loginResponse = await server.post("/user/login").send(user);
      const { token } = loginResponse.body;

      // trying to delete a post with an id that doest not exist
      const response = await server.delete("/blogpost/not-a-valid-id").set({
        authorization: `Bearer ${token}`,
      });

      expect(response.status).toBe(404);
    });
  });

  describe("update post", () => {
    /*
      to update a post the user must be logged
      pass the post id in the url
      and provide title or content
    */
    it("should NOT update a post if the user is not logged", async () => {
      /* 
        user not logged
        to be logged there must be a header authorization if "Bearer" word and the token
      */

      const response = await server.put("/blogpost/post-id");

      expect(response.status).toBe(401);
    });
    it("should NOT update a post if it has no valid id", async () => {
      // using an user that alredy exist on database
      const user = new AdminUser();

      // login the user
      // get the token and pass to header
      const loginResponse = await server.post("/user/login").send(user);
      const { token } = loginResponse.body;

      // making request with the user logged
      const response = await server.put("/blogpost/some_id").set({
        authorization: `Bearer ${token}`,
      });

      // console.log("response,", response.body);
      expect(response.status).toBe(400);
    });
    it("should NOT update a post if it has neither title nor content on body", async () => {
      // using an user that alredy exist on database
      const user = new AdminUser();

      // login the user
      // get the token and pass to header
      const loginResponse = await server.post("/user/login").send(user);
      const { token } = loginResponse.body;

      const postToUpdate = {};

      // making request with the user logged
      // but passing no information to update the post
      const response = await server
        .put("/blogpost/some_id")
        .set({
          authorization: `Bearer ${token}`,
        })
        .send(postToUpdate);

      expect(response.status).toBe(400);
    });
    it("should NOT update a post if not find a post", async () => {
      // using an user that alredy exist on database
      const user = new AdminUser();

      // login the user
      // get the token and pass to header
      const loginResponse = await server.post("/user/login").send(user);
      const { token } = loginResponse.body;

      const postToUpdate = {
        title: "some_title",
        content: "some_content",
      };

      // making request with the user logged
      // passing information to update the post
      // but with an invalid id
      const response = await server
        .put("/blogpost/:not-a-valid-id")
        .set({
          authorization: `Bearer ${token}`,
        })
        .send(postToUpdate);

      expect(response.status).toBe(404);
    });
  });
});
