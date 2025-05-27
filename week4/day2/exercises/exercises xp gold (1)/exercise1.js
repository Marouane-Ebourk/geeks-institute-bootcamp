// Analyze this code, what will be the output ?

[1, 2, 3].map((num) => {
    if (typeof num === "number") return num * 2;
    return;
});

// prediction
// [2, 4, 6] ✅
