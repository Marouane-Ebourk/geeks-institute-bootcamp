// Using the Dog class below:

class Dog {
    constructor(name) {
        this.name = name;
    }
}

// this option is the one that will extend Dog class successfully:

// 2
class Labrador extends Dog {
    constructor(name, size) {
        super(name);
        this.size = size;
    }
}
