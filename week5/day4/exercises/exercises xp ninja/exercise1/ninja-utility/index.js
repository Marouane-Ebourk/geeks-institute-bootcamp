const { Command } = require('commander');
const fetchWeatherData = require('./commands/fetch.js');
const readFile = require('./commands/read.js');
const greet = require('./commands/greet.js');

const program = new Command();

program
    .name('nu')
    .description('A CLI utility with multiple commands')
    .version('1.0.0');

program
    .command('greet <name>')
    .description('Greet a user by name')
    .action(greet);

program
    .command('fetch')
    .description('Fetch weather')
    .action(fetchWeatherData);

program
    .command('read <filepath>')
    .description('Read and display a file')
    .action(readFile);

program.parse(process.argv);