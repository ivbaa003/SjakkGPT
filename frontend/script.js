async function getChatGPTResponse(userMessage) {
    try {
        const response = await fetch("http://localhost:3000/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        console.log("ChatGPT Response:", data.content);
        waitingForAI = false
        //console.log(chatGPTMove)
        chatGPTMove = data.content;
    } catch (error) {
        console.error("Error fetching ChatGPT response:", error);
    }
}
