/*Étape 1

    Créer une fonction qui demande un nombre à l’utilisateur à l’aide d’un prompteur. (Attention tous les compilateurs en ligne ne permettent pas la prise d’input, prendre celui dans l’énoncé si besoin).
    Stocker sa réponse dans une variable de type adéquat nommée givenNumber.
*/

//on peut mettre les deux lignes en dessus dans une seule ligne: return = givenNumber xxx

// Etape 2
// function didIWin(givenNumber){
//     if (givenNumber ==22){
//         return("Bravo ! Vous avez deviné le nombre.")
//     }else if(givenNumber<22){
//         return("Plus grand")
//     }else if (givenNumber>22) {
//         return("Plus petit")
//     }
// }
//c'est quoi une alert

//Etape 3
/* 
    Désormais la fonction didIWin devra retourner true si l’utilisateur a trouvé le chiffre, false sinon.
    Dans la fonction gamePlay, si didIWin a retourné true, on arrete le jeu. En revanche, si elle a retourné false, 
    on redemande un chiffre à l’utilisateur.
*/
function askNumber(){
   let givenNumber = prompt("What is your number?") 
//prompt("text") permet d'afficher un pop up avec un text
   return givenNumber
}
function didIWin(number){
    if (number ==22){
        return true 
    }else {
        return false 
    }
}
function gamePlay(){
    let number = askNumber()
    let result = didIWin(number) 
    while (result==false){
        let userNumber=askNumber()
        result=didIWin(userNumber)
    }
    alert ("Bravo")
}
alert(gamePlay())

//leçon!!!! : quand on appelle pas ou ne stock pas la valeur d"une fonction, ça sert a rien 