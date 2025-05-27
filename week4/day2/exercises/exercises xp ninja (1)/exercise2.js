// Clean up this email to have no whitespaces. Do it in a single line (return a new string).
const userEmail3 = ' cannotfillemailformcorrectly@gmail.com '

const trimmedUserEmail3 = userEmail3.split('').filter(char => char != ' ').join('');

console.log(trimmedUserEmail3)