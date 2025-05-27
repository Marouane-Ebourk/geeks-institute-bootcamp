const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
colors.forEach((value, index) => console.log(`${index+1}# choice is ${value}`))


// Check if at least one element of the array is equal to the value “Violet”. If yes, console.log("Yeah"), else console.log("No...")
if (colors.some((value)=>value === "Violet"))
    console.log("Yeah")
else 
    console.log("No...")

