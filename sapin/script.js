// function printStar(n){
//     let arr = ["/"];
//     for (let i=0;i<n;i++){
//         arr.push("*");
//         //console.log(arr)
//     };
//     console.log(arr.join(""));
// };
// printStar(5);

// function printRectangular(height, width){
     
//     for(let i=0;i<height;i++){
//         printStar(width)
//     }
// }
// //printRectangular(5,5);

function printRightTriangle(width){
    let arr = ["\\"];
    for (let i=0;i<width;i++){
        console.log(arr.join(""));   
        arr.shift("*")                     //!.unshift permet d'ajouter des éléments au début d'un array/ 
    };
};

printRightTriangle(3);

function printArr(width){
    let arr=[];
    for(let i =0;i<width-1;i++){
        arr.push(" ");
    }
    arr.push("/")
    return(arr)
}

function printLeftTriangle(width){
    let arr = printArr(width);
    for (let i=0;i<width;i++){
        console.log(arr.join(""));
        (arr.push("*"), arr.shift());
    }
};

function printFirtree(width){
    printLeftTriangle(width);
    printRightTriangle(width);

}
