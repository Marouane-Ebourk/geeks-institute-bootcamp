const makeJuice = (size) => {
    const ingredients = [];

    const addIngredients = (ingredient1, ingredient2, ingredient3) => {
        ingredients.push(ingredient1, ingredient2, ingredient3);
    };

    const displayJuice = () => {
        console.log(`The client wants a ${size} juice, containing ${ingredients.join(', ')}.`);
    };

    // Add ingredients twice
    addIngredients('apple', 'banana', 'orange');
    addIngredients('carrot', 'spinach', 'ginger');

    // Display the juice
    displayJuice();
}

// Invoke the outer function
makeJuice('medium');