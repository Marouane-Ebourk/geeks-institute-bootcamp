// Analyze the code below, what will be the output?
class Bird {
    constructor() {
        console.log("I'm a bird. 🦢");
    }
}

class Flamingo extends Bird {
    constructor() {
        console.log("I'm pink. 🌸");
        super();
    }
}

const pet = new Flamingo();

// prediction:
// I'm pink. 🌸
// I'm a bird. 🦢

// reason:
// it's because when we created a new Flamingo instance it ran its constructor first
// and then it ran super() which is the constructor for Bird (inheritance)

