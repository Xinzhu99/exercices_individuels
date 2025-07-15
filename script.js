import { latinToMorse } from "./object_latin.js";
import { morseToLatin } from "./object_morse.js";

const latinInput = document.querySelector("#latinInput");
const morseInput = document.querySelector("#morseInput");
const translateToMorse = document.querySelector("#translateToMorse");
const translateToLatin = document.querySelector("#translateToLatin");
const morseOutput = document.querySelector("#morseOutput");
const latinOutput = document.querySelector("#latinOutput");


// function getLatinCharacterList(string) {
//     return string.split("");
// };

function translateLatinCharacter(letter) {
    return latinToMorse[letter];                                                                                //! .letter n'est pas reconnu car letter n'est pas une clé de l'objet, [] = .letter
};

function encode(text) {

    let filteredText = text.replace(/[\p{P}$+<=>^`|~\s]/gu, "").toUpperCase().split("");                        //! .replace("A","B"): remplacer les éléments d'un array. ici on veut supprimer les ponctuations et espace
    // let spacelessText = filteredText.replace(" ","")
    let morseStr = '';
    for (const item of filteredText) {
        morseStr += translateLatinCharacter(item) + "/";
        // morseStr += ' ';
    };
    morseOutput.innerText = morseStr;
};


translateToMorse.addEventListener("click", () => {
    encode(latinInput.value);
});



function getMorseCharacterList(string) {
    return string.split("/");
};

function translateMorseCharacter(string) {
    return morseToLatin[string];
};

function decode(string) {
    let morseArr = getMorseCharacterList(string);
    let latinStr = "";
    for (const item of morseArr) {
        latinStr += translateMorseCharacter(item) + " ";
    }
    latinOutput.innerHTML = latinStr;
};
//console.log(decode("-.-/--/-..."))
translateToLatin.addEventListener("click", () => {
    decode(morseInput.value);
});