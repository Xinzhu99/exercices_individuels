/*

    Afficher le range (0-50) auquel notre utilisateur à le droit autour du champ. Quelque chose comme 0 < ? < 50.
    Si l’utilisateur a gagné nous effacerons tout pour afficher notre message de bravo !
    En revanche, tant que l’utilisateur n’a pas trouvé le bon chiffre, on affichera le nombre de tentatives en cours sur la partie.
    Ajouter un champ input qui permet à l’utilisateur de rentrer sa proposition de nombre directement dans un champ sur la page avec un bouton valider.

*/
function giveGuessNumber(){
    let numberToGuess = prompt("Give the number to guess")
    return numberToGuess
}
function verifiedGuessNumber(){
    let numberToGuess = giveGuessNumber()
    while(numberToGuess<0 || numberToGuess>50){
        numberToGuess=giveGuessNumber()
    }
    return numberToGuess
}
// alert(verifiedGuessNumber())
function askNumber(){
   let givenNumber = prompt("What is your number?") 
   return givenNumber
}
function didIWin(number1,number2){
    if (number1 ==number2){
        return true 
    }else {
        return false 
    }
}

function gamePlay(){
    let verifiedNumber = verifiedGuessNumber()
    let givenNumber = askNumber()//on récupère le givennumber
    let result = didIWin(verifiedNumber,givenNumber) //on récupère un true ou false
//objectif de notre jeu : tant que l'utilisateur n'a pas trouvé le chiffre 22, on relance le prompt et la vérification, donc il nous faut une boucle while
    while (result==false){
            givenNumber=askNumber()//on attribue une nouvelle valeur
            result=didIWin(verifiedNumber,givenNumber)
        }
        alert ("Bravo")
}
gamePlay()//alert s'utilise comme console.log mais pour afficher dans la navigateur
