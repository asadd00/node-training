console.log("Tic Tac Toe")
console.log("***********")
console.log()

const board = [
    ["X", "O", "O"],
    ["X", "O", "O"],
    ["O", "X", "O"]
  ];

let invalidData = false
const tick = "O"
const cross = "X"
let checkingTick = false
let checkingCross = false
let winner = null

for(var i = 0; i < board.length; i++){
    let row = ""
    for(var j = 0; j < board.length; j++){
        row = row + " " + board[i][j]
    }

    console.log(row)
}

for(var i = 0; i < board.length; i++){
    let horizontalCheck = board[i][0]
    let horizontalCheckCount = 0
        
    let verticalCheck = board[0][i]
    let verticalCheckCount = 0

    for(var j = 0; j < board.length; j++){
        const horinzonalItem = board[i][j]
        const verticalItem = board[j][i]

        if((!horinzonalItem.trim()) || (horinzonalItem != tick && horinzonalItem != cross)) {
            invalidData = true
            break
        }

        if(horizontalCheck == horinzonalItem){
            horizontalCheckCount++
        }
        
        if(verticalCheck == verticalItem){
            verticalCheckCount++
        }
        
        if(horizontalCheckCount == 3){
            winner = horizontalCheck
            break
        }
        
        if(verticalCheckCount == 3){
            winner = verticalCheck
            break
        }
    }

    if(invalidData || winner != null) {
        break
    }
    
    horizontalCheckCount = 0
    verticalCheckCount = 0
}

//check for diagonal
if(winner == null){
    const diagonalItem = board[1][1]
    if((board[0][0] == diagonalItem && board[2][2] == diagonalItem) || (board[0][2] == diagonalItem && board[2][0] == diagonalItem)){
        winner = diagonalItem
    }
}

console.log()
if(invalidData){
    console.log("Invalid board data")
}
else if(winner != null) {
    console.log(`'${winner}' is winner`)
}
else {
    console.log("Game is draw")
}
console.log()