function printArr(width){
    let arr=[];
    for(let i =0;i<width-1;i++){
        arr.push(" ");
    }
    arr.push("/")
    console.log(arr.join(""))
}
printArr(5);