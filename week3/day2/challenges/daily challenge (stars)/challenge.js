//* * * * * *

for ( let i = 1; i <= 6; i ++ ) {
    console.log("*".repeat(i))
}

for ( let stars = 1; stars <= 6; stars ++ )  {
    line = ""
    for (let star = 1; star <= stars; star ++) {
        line += "*"
    }
    console.log(line)
}
