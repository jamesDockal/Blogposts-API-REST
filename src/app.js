"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
// start the database
require("./database");
// routes file
var userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
var blogpostRoutes_1 = __importDefault(require("./Routes/blogpostRoutes"));
var app = express_1.default();
app.use(cors_1.default());
// code to the express can ready json on the body
app.use(express_1.default.json());
app.get("/", function (req, res) {
    return res.send("ok");
});
// user's routes
app.use("/user", userRoutes_1.default);
// blogpost' routes
app.use("/blogpost", blogpostRoutes_1.default);
exports.default = app;