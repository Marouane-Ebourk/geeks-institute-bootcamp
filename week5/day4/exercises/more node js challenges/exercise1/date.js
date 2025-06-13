function getTimeUntilJanFirst() {
    const now = new Date();
    const nextYear = now.getFullYear() + 1;
    const jan1 = new Date(nextYear, 0, 1, 0, 0, 0, 0);
    const diffMs = jan1 - now;

    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `The 1st January is in ${days} days and ${hours}:${formattedMinutes}:${formattedSeconds} hours`;
}

module.exports = { getTimeUntilJanFirst };
