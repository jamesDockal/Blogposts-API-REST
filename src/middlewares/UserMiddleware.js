"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserMiddleware = /** @class */ (function () {
    function UserMiddleware() {
    }
    // this middleware gonna see if the username and password were provided
    UserMiddleware.prototype.passedCrendentials = function (req, res, next) {
        var _a = req.body, username = _a.username, password = _a.password;
        if (!username) {
            return res.status(400).json({ error: "No username provided!" });
        }
        if (!password) {
            return res.status(400).json({ error: "No password provided!" });
        }
        return next();
    };
    return UserMiddleware;
}());
exports.default = UserMiddleware;
