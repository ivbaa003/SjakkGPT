//require("dotenv").config();
require("dotenv").config({ path: "./api_key.env" });


//  0.00000000000000978474%





// Always explain your thought process when you do a move. 


let previousMessanges = [
    { role: "user", content: 'Play chess with me. To move, you will say what kind piece you\'re moving, where that piece is, and where you\'ll move it to. You always have to say what piece you\'re moving. ALWAYS mark your move in square brackets, or else my program won\'t be able to detect them, like "[Pawn e2 to e4]" or "[Knight b1 to c3]" for example. You\'ll be playing as white.'},
    { role: "assistant", content: 'Sounds good! I\'ll start. \n [Pawn e2 to e4] \n Your move! '}, 

]


/*
let previousMessanges = [
    { role: "user", content: 'Repeat back to me exactly what i write.'},
    { role: "assistant", content: 'Repeat back to me exactly what i write.'}, 

]
*/


const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());


//console.log(process.env.OPENAI_API_KEY)

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
















/*
// POST endpoint to receive and process data
app.post('/api/ai', (req, res) => {
    const { data } = req.body;
    
    if (!data) {
        return res.status(400).json({ error: 'No data provided' });
    }

    // Simulate some data processing (e.g., reversing a string)
    //let processedData = "Knight a5 to a6"
	

    let dataSending = "test"
	
	if(chatgpt < 1) {
		
    	testt().then((data) => {
			console.log(data.choices[0].message.content); // Do something with the data
			let processedData = data.choices[data.choices.length-1].message
			console.log("aaaa",processedData.content); // Do something with the data
			previousMessanges.push(processedData)

			dataSending = processedData.content
			console.log("done1")

			
		}).then(() => {
			console.log("AAAAAAAAAAAAAAAA")
			console.log(typeof(dataSending))
			console.log(typeof(data))
			console.log("Data sent:", dataSending)
			//let dataAAAA = stringify
			
			res.json({ dataSending });
		});
		console.log("done2")
		chatgpt++

		
	}
	
	
	//const dataSendinga = await response.json();
    //return dataSendinga;

	//return(json({ hallo: "processedData" }))

	
	{
		console.log(".")
		let processedData = data + " ChatGPT died." + dataSending
	
		console.log("Data sent:", processedData)
		res.json({ processedData });
	}

	if(dataSending != "test") {
		console.log("DDWNIJADBOUWADVBWAOUDWAOBUDAWDIWALUVGDI UAWKH", dataSending)
	}
		
    

    
});
*/
// Start the server


/*
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
*/






/*
async function testt() {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          	Authorization: "Bearer ",
          	"Content-Type": "application/json",
        },
        body: JSON.stringify({
          	model: "gpt-4o-mini",
          	messages: previousMessanges,
          	max_tokens: 5,
          	stream: false,
        }),
    })
    const data = await response.json();
    return data;
}


*/