function add(...nums) {
    return nums.reduce((sum, n) => sum + n, 0);
}

function multiply(...nums) {
    return nums.reduce((sum, n) => sum * n, 0);
}

module.exports = { add, multiply };
