function add(numbers) {

    //Convert numbers to string
    numbers= String(numbers || "");

    numbers = numbers.replace(/\\n/g, '\n');

    let delimiter = /,|\n/;
    if (numbers.startsWith("//")) {
        const delimiterMatch = numbers.match(/^\/\/(.+)\n/);
        delimiter = new RegExp(delimiterMatch[1]);
        numbers = numbers.substring(numbers.indexOf("\n") + 1);
    }

    const numberList = numbers.split(delimiter).map(Number);
    const ngtvNum = numberList.filter(n => n < 0);

    if (ngtvNum.length > 0) {
        throw new Error(`Negative numbers not allowed-> ${ngtvNum.join(", ")}`);
    }

    return numberList.reduce((sum, n) => sum + (isNaN(n) ? 0 : n), 0);
}

function calculate() {

    const str = document.getElementById('inpStr').value;
    const rslt = document.getElementById('result');
    const err = document.getElementById('error');
    const hstr = document.getElementById('history');

    try {
        const result = add(str);
        rslt.innerHTML = `Result: ${result}`;
        hstr.innerHTML+= `${result}; `
    } catch (error) {
        err.innerHTML = error.message;
    }
}

// iife to check if script attached
(function () {console.log("Scripts loaded");})()


//Test cases
// console.log(add(""));            // 0
// console.log(add("1"));           // 1
// console.log(add("1,2,3"));       // 6
// console.log(add("1\n2,3\n4"));   // 10
// console.log(add("//;\n1;2"));    // 3
// console.log(add("//;\n1;-22"));     // Error: negative numbers not allowed: -22



const clearText= ()=> {
    document.getElementById('inpStr').value='';
    document.getElementById('result').innerHTML='';
    document.getElementById('error').innerHTML='';
    document.getElementById('history').innerHTML='History: ';

}