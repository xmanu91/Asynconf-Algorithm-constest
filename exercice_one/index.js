//Equivalent of Scanner in Java of NodeJs
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

try{
    readline.question("What is your encoded formula ? \n", EncodedFormula => {
        console.log('The decoded formula is "' + reformAlphabet(decodeFormula(EncodedFormula)) + '"');
        readline.close();
    });
}catch (err) {
    console.error(err)
}

const decodeFormula = (EncodedFormula) => {
    return (new Buffer.from(EncodedFormula, "base64").toString('utf-8'));
};

const reformAlphabet = (formula) => {
    let sentence = "";
    const specialCharacters = " .!@#$%^&*()_+-=ç',’èé|`^[]{}àëêùô/£¤î";

    for(char of formula) {
        
        if(!specialCharacters.includes(char)){
            let code = char.charCodeAt(0); //get code fro character
            code -= 2; //move the letter to the code
            sentence += String.fromCharCode(code); //get character from code
        }
        else{
            sentence += char;
        }
        
    }
    
    return sentence;
};

