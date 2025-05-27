// Analyze this code, what will be the output ?

[[0, 1], [2, 3]].reduce(
    (acc, cur) => {
        return acc.concat(cur);
    },
    [1, 2],
);

// prediction
// result [1, 2, 0, 1, 2, 3] ✅