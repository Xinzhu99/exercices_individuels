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
// function askNumber(){
//    let givenNumber = prompt("What is your number?") 
// //prompt("text") permet d'afficher un pop up avec un text
//    return givenNumber
// }
// alert(askNumber())
// // function didIWin(number){
// //     if (number ==22){
// //         return true 
// //     }else {
// //         return false 
// //     }
// // }
// function gamePlay(){
// // on doit récupérer d'abord les résultats de return des deux fonctions déjà créees
//     let number = askNumber()//on récupère le givennumber
//     let result = didIWin(number) //on récupère un true ou false
// //objectif de notre jeu : tant que l'utilisateur n'a pas trouvé le chiffre 22, on relance le prompt et la vérification, donc il nous faut une boucle while
//     while (result==false){//à ne pas confondre avec le = 
//         if (number <22){
//             alert("Plus grand")
//             number= askNumber()
//             result=didIWin(number)
//         }
//         else if(number >22){
//             alert("Plus petit")
//             number= askNumber()
//             result=didIWin(number)
//         }
//     }
//     alert ("Bravo")
// }
// alert(gamePlay())//alert s'utilise comme console.log mais pour afficher dans la navigateur

//leçon!!!! : quand on appelle pas ou ne stock pas la valeur d"une fonction, ça sert a rien 

//ETAPE4:
// Maintenant on va considérer que l’on a pas un seul joueur mais 2 🧑‍🤝‍🧑.
// Créer une fonction qui demande au joueur 1 de fournir un nombre à deviner compris entre 0 et 50 
// tant qu’il ne respecte pas ce range.
// La fonction didIWin doit prendre désormais un autre paramètre, le nombre à deviner.
// Reprenez la logique 1, 2 et 3 pour gérer la partie et lui indiquer s’il doit continuer à jouer ou s’il a gagné.
function askNumber(){
   let givenNumber = prompt("What is your number?") 
   return givenNumber
}
function giveGuessNumber(){
    let numberToGuess = prompt("Give the number to guess")
    return numberToGuess
}
function verifyGuessNumber(){
    let number = giveGuessNumber()
    while(number<0 || number>50){
        number=giveGuessNumber()
    }
    return number
}
alert(verifyGuessNumber())
// function didIWin(number1,number2){
//     if (number1 ==number2){
//         return true 
//     }else {
//         return false 
//     }
// }

