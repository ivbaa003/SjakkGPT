async function startGame(gameType, chatbot1Message, chatbot2Message) {
    try {
        const response = await fetch("http://localhost:3000/start", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameType: gameType, chatbot1Message: chatbot1Message, chatbot2Message: chatbot2Message}),
        });
    
        const data = await response.json();
        console.log(data.content);
        gameStarted = true

        nextTurn(true)

    } catch (error) {
        console.error("Error starting the game, for some reason.", error);
    }
    
    render()
}

async function getChatGPTResponse(sender, userMessage) {
    console.log(sender)

    if(sender == "chatbot 1" || sender ==  "human") {
        try {
            const response = await fetch("http://localhost:3000/api2", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage, sender: sender}),
            });
    
            const data = await response.json();
            console.log("ChatGPT Response:", data.content);
            
            waitingForAI = false
            chatGPTMove = data.content;


            if (!turn && !waitingForAI) {
                document.getElementById("ChatGPT-text").innerHTML = chatGPTMove
                stringToMove(chatGPTMove, whitePieces, blackPieces)
                waitingForAI = true
            }
        
            else if (turn && !waitingForAI) {
                document.getElementById("ChatGPT-text").innerHTML = chatGPTMove
                stringToMove(chatGPTMove, blackPieces, whitePieces)
                waitingForAI = true
            }
            
        } catch (error) {
            console.error("Error fetching ChatGPT response:", error);
        }
    }

    else if(sender == "chatbot 2") {
        try {
            const response = await fetch("http://localhost:3000/api1", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage, sender: sender}),
            });
    
            const data = await response.json();
            console.log("ChatGPT Response:", data.content);
            
            waitingForAI = false
            chatGPTMove = data.content;


            if (!turn && !waitingForAI) {
                document.getElementById("ChatGPT-text").innerHTML = chatGPTMove
                stringToMove(chatGPTMove, whitePieces, blackPieces)
                waitingForAI = true
            }
        
            else if (turn && !waitingForAI) {
                document.getElementById("ChatGPT-text").innerHTML = chatGPTMove
                stringToMove(chatGPTMove, blackPieces, whitePieces)
                waitingForAI = true
            }
        } catch (error) {
            console.error("Error fetching ChatGPT response:", error);
        }
    }

    render()
}
