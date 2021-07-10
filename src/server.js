"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// start the server in localhost
app_1.default.listen(process.env.PORT || 3000, function () {
    return console.log("Server Running on port " + (process.env.PORT || 3000));
});
