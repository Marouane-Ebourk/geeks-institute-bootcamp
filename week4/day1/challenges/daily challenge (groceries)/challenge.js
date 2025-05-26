let client = "John";

const groceries = {
    fruits: ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice: "20$",
    other: {
        paid: true,
        meansOfPayment: ["cash", "creditCard"],
    },
};


const displayGroceries = () => {
    groceries.fruits.forEach((fruit) => {
        console.log(fruit);
    });
}
displayGroceries();

const cloneGroceries = () => {
    let user = client;
    client = "Betty";
    console.log("User:", user);
    // Change the client variable to “Betty”. Will we also see this modification in the user variable ? Why ?
    // No, because user is a copy of the value of client at the time of assignment, not a reference to the variable itself.

    let shopping = groceries;
    shopping.totalPrice = "35$";
    console.log("Shopping total price:", shopping.totalPrice);
    // Change the value of the totalPrice key to 35$. Will we also see this modification in the shopping object ? Why ?
    // Yes, because shopping is a reference to the same object as groceries, so changes to the object will be reflected in both variables.

    shopping.other.paid = false;
    console.log("Shopping paid status:", shopping.other.paid);
    // Change the value of the paid key to false. Will we also see this modification in the shopping object ? Why ?
    // Yes, because the other key in shopping is a reference to the same object as groceries.other, so changes to that object will be reflected in both variables.
}

// Invoke the cloneGroceries function.
cloneGroceries();