async function displayColorfullMessage() {
    const chalk = (await import('chalk')).default;

    console.log(chalk.blue("Hello") + " World" + chalk.red("!"));
}

module.exports = displayColorfullMessage;
