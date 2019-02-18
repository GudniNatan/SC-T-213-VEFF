function reverseArray(array){
    if (typeof(array.length) == "undefined"){
        return null;
    }
    for (var index = 0; index < array.length / 2; index++) {
        var front_item = array[index];
        array[index] = array[array.length - index - 1];
        array[array.length - index - 1] = front_item;
    }
    return array;
}

function seperateString(string){
    var index = string.indexOf(" ");
    if (index == -1)
    {
        return [string];
    }
    return [string.substr(0, index)].concat(
        seperateString(string.substr(index + 1))
    );
}