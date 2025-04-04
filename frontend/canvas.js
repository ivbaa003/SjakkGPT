function moveToString(pieceUsing, oldX, oldY, newX, newY, capturedType) {
    let stringMaking = pieceUsing + " " + letters[oldX] + (oldY+1) + " to " + letters[newX] + (newY+1)
    if(capturedType !== "") {stringMaking = stringMaking + " (Captured your " + capturedType + "!)"}
     
    return stringMaking
    
}

let waitingForAI = true
let readyForNextTurn = true
let chatGPTMove = "a"



let gameStarted = false

function startTheGame() {
    if(readyForNextTurn) {
        gameType = true
            
        const chatbot2msg = document.getElementById("chatbot2msg").value
        let chatbot1msg
        if(gameType) {
            chatbot1msg = document.getElementById("chatbot1msg").value
        }

        else{
            chatbot1msg = "aaaaaa"
        }

        if(document.getElementById("pvb").checked) {
            gameType = false
        }

        else if(document.getElementById("bvb").checked) {
            gameType = true
        }
        

        whitePieces = [
            new piece(0,"Pawn",       0,1),
            new piece(0,"Pawn",       1,1),
            new piece(0,"Pawn",       2,1),
            new piece(0,"Pawn",       3,1),
            new piece(0,"Pawn",       4,1),
            new piece(0,"Pawn",       5,1),
            new piece(0,"Pawn",       6,1),
            new piece(0,"Pawn",       7,1),
            
            new piece(1,"Rook",       0,0),
            new piece(2,"Knight",     1,0),
            new piece(3,"Bishop",     2,0),
            new piece(4,"Queen",      3,0),
            new piece(5,"King",       4,0),
            new piece(3,"Bishop",     5,0),
            new piece(2,"Knight",     6,0),
            new piece(1,"Rook",       7,0),
        ]
        
        blackPieces = [
            new piece(0,"Pawn",       0,6),
            new piece(0,"Pawn",       1,6),
            new piece(0,"Pawn",       2,6),
            new piece(0,"Pawn",       3,6),
            new piece(0,"Pawn",       4,6),
            new piece(0,"Pawn",       5,6),
            new piece(0,"Pawn",       6,6),
            new piece(0,"Pawn",       7,6),
            
            new piece(1,"Rook",       0,7),
            new piece(2,"Knight",     1,7),
            new piece(3,"Bishop",     2,7),
            new piece(4,"Queen",      3,7),
            new piece(5,"King",       4,7),
            new piece(3,"Bishop",     5,7),
            new piece(2,"Knight",     6,7),
            new piece(1,"Rook",       7,7),
        ]

        startGame(gameType, chatbot1msg, chatbot2msg) //true = bot vs bot,          false = bot vs player
    }
    render()
}

function nextTurn(bypass) {
    if(gameStarted && readyForNextTurn && (gameType || bypass)) {
        console.log("Next turn!")
        readyForNextTurn = false
        if(!turn) {
            waitingForAI = true
            getChatGPTResponse("chatbot 1","a")
        }   
        
        else if(turn) {
            waitingForAI = true
            getChatGPTResponse("chatbot 2","a")
        }  
    }
    
    else {console.log("Not ready for the next turn.")}
    
}



let gameType = false //false = Player vs. AI            true = AI vs AI

function stringToMove(stringUsing, teamMoving, teamDefending) {
    let firstSquareBracket = 0
    let secondSquareBracket = 0

    let pieceTypeMoving = "Error"
    let pieceTypeLength = 0

    stringChecking = stringUsing

    for (let letterChecking = 0; letterChecking < stringChecking.length; letterChecking++) {
        if(stringChecking[letterChecking] == "[") {
            firstSquareBracket = letterChecking
        }

        if(stringChecking[letterChecking] == "]") {
            secondSquareBracket = letterChecking
        }
        
    }

    stringChecking = stringChecking.slice(firstSquareBracket+1, secondSquareBracket)
    const firstTwoLetters = stringChecking.slice(0, 2)

    let pieceTypeNumber = 0

    if     (firstTwoLetters == "Pa") {pieceTypeMoving = "Pawn";     pieceTypeLength = 4;    pieceTypeNumber = 0}
    else if(firstTwoLetters == "Ro") {pieceTypeMoving = "Rook";     pieceTypeLength = 4;    pieceTypeNumber = 1}
    else if(firstTwoLetters == "Kn") {pieceTypeMoving = "Knight";   pieceTypeLength = 6;    pieceTypeNumber = 2}
    else if(firstTwoLetters == "Bi") {pieceTypeMoving = "Bishop";   pieceTypeLength = 6;    pieceTypeNumber = 3}
    else if(firstTwoLetters == "Qu") {pieceTypeMoving = "Queen";    pieceTypeLength = 5;    pieceTypeNumber = 4}
    else if(firstTwoLetters == "Ki") {pieceTypeMoving = "King";     pieceTypeLength = 4;    pieceTypeNumber = 5}

    stringChecking = stringChecking.slice(pieceTypeLength+1, stringChecking.length)


    const realOldX = letters.indexOf(stringChecking[0])
    const realOldY = Number(stringChecking[1])-1

    const realNewX = letters.indexOf(stringChecking[6])
    const realNewY = Number(stringChecking[7])-1


    let foundPiece = false

    teamMoving.forEach((element) => {
        if(element.nameType == pieceTypeMoving && element.x == realOldX && element.y == realOldY) {
            console.log("Piece found! Moving.")
            foundPiece = true
            found = true
            element.x = realNewX
            element.y = realNewY

            if(turn) {turn = false}
            else     {turn = true}

            lineFrom.x = realOldX;  lineFrom.y = realOldY
            lineTo.x = realNewX;    lineTo.y = realNewY

            teamDefending.forEach((blackElement) => {
                if(element.x == blackElement.x &&        element.y == blackElement.y) {
                    blackElement.alive = false
                    blackElement.x = 9
                    blackElement.y = 30
                }
            });

            teamMoving.forEach((whiteElement) => {
                if(element.x == whiteElement.x &&        element.y == whiteElement.y        && whiteElement !== element) {
                    whiteElement.alive = false
                    whiteElement.x = 9
                    whiteElement.y = 30
                }
            });
                
        }
        
    });

    console.log(teamMoving.length)

    if(!foundPiece) {
        console.log("Couldn't find the piece, creating a new one.")
        console.log(teamMoving)

        teamMoving.push(new piece(pieceTypeNumber,pieceTypeMoving, realNewX, realNewY))

        lineFrom.x = realOldX;  lineFrom.y = realOldY
        lineTo.x = realNewX;    lineTo.y = realNewY

        if(turn) {turn = false}
        else     {turn = true}

        teamDefending.forEach((blackElement) => {
            if(teamMoving[teamMoving.length-1].x == blackElement.x &&        teamMoving[teamMoving.length-1].y == blackElement.y) {
                blackElement.alive = false
                
                blackElement.x = 9
                blackElement.y = 30
            }
        });
    }

    readyForNextTurn = true
    
}

let mousee = {
    x: 10,
    boardX: 0,
    y: 10,
    boardY: 0,
	rightclick: function() {

	},

	click: function() {

        mousee.boardX = (Math.floor(mousee.x/52))
        mousee.boardY = (Math.floor(mousee.y/52))

        if(gameType == false && turn && mousee.x < 415 && mousee.x > 1 && mousee.y < 415 && mousee.y > 1) {
            if(pieceSelected) {

                if(blackPieces[pieceMoving].x == mousee.boardX &&        blackPieces[pieceMoving].y == mousee.boardY) {
                    pieceSelected = false
                }

                else {
                    let oldX = blackPieces[pieceMoving].x
                    let oldY = blackPieces[pieceMoving].y
        
                    let newX = mousee.boardX
                    let newY = mousee.boardY
    
                    blackPieces[pieceMoving].x = newX
                    blackPieces[pieceMoving].y = newY 
        
                    
                    waitingForAI = true
        
                    
                    pieceSelected = false
                    turn = false
                    let capturedType = ""
        
                    for (let index = 0; index < whitePieces.length; index++) {
                        if(whitePieces[index].x == blackPieces[pieceMoving].x &&        whitePieces[index].y == blackPieces[pieceMoving].y) {
                            whitePieces[index].alive = false
                                
                            whitePieces[index].x = 9
                            whitePieces[index].y = 30
                            capturedType = whitePieces[index].nameType
                        }
                    }
        
                    whiteMoveString = moveToString(blackPieces[pieceMoving].nameType, oldX, oldY, newX, newY, capturedType)
                    console.log(whiteMoveString)
                    getChatGPTResponse("human", whiteMoveString)
    
                }
                    
            }
            else {
                
                for (let index = 0; index < blackPieces.length; index++) {
                    if(blackPieces[index].x == mousee.boardX &&        blackPieces[index].y == mousee.boardY) {
                        pieceMoving = index
                        pieceSelected = true
                        
                    }
                    
                }
                
            }
            
        }
        
        render()
	}
}


let turn = false // false = white's turn,         true = black's turn
let pieceSelected = false
let pieceMoving = 0
let whiteMoveString = "Pawn a1 to a3"

let lineFrom =  {x:0, y:0}
let lineTo =    {x:0, y:0}


function piece(imageID, nameType, x, y) {
    this.imageID = imageID
    this.nameType = nameType
	this.x = x
	this.y = y
    this.alive = true
}

let whitePieces = [
    new piece(0,"Pawn",       0,1),
    new piece(0,"Pawn",       1,1),
    new piece(0,"Pawn",       2,1),
    new piece(0,"Pawn",       3,1),
    new piece(0,"Pawn",       4,1),
    new piece(0,"Pawn",       5,1),
    new piece(0,"Pawn",       6,1),
    new piece(0,"Pawn",       7,1),

    new piece(1,"Rook",       0,0),
    new piece(2,"Knight",     1,0),
    new piece(3,"Bishop",     2,0),
    new piece(4,"Queen",      3,0),
    new piece(5,"King",       4,0),
    new piece(3,"Bishop",     5,0),
    new piece(2,"Knight",     6,0),
    new piece(1,"Rook",       7,0),
]

let blackPieces = [
    new piece(0,"Pawn",       0,6),
    new piece(0,"Pawn",       1,6),
    new piece(0,"Pawn",       2,6),
    new piece(0,"Pawn",       3,6),
    new piece(0,"Pawn",       4,6),
    new piece(0,"Pawn",       5,6),
    new piece(0,"Pawn",       6,6),
    new piece(0,"Pawn",       7,6),

    new piece(1,"Rook",       0,7),
    new piece(2,"Knight",     1,7),
    new piece(3,"Bishop",     2,7),
    new piece(4,"Queen",      3,7),
    new piece(5,"King",       4,7),
    new piece(3,"Bishop",     5,7),
    new piece(2,"Knight",     6,7),
    new piece(1,"Rook",       7,7),
]




let moveHistory = [

]

const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
       
]

function setup() {	
    render()
}

function render() {
    ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, 416, 416);


    console.log("RENDERING BOARD!")
    for (let generatingY = 0; generatingY < 8; generatingY++) {
        for (let generatingX = 0; generatingX < 8; generatingX++) {
            if((generatingY+generatingX)%2 == 0) {
                ctx.fillStyle = "rgb(79, 75, 67)";
            }
            else {
                ctx.fillStyle = "rgb(130, 124, 111)";
            }
            
	        ctx.fillRect(52*generatingX, 52*generatingY, 51, 51);   
        }
    }

    if(pieceSelected) {
        ctx.fillStyle = "rgb(0, 124, 0)";
        ctx.fillRect(52*blackPieces[pieceMoving].x, 52*blackPieces[pieceMoving].y, 51, 51);    
    }

    whitePieces.forEach((element) => {
        if(element.alive) {ctx.drawImage(images[element.imageID],    52*element.x+5, 52*element.y+5,     40,40)}
    });

    blackPieces.forEach((element) => {
        if(element.alive) {ctx.drawImage(images[element.imageID+6],    52*element.x+5, 52*element.y+5,     40,40)}
    });

    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(lineFrom.x*52+26,   lineFrom.y*52+26);
    ctx.lineTo(lineTo.x*52+26,     lineTo.y*52+26);
    ctx.closePath()

    ctx.stroke();
}