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
var BlogpostEntity_1 = __importDefault(require("../entities/BlogpostEntity"));
var UserEntity_1 = __importDefault(require("../entities/UserEntity"));
var BlogpostController = /** @class */ (function () {
    function BlogpostController() {
    }
    BlogpostController.prototype.getAllBlogpost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var blogpostRepository, allPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(BlogpostEntity_1.default)];
                    case 1:
                        blogpostRepository = _a.sent();
                        return [4 /*yield*/, blogpostRepository.find()];
                    case 2:
                        allPost = _a.sent();
                        return [2 /*return*/, res.send(allPost)];
                }
            });
        });
    };
    BlogpostController.prototype.getOnePost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var slug, blogpost, post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        slug = req.params.slug;
                        return [4 /*yield*/, typeorm_1.getRepository(BlogpostEntity_1.default)];
                    case 1:
                        blogpost = _a.sent();
                        return [4 /*yield*/, blogpost.findOne({
                                slug: slug,
                            })];
                    case 2:
                        post = _a.sent();
                        // post not found
                        if (!post) {
                            return [2 /*return*/, res.status(404).json({
                                    error: "Post not found",
                                })];
                        }
                        return [2 /*return*/, res.json({ post: post })];
                }
            });
        });
    };
    BlogpostController.prototype.createPost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, content, created_by, userRepository, user, blogpostRepository, slug, newPost, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, title = _a.title, content = _a.content;
                        created_by = res.locals.jwt_user_id;
                        return [4 /*yield*/, typeorm_1.getRepository(UserEntity_1.default)];
                    case 1:
                        userRepository = _b.sent();
                        return [4 /*yield*/, userRepository.findOne({
                                id: created_by,
                            })];
                    case 2:
                        user = _b.sent();
                        blogpostRepository = typeorm_1.getRepository(BlogpostEntity_1.default);
                        slug = title
                            .toLowerCase()
                            .replace(/ /g, "-")
                            .replace(/[^\w-]+/g, "");
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, blogpostRepository.create({
                                title: title,
                                content: content,
                                slug: slug,
                                created_by: user === null || user === void 0 ? void 0 : user.username,
                            })];
                    case 4:
                        newPost = _b.sent();
                        return [4 /*yield*/, blogpostRepository.save(newPost)];
                    case 5:
                        _b.sent();
                        // return the new post that was created
                        return [2 /*return*/, res.json({ post: newPost })];
                    case 6:
                        e_1 = _b.sent();
                        return [2 /*return*/, res.status(400).json({ error: e_1.message })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    BlogpostController.prototype.deletePost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, blogpostRepository, post, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        if (!id) {
                            return [2 /*return*/, res.status(400).json({
                                    error: "To delete a post, you must pass an the id on the url ",
                                })];
                        }
                        return [4 /*yield*/, typeorm_1.getRepository(BlogpostEntity_1.default)];
                    case 1:
                        blogpostRepository = _a.sent();
                        return [4 /*yield*/, blogpostRepository.findOne({
                                id: id,
                            })];
                    case 2:
                        post = _a.sent();
                        // post doest not exist by the given id
                        if (!post) {
                            return [2 /*return*/, res.status(404).json({ error: "Post not found" })];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        // deleting the post
                        return [4 /*yield*/, blogpostRepository.delete(post)];
                    case 4:
                        // deleting the post
                        _a.sent();
                        return [2 /*return*/, res.json({ success: "Post deleted" })];
                    case 5:
                        e_2 = _a.sent();
                        return [2 /*return*/, res.status(500).json({
                                error: e_2.message,
                            })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    BlogpostController.prototype.updatePost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, title, content, blogpost, post, slug, updatePost, slug, updatePost, updatedPost, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        if (!id) {
                            return [2 /*return*/, res.status(400).json({
                                    error: "To update a post, you must pass an the id on the url ",
                                })];
                        }
                        _a = req.body, title = _a.title, content = _a.content;
                        if (!title && !content) {
                            return [2 /*return*/, res.status(400).json({
                                    error: "To update a post, you must provided title or a content",
                                })];
                        }
                        return [4 /*yield*/, typeorm_1.getRepository(BlogpostEntity_1.default)];
                    case 1:
                        blogpost = _b.sent();
                        return [4 /*yield*/, blogpost.findOne({
                                id: id,
                            })];
                    case 2:
                        post = _b.sent();
                        if (!post) {
                            return [2 /*return*/, res.status(404).json({
                                    error: "Post not found",
                                })];
                        }
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 13, , 14]);
                        if (!(title && content)) return [3 /*break*/, 6];
                        slug = title
                            .toLowerCase()
                            .replace(/ /g, "-")
                            .replace(/[^\w-]+/g, "");
                        return [4 /*yield*/, blogpost.update(post.id, {
                                title: title,
                                content: content,
                                slug: slug,
                            })];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, blogpost.findOne({
                                id: id,
                            })];
                    case 5:
                        updatePost = _b.sent();
                        return [2 /*return*/, res.json({ updatePost: updatePost })];
                    case 6:
                        if (!title) return [3 /*break*/, 9];
                        slug = title
                            .toLowerCase()
                            .replace(/ /g, "-")
                            .replace(/[^\w-]+/g, "");
                        return [4 /*yield*/, blogpost.update(post.id, {
                                title: title,
                                slug: slug,
                            })];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, blogpost.findOne({
                                id: id,
                            })];
                    case 8:
                        updatePost = _b.sent();
                        return [2 /*return*/, res.json({ updatePost: updatePost })];
                    case 9:
                        if (!content) return [3 /*break*/, 12];
                        return [4 /*yield*/, blogpost.update(post.id, {
                                content: content,
                            })];
                    case 10:
                        _b.sent();
                        return [4 /*yield*/, blogpost.findOne({
                                id: id,
                            })];
                    case 11:
                        updatedPost = _b.sent();
                        return [2 /*return*/, res.json({ updatedPost: updatedPost })];
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        e_3 = _b.sent();
                        // if the user is tring to change the title for one that alredy exists
                        return [2 /*return*/, res.status(400).json({ errror: "Title alredy in use" })];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    return BlogpostController;
}());
exports.default = BlogpostController;
