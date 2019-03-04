function reverseArray(array) {
    if (typeof (array.length) == "undefined") {
        return null;
    }
    for (var index = 0; index < array.length / 2; index++) {
        var front_item = array[index];
        array[index] = array[array.length - index - 1];
        array[array.length - index - 1] = front_item;
    }
    return array;
}

function seperateString(string) {
    var index = string.indexOf(" ");
    if (index == -1) {
        return [string];
    }
    return [string.substr(0, index)].concat(
        seperateString(string.substr(index + 1))
    );
}

function checkDiagonality(matrix) {
    if (typeof (matrix) !== 'object') {
        return false;
    }
    try {
        for (let index = 0; index < matrix.length; index++) {
            const row = matrix[index];
            if (row.length !== matrix.length) {
                return false;
            }
            for (let row_index = 0; row_index < row.length; row_index++) {
                const element = row[row_index];
                if (index !== row_index && element !== 0) {
                    return false;
                }
            }
        }
    } catch (err) {
        return false;
    }
    return true;
}

function doPythagoras(a, b) {
    let cSquare = a * a + b * b;
    return Math.sqrt(cSquare);
}

function radiusCalculation(circle, point) {
    if (circle === undefined || point === undefined) {
        return false;
    }
    let dist = doPythagoras(circle.center.x - point.x, circle.center.y - point.y);
    return dist <= circle.radius;
}