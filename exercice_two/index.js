//Equivalent of Scanner in Java of NodeJs
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
})

let places = {apartments: 0, homes: 0, villas: 0};
let characters = {mummys: 0, vampires: 0, ghosts: 0};

function question(theQuestion) {
    return new Promise(resolve => readline.question(theQuestion, answ => resolve(answ)))
}

function ProcessingData (places, characters) {

    let candys = [0, 0, 0]
    
    for(const property in places) {

        if (property == "apartments") {
            candys[0] += parseInt(characters.mummys == 0 ? 0 : characters.mummys < 2 ? 3 : 6, 10);
            // console.log(candys.mummys);
            candys[2] += parseInt(characters.ghosts == 0 ? 0 : 4, 10);
            console.log(candys[2])
        }

        if (property == "homes") {
            candys[0] += parseInt(characters.mummys == 0 ? 0 : characters.mummys, 10);
            // console.log(candys.mummys);
            candys[1] += parseInt(characters.vampires == 0 ? 0 : characters.vampires <= 4 ? characters.vampires * 2 : (characters.vampires - 4) + 8, 10);
            candys[2] += parseInt(characters.ghosts == 0 ? 0 : characters.ghosts * 3 - 3, 10);
            console.log(candys[2])
        }

        if (property == "villas") {
            candys[0] += parseInt(characters.mummys == 0 ? 0 : 2 * characters.mummys, 10);
            // console.log(candys.mummys);
            candys[1] += parseInt(characters.vampires == 0 ? 0 : 12, 10);
            candys[2] += parseInt(characters.ghosts == 0 ? 0 : 2 * characters.ghosts, 10);
            console.log(candys[2])
        }
        
    }

    for(const property in places) {

        if (property == "apartments") {
            candys[1] -= parseInt(characters.mummys == 0 ? 0 : characters.mummys * 2, 10); 
            candys[2] -= parseInt(characters.ghosts == 0 ? 0 : characters.ghosts * 2, 10);
        }

        if (property == "homes") {
            candys[0] -= parseInt(characters.mummys == 0 ? 0 : characters.mummys, 10);
            candys[1] -= parseInt(characters.vampires == 0 ? 0 : characters.vampires * 2, 10);
        }

        if (property == "villas") {
            candys[1] -= parseInt(characters.vampires == 0 ? 0 : characters.vampires * 2, 10);
        }
        
    }

    return candys;

}

async function main () {

    //questions for places
    for (const property in places){
        await question("How many " + property + " ?").then( res => {
            if(!res) return console.log("Please enter a value");
            if(isNaN(res)) return console.log("Please enter a number");

            places[property] = res;
        }) 
    }
    
    //questions for characters
    for (const property in characters){
        await question("How many " + property + " ?").then( res => {
            if(!res) return console.log("Please enter a value");
            if(isNaN(res)) console.log("Please enter a number");

            characters[property] = res;
        }) 
    }

    readline.close();

    console.log(ProcessingData(places, characters));
}



main();