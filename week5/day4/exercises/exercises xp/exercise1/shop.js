const { products } = require("./products");

// Create a function that takes a product name as a parameter and searches for the corresponding product object.
function getProductObject(name) {
    for (let product of products) {
        if (name.toLowerCase() == product.name.toLowerCase())
            return product
    }
    return null
}

console.log(getProductObject("Laptop"))
console.log(getProductObject("book"))
console.log(getProductObject("t-shirt"))
