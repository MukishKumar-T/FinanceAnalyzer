const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

router.post('/ask', async (req, res) => {
    try {
        const { message } = req.body;

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a knowledgeable financial advisor. Provide clear, accurate, and helpful information about financial topics, investments, and money management. Keep responses concise and easy to understand."
                },
                {
                    role: "user",
                    content: message
                }
            ],
        });

        res.json({ 
            response: completion.data.choices[0].message.content 
        });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ 
            error: 'Error processing your request',
            details: error.message 
        });
    }
});

module.exports = router;
