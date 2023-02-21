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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
import { duplicatedEmailError, invalidCredentialsError } from "../errors/errors.js";
import bcrypt from "bcrypt";
import { userRepository } from "../repositories/user-repository.js";
import jwt from "jsonwebtoken";
import sessionRepository from "../repositories/sesseion-repository.js";
export function createUser(email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var hashedPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uniqueEmail(email)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, bcrypt.hash(password, 12)];
                case 2:
                    hashedPassword = _a.sent();
                    return [2 /*return*/, userRepository.create(email, hashedPassword)];
            }
        });
    });
}
function uniqueEmail(email) {
    return __awaiter(this, void 0, void 0, function () {
        var userWithSameEmail;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.findByEmail(email)];
                case 1:
                    userWithSameEmail = _a.sent();
                    if (userWithSameEmail) {
                        throw duplicatedEmailError();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function signIn(email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserOrFail(email)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, validatePasswordOrFail(password, user.password)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, createSession(user.id)];
                case 3:
                    token = _a.sent();
                    return [2 /*return*/, token];
            }
        });
    });
}
function getUserOrFail(email) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.findByEmail(email)];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw invalidCredentialsError();
                    return [2 /*return*/, user];
            }
        });
    });
}
function validatePasswordOrFail(password, userPassword) {
    return __awaiter(this, void 0, void 0, function () {
        var isPasswordValid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt.compare(password, userPassword)];
                case 1:
                    isPasswordValid = _a.sent();
                    if (!isPasswordValid)
                        throw invalidCredentialsError();
                    return [2 /*return*/];
            }
        });
    });
}
function createSession(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = jwt.sign({ userId: userId }, process.env.JWT_SECRET);
                    return [4 /*yield*/, sessionRepository.create(token, userId)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
export var userService = {
    createUser: createUser,
    signIn: signIn
};
