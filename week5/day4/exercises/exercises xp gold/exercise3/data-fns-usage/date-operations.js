const dateFns = require("date-fns");

function getDateFormatted() {
    const now = new Date();
    const futureDate = dateFns.addDays(now, 5);
    const formattedDate = dateFns.format(futureDate, "yyyy-MM-dd HH:mm:ss");
    console.log(formattedDate);
}


module.exports = {getDateFormatted}