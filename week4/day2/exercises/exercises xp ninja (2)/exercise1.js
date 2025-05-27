const menu = [
    {
        type: "starter",
        name: "Houmous with Pita",
    },
    {
        type: "starter",
        name: "Vegetable Soup with Houmous peas",
    },
    {
        type: "dessert",
        name: "Chocolate Cake",
    },
];

const oneDessertExists = menu.some((value) => value.type == "dessert");
console.log(oneDessertExists);

// Using an array method, check if all the elements in the array are starters.
const isAllStarters = menu.every((value) => value.type == "starter");
console.log(isAllStarters);

// Using an array method, check if there is at least one element in the array that is a main course. If not, add a main course of your choice to the array.
const hasMainCourse = menu.some((value) => value.type == "main course");
if (!hasMainCourse) {
    menu.push({ type: "main course", name: "Grilled Chicken with Vegetables" });
}

// Using an array method, add a key “vegetarian” (a boolean) to the menu array. The value of the key should be true if the name of the course contains at least one element from the vegetarian array.
const vegetarian = ["vegetable", "houmous", "eggs", "vanilla", "potatoes"];


const menu1 = menu.map((item) => {
    return {
        ...item,
        vegetarian: vegetarian.some((v) => item.name.toLowerCase().includes(v.toLowerCase())),
    };
});
console.log(menu1)
