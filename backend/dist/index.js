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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const generative_ai_1 = require("@google/generative-ai");
const cors_1 = __importDefault(require("cors"));
const prompts_1 = require("./prompts");
const node_1 = require("./default/node");
const react_1 = require("./default/react");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY in environment variables");
}
const genAI = new generative_ai_1.GoogleGenerativeAI(GEMINI_API_KEY);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/template", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const prompt = req.body.prompt;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = yield model.generateContent(`
            Return either 'node' or 'react' based on what you think this project should be. 
            Only return a single word: either 'node' or 'react'. Do not return anything extra.
            User prompt: ${prompt}
        `);
        // Extract the actual response text
        const responseText = ((_b = (_a = result === null || result === void 0 ? void 0 : result.response) === null || _a === void 0 ? void 0 : _a.text()) === null || _b === void 0 ? void 0 : _b.trim().toLowerCase()) || "";
        if (responseText === "react") {
            res.json({
                prompts: [
                    prompts_1.BASE_PROMPT,
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
                ],
                uiPrompts: [react_1.basePrompt]
            });
            return;
        }
        if (responseText === "node") {
            res.json({
                prompts: [
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${node_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
                ],
                uiPrompts: [node_1.basePrompt]
            });
            return;
        }
        res.status(403).json({ message: "Invalid response from AI model." });
    }
    catch (error) {
        console.error("Error in /template route:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
app.post("/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const messages = req.body.messages;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = yield model.generateContent((0, prompts_1.getSystemPrompt)());
        res.json({
            response: ((_a = result === null || result === void 0 ? void 0 : result.response) === null || _a === void 0 ? void 0 : _a.text()) || "No response received"
        });
    }
    catch (error) {
        console.error("Error in /chat route:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
