require("dotenv").config({ path: "./api_key.env" });

let previousMessanges = [
    { role: "user", content: 'Play chess with me. To move, you will say what kind piece you\'re moving, where that piece is, and where you\'ll move it to. You always have to say what piece you\'re moving. ALWAYS mark your move in square brackets, or else my program won\'t be able to detect them, like "[Pawn e2 to e4]" or "[Knight b1 to c3]" for example. You\'ll be playing as white.'},
    { role: "assistant", content: 'Sounds good! I\'ll start. \n [Pawn e2 to e4] \n Your move! '}, 

]


const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post("/api", async (req, res) => {
	const { message } = req.body;
    previousMessanges.push({ role: "user", content: message })

    try {
        
        
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
				max_tokens: 70,
                messages: previousMessanges
            }),
        });

        

        const data = await response.json();
        console.log(data.choices[0].message)
        previousMessanges.push({ role: "assistant", content: data.choices[0].message.content })
        res.json(data.choices[data.choices.length-1].message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch response from AI" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});