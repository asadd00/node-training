
import readline from "readline";

console.log("Guess the word")
console.log("**************")
console.log()

const word = "karachi";
const maxTries = 3
var remainingTries = 3
let correctLetters = []

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log(`Guess the ${word.length} letter word, you have 3 tries.`)

function ask(){
    correctLetters = [];
    if(remainingTries == 0){
        console.log("You have reached max number of tries")
        process.exit(0);
    }

    rl.question(`Try ${remainingTries}, enter the word: `, (answer) => {
        if(word.length != answer.length){
            console.log("Invalid work length")
        }
        else if(word == answer){
            console.log("Your answer is correct!")
            process.exit(0);
        }
        else {
            for(const index in word){
                if(answer[index] == word[index]){
                    correctLetters.push([index, word[index]])
                }
            }

            console.log("Your entered some letters correctly")
            console.log(correctLetters)
        }

        remainingTries--;
        ask();
    })
}

function main(){
    ask();
}

main();
