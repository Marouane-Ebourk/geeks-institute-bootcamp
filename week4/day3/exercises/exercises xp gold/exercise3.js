// Analyze the code below, what will be the output?
class Counter {
    constructor() {
        this.count = 0;
    }

    increment() {
        this.count++;
    }
}

const counterOne = new Counter();
counterOne.increment();
counterOne.increment();

const counterTwo = counterOne;
counterTwo.increment();

console.log(counterOne.count);

// prediction:
// 3 because counterTwo has a reference to counterOne 
// so when we ran counterTwo.increment(); it added one to counterOne.count