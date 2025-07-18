/*Etape 1*/
function maxDaysInMonth(month, year) {
    // if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
    if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {                                                                                //!arr.includes() => vérifier si () contient des éléments dans le array et retourner TRUE ou FALSE
        return 31;
    };
    if ([4, 6, 9, 11].includes(month)) {
        return 30;
    };
    if (month === 2 && year % 4 === 0) {
        return 29;
    } else {
        return 28;
    };
};

function isValidDate(dateStr) {
    const match = /^(\d{2})[/](\d{2})[/](\d{4})$/.exec(dateStr);
    if (!match) {
        return false;
    }
    const month = parseInt(match[2], 10);
    if (month > 12 || month < 1) {
        return false;
    };
    const day = parseInt(match[1], 10);
    const year = parseInt(match[3], 10);
    let maxDay = maxDaysInMonth(month, year);
    if (day > maxDay) {
        return false;
    };
    return true;
};
console.log(isValidDate("29/02/2002"));
console.log(isValidDate("29/02/20é2"));
console.log(isValidDate("29/02/2024"));

/*etape 2*/
function isPalindrome(dateStr) {
    const dateInNr = dateStr.replaceAll('/', '');
    // return dateInNr
    let newDate = "";
    for (let i = dateInNr.length - 1; i >= 0; i--) {
        newDate += dateInNr[i];
    };
    if (newDate === dateInNr) {
        return true;
    } else {
        return false
    };
};

console.log(isPalindrome("11/02/2011"));
console.log(isPalindrome("03/04/2001"));
console.log(isPalindrome("23/02/2032"));

/*etape 3*/
// function getNextPalindromes() {

//     let yearNr = 2030;
//     let index = 0;
//     let result = [];

//     while(index<3) {
//         let year = yearNr.toString()
//         let reverseYear = year.split("").reverse().join("");
//         let date = reverseYear + year;
//         // console.log("combinedDate", date);
//         let newDate = date.slice(0, 2) + "/" + date.slice(2, 4) + "/" + date.slice(4);
//         console.log("newdate",newDate);
//         console.log(isPalindrome(newDate))
//         if (isValidDate(newDate)===true && isPalindrome(newDate) === true) {
//             result.push(newDate);
//             index++
//             yearNr++
//         };
//     };
//     return result;

console.log(getNextPalindromes());