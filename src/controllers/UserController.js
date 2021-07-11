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
var typeorm_1 = require("typeorm");
var UserEntity_1 = __importDefault(require("../entities/UserEntity"));
var usernameInUse_1 = __importDefault(require("../utils/usernameInUse"));
var hashPassword_1 = __importDefault(require("../utils/hashPassword"));
var jsonwebtoken_1 = require("jsonwebtoken");
var bcrypt_1 = require("bcrypt");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var UserController = /** @class */ (function () {
    function UserController() {
    }
    // all user routes are using the middleware passedCrendentials, UserMiddleware
    // that sees if the username and password were sended
    // function to create a new user | post (users/register)
    UserController.prototype.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, userRepository, e_1, password_hash, user, secretKey, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password;
                        userRepository = typeorm_1.getRepository(UserEntity_1.default);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, usernameInUse_1.default(username)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        return [2 /*return*/, res.status(400).json({ error: e_1.message })];
                    case 4: return [4 /*yield*/, hashPassword_1.default(password)];
                    case 5:
                        password_hash = _b.sent();
                        return [4 /*yield*/, userRepository.create({
                                username: username,
                                password_hash: password_hash,
                            })];
                    case 6:
                        user = _b.sent();
                        // save the user in the databse
                        return [4 /*yield*/, userRepository.save(user)];
                    case 7:
                        // save the user in the databse
                        _b.sent();
                        secretKey = process.env.SECRET_KEY || "some_secret_key";
                        return [4 /*yield*/, jsonwebtoken_1.sign(user.id, secretKey)];
                    case 8:
                        token = _b.sent();
                        // return status 200 as everything worked
                        return [2 /*return*/, res.status(200).json({
                                user: {
                                    id: user.id,
                                    username: user.username,
                                },
                                token: token,
                            })];
                }
            });
        });
    };
    // function to get all users | get (users/)
    UserController.prototype.getAllUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, users, userFormated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(UserEntity_1.default)];
                    case 1:
                        userRepository = _a.sent();
                        return [4 /*yield*/, userRepository.find()];
                    case 2:
                        users = _a.sent();
                        return [4 /*yield*/, users.map(function (element) {
                                return {
                                    id: element.id,
                                    username: element.username,
                                };
                            })];
                    case 3:
                        userFormated = _a.sent();
                        // return status 200 as everything worked
                        return [2 /*return*/, res.status(200).json({ users: userFormated })];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var password, user, rightPassword, secretKey, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        password = req.body.password;
                        user = res.locals.user;
                        return [4 /*yield*/, bcrypt_1.compare(password, user.password_hash)];
                    case 1:
                        rightPassword = _a.sent();
                        if (!rightPassword) {
                            return [2 /*return*/, res.status(401).json({ error: "Invalid password" })];
                        }
                        secretKey = process.env.SECRET_KEY || "some_secret_key";
                        return [4 /*yield*/, jsonwebtoken_1.sign(user.id, secretKey)];
                    case 2:
                        token = _a.sent();
                        res.status(200).json({
                            token: token,
                            user: {
                                username: user.username,
                                id: user.id,
                            },
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.teste = function (req, res) {
        return res.send("ok");
    };
    return UserController;
}());
exports.default = UserController;
