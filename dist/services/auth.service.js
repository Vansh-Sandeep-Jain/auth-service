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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const hash_utils_1 = require("../utils/hash.utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../config/constants");
const coachList_model_1 = __importDefault(require("../models/coachList.model"));
const registerUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield user_model_1.default.findOne({ email: data.email });
    if (existing)
        throw new Error("Email already in use");
    const isCoach = yield coachList_model_1.default.findOne({ email: data.email });
    const hashed = yield (0, hash_utils_1.hashPassword)(data.password);
    const user = new user_model_1.default(Object.assign(Object.assign({}, data), { password: hashed, role: isCoach ? "coach" : "client" }));
    yield user.save();
    return { message: "User registered" };
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new Error("User Not Found");
    }
    if (!(yield (0, hash_utils_1.comparePassword)(password, user.password))) {
        throw new Error("Invalid credentials");
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, constants_1.JWT_SECRET, {
        expiresIn: "1d",
    });
    const _a = user.toObject(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]); // Exclude password from the user object
    return { token, user: userWithoutPassword };
});
exports.loginUser = loginUser;
