require("dotenv").config({ path: "./api_key.env" });


let chatbot1previousMessanges = [
    { role: "system", content: 'content'},
]

let chatbot2previousMessanges = [
    { role: "system", content: 'content'},
]

let turnNumber = 0
let started = false

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());


app.post("/start", async (req, res) => {
    const { gameType, chatbot1Message, chatbot2Message } = req.body;

    
    started = true;

    chatbot2previousMessanges = [
        { role: "system", content: 'content'},
    ]
    chatbot2previousMessanges[0].content = 'Play chess with another chatbot identical to you. To move, you will say what kind piece you\'re moving, where that piece is, and where you\'ll move it to. You always have to say what piece you\'re moving. ALWAYS mark your move in square brackets, or else my program won\'t be able to detect them, like "[Pawn e2 to e4]" or "[Knight b1 to c3]" for example. Make sure your move is the first thing you say in your response, then follow that with everything else you have to say. You\'ll be playing as white. ' + chatbot2Message

    if(gameType) {
        console.log("BOT vs BOT")
        chatbot1previousMessanges = [
            { role: "system", content: 'content'},
        ]
        chatbot1previousMessanges[0].content = 'Play chess with another chatbot identical to you. To move, you will say what kind piece you\'re moving, where that piece is, and where you\'ll move it to. You always have to say what piece you\'re moving. ALWAYS mark your move in square brackets, or else my program won\'t be able to detect them, like "[Pawn e2 to e4]" or "[Knight b1 to c3]" for example. Make sure your move is the first thing you say in your response, then follow that with everything else you have to say. You\'ll be playing as black. ' + chatbot1Message

    }
    
    else {
        console.log("PLAYER vs BOT")
    }

    

    console.log(chatbot1previousMessanges[0].content, chatbot2previousMessanges[0].content)
    
    console.log("Game started!!!!!")
    
    const a =1
    res.json("Game started!")
});



app.post("/api1", async (req, res) => {
    if(started) {
        const { sender, message } = req.body;
        console.log(sender)
        console.log(message)
    
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
                    max_tokens: 140,
                    messages: chatbot1previousMessanges
                }),
            });
    
            
    
            const data = await response.json();
            console.log(data.choices[0].message)
            console.log(chatbot1previousMessanges[0].content)
    
            chatbot1previousMessanges.push({ role: "assistant", content: data.choices[0].message.content })
            chatbot2previousMessanges.push({ role: "user", content: data.choices[0].message.content })
    
    
    
    
            res.json(data.choices[data.choices.length-1].message);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to fetch response from AI" });
        }
    }

});



app.post("/api2", async (req, res) => {
    if(started) {
        const { sender, message } = req.body;
        console.log(sender)
        console.log(message)

        

        if(sender == "human") {
            chatbot2previousMessanges.push({ role: "user", content: message })
        }
        

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
                    max_tokens: 140,
                    messages: chatbot2previousMessanges
                }),
            });

            

            const data = await response.json();
            console.log(data.choices[0].message)
            console.log(chatbot2previousMessanges[0].content)

            chatbot2previousMessanges.push({ role: "assistant", content: data.choices[0].message.content })
            chatbot1previousMessanges.push({ role: "user", content: data.choices[0].message.content })

            res.json(data.choices[data.choices.length-1].message);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to fetch response from AI" });
        }
    }
    
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

