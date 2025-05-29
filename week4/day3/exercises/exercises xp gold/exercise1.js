function printFullName(userObject) {
    const {first, last} = userObject
    return `Your full name is ${first} ${last}`
}

console.log(printFullName({first: 'Elie', last:'Schoppik'}))
// 'Your full name is Elie Schoppik`