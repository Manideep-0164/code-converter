const express = require("express");
const router = express.Router();
require("dotenv").config();
const axios = require("axios");

// Convert code to a different language
router.post("/convert", async (req, res) => {
  const { code, targetLanguage } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        prompt: `Convert the following code snippet to ${targetLanguage}. Provide the converted code only, without introductory lines or additional explanations.\n\n${code}`,
        max_tokens: 50,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const convertedCode = response.data.choices[0].text.trim();
    res.json({ convertedCode });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred during code conversion." });
  }
});

// Debug the code
router.post("/debug", async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        prompt: `You are given the following code snippet that is intended to perform a specific task. However, there seems to be an issue causing the code to not function correctly. Your task is to identify the problem, debug the code, and modify it to achieve the intended outcome.make sure the response should be in multiple lines \n\n${code}`,
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const debuggedCode = response.data.choices[0].text.trim();
    res.json({ debuggedCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during code debugging." });
  }
});

// Perform quality check
router.post("/quality-check", async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        prompt: `You have been given a code snippet to review and optimize. Your goal is to perform a thorough quality check on the code, ensuring it meets high standards for functionality, performance, readability, and security. Identify areas that can be optimized and provide suggestions for improvement. Additionally, implement any necessary changes to enhance the code's quality. make sure the response should be in multiple lines \n\n${code}`,
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const qualityCheckResult = response.data.choices[0].text.trim();
    res.json({ qualityCheckResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during code debugging." });
  }
});

module.exports = router;
