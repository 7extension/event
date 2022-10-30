"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BOT_TOKEN = process.env.BOT_TOKEN || '';
const APPLICATIONS_LOG_CHANNEL = process.env.APPLICATIONS_LOG_CHANNEL || '';
const applications = process.env.APPLICATIONS_LOG_CHANNEL;
if (!BOT_TOKEN || BOT_TOKEN === '') {
    throw new Error('Missing environment variable, BOT_TOKEN');
}
else if (!APPLICATIONS_LOG_CHANNEL || APPLICATIONS_LOG_CHANNEL === '') {
    throw new Error('Missing environment variable, APPLICATIONS_LOG_CHANNEL');
}
const config = {
    BOT_TOKEN,
    APPLICATIONS_LOG_CHANNEL,
};
exports.default = config;
