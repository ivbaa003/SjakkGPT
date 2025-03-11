
/*
async function getData() {
    const url = "http://localhost:5000/api/data";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const json = await response.json();
        
        
        //console.log(json);
        return(json)
    } 
    
    catch (error) {
        console.error(error.message);
    }
    
}

async function sendData() {
    const dataToSend = { name: "Alice", age: 25 };

    try {
        fetch('http://localhost:5000/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
    } 
    
    catch (error) {
        console.error(error.message);
    }
    
}

let aaaaa = getData()
let bbbbb
aaaaa.then((value) => {
    bbbbb = value
    console.log(bbbbb)
});


//console.log(getData())

*/











/*
async function sendData() {
    const url = "http://localhost:3000/api/hello";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const json = await response.json();
        
        
        //console.log(json);
        return(json)
    } 
    
    catch (error) {
        console.error(error.message);
    }
    
}

let aaaa = acquireDataFromUsingAnAPI()
let bbbb
aaaa.then((value) => {
    bbbb = value
    console.log(bbbb)
});

*/


/*
async function sendData (aaaaaa) {
    const dataToSend = { data: aaaaaa }; // Data to be processed

    try {
        const response = await fetch('http://localhost:3000/api/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        });

        const result = await response.json();
        console.log("Processed Data:", result.processedData);
        return(result.processedData)
    } catch (error) {
        console.error("Error:", error);
    }
};

*/



// Call the function to send data

//let hello = sendData("ivo")

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
