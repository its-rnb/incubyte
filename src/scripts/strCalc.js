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
    const negativeNumbers = numberList.filter(n => n < 0);

    if (negativeNumbers.length > 0) {
        throw new Error(`negative numbers not allowed: ${negativeNumbers.join(", ")}`);
    }

    return numberList.reduce((sum, n) => sum + (isNaN(n) ? 0 : n), 0);
}

function calculate() {
    const str = document.getElementById('inpStr').value;
    const rslt = document.getElementById('result');
    const err = document.getElementById('error');

    console.log(rslt);
    rslt.innerHTML = '';
    err.innerHTML = '';
    console.log(rslt);

    try {
        const result = add(str);
        console.log("Try block" +rslt);
        rslt.innerHTML = `Result: ${result}`;
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