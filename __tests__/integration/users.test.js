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
/*
  tests of the users
  Register
  login
  Loged routes
*/
describe("user", function () {
    describe("Register", function () {
        /*
          to the user registred,
          he must provide username and password
          and the username cant be in use
        */
        it("should see if the password was NOT provided", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = { username: "teste_username" };
                        return [4 /*yield*/, server.post("/user/register").send(user)];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should see if the username was NOT provided", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = { password: "teste_password" };
                        return [4 /*yield*/, server.post("/user/register").send(user)];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should NOT created an user if the username is alredy in use", function () { return __awaiter(void 0, void 0, void 0, function () {
            var mocKUser, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mocKUser = {
                            username: "admin",
                            password: "anypassword",
                        };
                        return [4 /*yield*/, server.post("/user/register").send(mocKUser)];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("login", function () {
        it("should see if the password was NOT provided", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = { username: "teste_username" };
                        return [4 /*yield*/, server.post("/user/login").send(user)];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should see if the username was NOT provided", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = { password: "teste_password" };
                        return [4 /*yield*/, server.post("/user/login").send(user)];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should see if the user NOT exists", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = {
                            username: "username_not_cadastred",
                            password: "any_password",
                        };
                        return [4 /*yield*/, server.post("/user/login").send(user)];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should see if the user alredy exists", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new AdminUser();
                        return [4 /*yield*/, server.post("/user/login").send(user)];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should to validate a wrong password", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = {
                            username: "admin",
                            password: "wrong_password",
                        };
                        return [4 /*yield*/, server.post("/user/login").send(user)];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Loged routes", function () {
        /*
          to the user get logged,
          he must pass his username and pasword
        */
        it("should return a error if no token on header was provided", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new MockUser();
                        return [4 /*yield*/, server.post("/user/private-route-test").send(user)];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return a error if the token does not have the word 'Bearer'", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new MockUser();
                        return [4 /*yield*/, server
                                .post("/user/private-route-test")
                                .send(user)
                                .set({ authorization: "teste" })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return ok if pass a valid token", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, loginResponse, token, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new AdminUser();
                        return [4 /*yield*/, server.post("/user/login").send(user)];
                    case 1:
                        loginResponse = _a.sent();
                        token = loginResponse.body.token;
                        return [4 /*yield*/, server
                                .post("/user/private-route-test")
                                .send(user)
                                .set({ authorization: "Bearer " + token })];
                    case 2:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
