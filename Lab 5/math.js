module.exports = (function() {
function doDivision(a, b) {
    return a / b;
}

function stringifyDivision(a, b) {
    return `${a} divided by ${b} is ${doDivision(a, b)}`;
}
return {doDivision: doDivision, stringifyDivision:stringifyDivision};
})();