// Exercise 1: Landscape
let landscape = function () {
    let result = "";

    let flat = function (x) {
        for (let count = 0; count < x; count++) {
            result = result + "_";
        }
    };

    let mountain = function (x) {
        result = result + "/";
        for (let counter = 0; counter < x; counter++) {
            result = result + "'";
        }
        result = result + "\\";
    };

    flat(4);
    mountain(4);
    flat(4);

    return result;
};

landscape();

// prediction :
// result = "____/''''\____"
// the first call flat(4) would add 4 underscores to result
// the mountain(4) added to result at first the char '/' and then 4 mountain tops and then one '\'
// the second call flat(4) added another 4 underscores to result

// arrow function version
let landscape = () => {
    let result = "";

    let flat = (x) => {
        for (let count = 0; count < x; count++) {
            result += "_";
        }
    };

    let mountain = (x) => {
        result += "/";
        for (let counter = 0; counter < x; counter++) {
            result += "'";
        }
        result += "\\";
    };

    flat(4);
    mountain(4);
    flat(4);

    return result;
};
