/* 
Write a function that converts HEX to RGB.

Then Make that function auto-detect the formats so that if you enter HEX color format it returns RGB and if you enter RGB color format it returns HEX.
*/

function colorConvert(colorCode) {
    if (colorCode.startsWith("#")) {
        const r = parseInt(colorCode.slice(1, 3), 16);
        const g = parseInt(colorCode.slice(3, 5), 16);
        const b = parseInt(colorCode.slice(5, 7), 16);

        return `rgb(${r}, ${g}, ${b})`;
    }
    if (colorCode.startsWith("rgb")) {
        // rgb(255, 0, 0)
        const rgbValues = colorCode.match(/\d+/g);
        if (rgbValues && rgbValues.length === 3) {
            const r = parseInt(rgbValues[0]).toString(16).padStart(2, '0');
            const g = parseInt(rgbValues[1]).toString(16).padStart(2, '0');
            const b = parseInt(rgbValues[2]).toString(16).padStart(2, '0');

            return `#${r}${g}${b}`;
        }
    }
}

console.log(colorConvert("#ffffff"));
console.log(colorConvert("rgb(255, 255, 255)"));
console.log(colorConvert("#000000"));
console.log(colorConvert("rgb(0, 0, 0)"));
