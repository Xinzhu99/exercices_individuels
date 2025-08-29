const anwser = ["red", "green"];
const colors = ["red", "green", "black", "blue"];

const proposition = ["black", "red"];

function checkColor(proposition) {
    for (const item of proposition) {
        if (!colors.includes(item)) {
            return false;
        }
    }
    return true;
}



function checkCombinaition(proposition) {
    let rightElementsTotal = 0;
    let wrongOrder = 0;

    for (const item of proposition) {
        if (anwser.includes(item)) {
            wrongOrder += 1;
        }
    }

    for (let i = 0; i < proposition.length; i++) {
        if (proposition[i] === anwser[i]) {
            rightElementsTotal += 1
        }

    }
    return [rightElementsTotal, wrongOrder]
}

function playGame() {
    if (!checkColor(proposition)) {
        return "Please only select colors from our range."
    } else {
        let i = 0;
        let result = [anwser.length, 0];
        for (let i = 0; i <= 12; i++) {
            if (checkCombinaition() === result) {
                return "You win!"
            } else {
                //changement de la valeur de la variable proposition
                checkCombinaition()
            }
        }
        return "You've tried 12 times, game over! Loser!"

    }

}
playGame();