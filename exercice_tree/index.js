//Equivalent of Scanner in Java of NodeJs
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
})

let candysForPlaces = {apartments: 0, homes: 0, villas: 0};
let lessCandys = 0;

function question(question) {
    return new Promise(resolve => readline.question(question, answ => resolve(answ)))
}

function ProcessingData(candysForPlaces) {
    let totalCandys = parseInt(candysForPlaces.apartments, 10) +  parseInt(candysForPlaces.homes, 10) +  parseInt(candysForPlaces.villas, 10);
    let rounds = 0;

    do {
       
        //Candy subtraction
        for (const property in candysForPlaces){
            (candysForPlaces[property] - lessCandys) <= 0 ? candysForPlaces[property] = 0 : candysForPlaces[property] -= lessCandys; //If the property minus the deleted candies, set the property to zero
            
        }

        //Update total
        for (const property in candysForPlaces) {
            totalCandys += candysForPlaces[property];
        }
        
        rounds++;

    } while (candysForPlaces.apartments > 0 || candysForPlaces.homes > 0 || candysForPlaces.villas > 0) // If there is still a value above zero, continue

    return {totalCandys : totalCandys, rounds: rounds}; // returns finals values

}

async function main () {

    //questions for candys of places
    for (const property in candysForPlaces){
        await question("How many candys for " + property + " ?").then( res => {
            if(!res) return console.log("Please enter a value");
            if(isNaN(res)) return console.log("Please enter a number");

            candysForPlaces[property] = res;
        }) 
    }

    await question("how many less candies each round ?").then( res => lessCandys = res);

    readline.close();

    const data = ProcessingData(candysForPlaces);

    //Log results
    console.log("Total number of candies harvested is " + data.totalCandys + " and the total of round is " + data.rounds);

}

main();