"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// library to make the request to the API
var supertest_1 = __importDefault(require("supertest"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// URL of the api
var server = supertest_1.default("http://localhost:" + (process.env.SERVER_PORT || 3000));
// mock user just to tests
var MockUser = /** @class */ (function () {
    function MockUser() {
        this.username = "any_username";
        this.password = "any_username";
    }
    return MockUser;
}());
// an user that is created if the app
var AdminUser = /** @class */ (function () {
    function AdminUser() {
        this.username = "admin";
        this.password = "admin";
    }
    return AdminUser;
}());
// some mock post just to tests
var MockPost = /** @class */ (function () {
    function MockPost() {
        this.title = "A title of a post that doest exist";
        this.content = "some content";
    }
    return MockPost;
}());
/*
  tests of blogposts
  find single
  create a post
  update a post
  delete a post
*/
describe("blogpost", function () {
    /*
      to find a single
      it must be provie an id in the url
    */
    describe("find single post", function () {
        it("should return 400 a post if not find the post with the id", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, server.get("/blogpost/no_post_with_this_id")];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(404);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("create post", function () {
        /*
          to create a post, the user must be logged
          to see if the user is logged, there must be a header 'authorization' with value
          "Bearer ${token}"
          and the post must have title and content
        */
        it("should NOT created a post if no token on header was provided", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, server.post("/blogpost/create")];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should NOT created a postr if the token does not have the word 'Bearer'", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new MockUser();
                        return [4 /*yield*/, server
                                .post("/blogpost/create")
                                .send(user)
                                .set({ authorization: "teste" })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should NOT created a post if the token does not have the word 'Bearer'", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new MockUser();
                        return [4 /*yield*/, server
                                .post("/blogpost/create")
                                .send(user)
                                .set({ authorization: "Bearer ...invalid_token" })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should NOT create a post if the user is not logged", function () { return __awaiter(void 0, void 0, void 0, function () {
            var blogpost, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blogpost = {};
                        return [4 /*yield*/, server
                                .post("/blogpost/create")
                                .set({
                                authorization: "Bearer invalid token",
                            })
                                .send(blogpost)];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should NOT create if there are lack of information", function () { return __awaiter(void 0, void 0, void 0, function () {
            var adminUser, blogpost, loginResponse, token, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        adminUser = new AdminUser();
                        blogpost = {};
                        return [4 /*yield*/, server.post("/user/login").send(adminUser)];
                    case 1:
                        loginResponse = _a.sent();
                        token = loginResponse.body.token;
                        return [4 /*yield*/, server
                                .post("/blogpost/create")
                                .set({
                                authorization: "Bearer " + token,
                            })
                                .send(blogpost)];
                    case 2:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should NOT create a post if the title is alredy in use", function () { return __awaiter(void 0, void 0, void 0, function () {
            var adminUser, loggedUser, token, blogpost, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        adminUser = new AdminUser();
                        return [4 /*yield*/, server.post("/user/login").send(adminUser)];
                    case 1:
                        loggedUser = _a.sent();
                        token = loggedUser.body.token;
                        blogpost = {
                            title: "Node.js first steps",
                            content: "any_content",
                        };
                        return [4 /*yield*/, server
                                .post("/blogpost/create")
                                .set({
                                authorization: "Bearer " + token,
                            })
                                .send(blogpost)];
                    case 2:
                        response = _a.sent();
                        expect(response.status).toBe(409);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should NOT create if the user was deleted", function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockUser, blogpost, registerResponse, userId, token, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockUser = new MockUser();
                        blogpost = {};
                        return [4 /*yield*/, server
                                .post("/user/register")
                                .send(mockUser)];
                    case 1:
                        registerResponse = _a.sent();
                        userId = registerResponse.body.user.id;
                        token = registerResponse.body.token;
                        // deleting the user that was created
                        return [4 /*yield*/, server.delete("/user/" + userId)];
                    case 2:
                        // deleting the user that was created
                        _a.sent();
                        return [4 /*yield*/, server
                                .post("/blogpost/create")
                                .set({
                                authorization: "Bearer " + token,
                            })
                                .send(blogpost)];
                    case 3:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should create the post if the information were paseed and the user is logged", function () { return __awaiter(void 0, void 0, void 0, function () {
            var adminUser, loggedUser, token, blogpost, response, postId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        adminUser = new AdminUser();
                        return [4 /*yield*/, server.post("/user/login").send(adminUser)];
                    case 1:
                        loggedUser = _a.sent();
                        token = loggedUser.body.token;
                        blogpost = {
                            title: "post that doest exists",
                            content: "teste",
                        };
                        return [4 /*yield*/, server
                                .post("/blogpost/create")
                                .set({
                                authorization: "Bearer " + token,
                            })
                                .send(blogpost)];
                    case 2:
                        response = _a.sent();
                        postId = response.body.post.id;
                        return [4 /*yield*/, server
                                .delete("/blogpost/" + postId)
                                .set({ authorization: "Bearer " + token })];
                    case 3:
                        _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("deleting posts", function () {
        it("should NOT delete a post if the user is not logged", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, server.delete("/blogpost/post-id")];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should NOT delete a post if it was not passed a valid id", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, loginResponse, token, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new AdminUser();
                        return [4 /*yield*/, server.post("/user/login").send(user)];
                    case 1:
                        loginResponse = _a.sent();
                        token = loginResponse.body.token;
                        return [4 /*yield*/, server.delete("/blogpost/not-a-valid-id").set({
                                authorization: "Bearer " + token,
                            })];
                    case 2:
                        response = _a.sent();
                        expect(response.status).toBe(404);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("update post", function () {
        /*
          to update a post the user must be logged
          pass the post id in the url
          and provide title or content
        */
        it("should NOT update a post if the user is not logged", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, server.put("/blogpost/post-id")];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should NOT update a post if it has no valid id", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, loginResponse, token, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new AdminUser();
                        return [4 /*yield*/, server.post("/user/login").send(user)];
                    case 1:
                        loginResponse = _a.sent();
                        token = loginResponse.body.token;
                        return [4 /*yield*/, server.put("/blogpost/some_id").set({
                                authorization: "Bearer " + token,
                            })];
                    case 2:
                        response = _a.sent();
                        // console.log("response,", response.body);
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should NOT update a post if it has neither title nor content on body", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, loginResponse, token, postToUpdate, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new AdminUser();
                        return [4 /*yield*/, server.post("/user/login").send(user)];
                    case 1:
                        loginResponse = _a.sent();
                        token = loginResponse.body.token;
                        postToUpdate = {};
                        return [4 /*yield*/, server
                                .put("/blogpost/some_id")
                                .set({
                                authorization: "Bearer " + token,
                            })
                                .send(postToUpdate)];
                    case 2:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should NOT update a post if not find a post", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, loginResponse, token, postToUpdate, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new AdminUser();
                        return [4 /*yield*/, server.post("/user/login").send(user)];
                    case 1:
                        loginResponse = _a.sent();
                        token = loginResponse.body.token;
                        postToUpdate = {
                            title: "some_title",
                            content: "some_content",
                        };
                        return [4 /*yield*/, server
                                .put("/blogpost/:not-a-valid-id")
                                .set({
                                authorization: "Bearer " + token,
                            })
                                .send(postToUpdate)];
                    case 2:
                        response = _a.sent();
                        expect(response.status).toBe(404);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
