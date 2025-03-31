require("dotenv").config();
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";

import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import { basePrompt as nodeBasePrompt } from "./default/node";
import { basePrompt as reactBasePrompt } from "./default/react";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in environment variables");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const app = express();

app.use(cors());
app.use(express.json());

// Enhanced logging in /template endpoint
app.post("/template", async (req, res) => {
    const prompt = req.body.prompt;
    console.log("Received prompt:", prompt);  // Log the received prompt

    try {
        console.log("Sending request to Generative AI...");

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(`
            Return either 'node' or 'react' based on what you think this project should be. 
            Only return a single word: either 'node' or 'react'. Do not return anything extra.
            User prompt: ${prompt}
        `);

        const responseText = result?.response?.text()?.trim().toLowerCase() || "";
        console.log("AI Response Text:", responseText);  // Log the AI response

        if (responseText === "react") {
            res.json({
                prompts: [
                    BASE_PROMPT,
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
                ],
                uiPrompts: [reactBasePrompt]
            });
            return;
        }

        if (responseText === "node") {
            res.json({
                prompts: [
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
                ],
                uiPrompts: [nodeBasePrompt]
            });
            return;
        }

        res.status(403).json({ message: "Invalid response from AI model." });

    } catch (error) {
        console.error("Error in /template route:", error);  // Log any errors
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Enhanced logging in /chat endpoint
app.post("/chat", async (req, res) => {
    const messages = req.body.messages;
    console.log("Received messages:", messages);  // Log the received messages

    try {
        console.log("Sending request to Generative AI...");

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(getSystemPrompt());

        // Log the full result from the model
        console.log("AI Model Response:", result);

        // Extract and log the response text
        const responseText = result?.response?.text()?.trim() || "No response received";
        console.log("AI Response Text:", responseText);  // Log the actual response text

        // Send the response back to the client
        res.json({ response: responseText });

    } catch (error) {
        console.error("Error in /chat route:", error);  // Log any errors
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
