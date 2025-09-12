function printLeftArr(height){
    let arr=[];
    for(let i =0;i<height-1;i++){
        arr.push(" ");
    }
    arr.push("/");
    return(arr);
};

function firstLine(height){
    let arr=[];
    for (let i=0;i<height;i++){
        arr.push(" ");
    }
    arr.push("+");
    return arr.join("");
};

function printTree(height){
    console.log(firstLine(height));
    let leftArr = printLeftArr(height);
    let rightArr = ["\\"];
    for(let i=0;i<height;i++){
        console.log(leftArr.join("")+"|"+rightArr.join(""));
        leftArr.push("*");
        leftArr.shift();                                          //!.shift : enlever le premier élément du tableau
        rightArr.unshift("*");                                    //!.unshift : ajouter l'élément au début du tableau
    };
};
printTree(6);
