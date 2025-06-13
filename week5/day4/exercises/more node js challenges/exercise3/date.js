function getNextHolidayInfo() {
    const today = new Date();

    const holidayName = "1st Moharram";
    const holidayDate = new Date(today.getFullYear(), 5, 27);

    if (today > holidayDate) {
        holidayDate.setFullYear(today.getFullYear() + 1);
    }

    const diffMs = holidayDate - today;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const diffSeconds = Math.floor((diffMs / 1000) % 60);

    return {
        today: today.toISOString().slice(0, 10),
        nextHoliday: holidayName,
        holidayDate: holidayDate.toISOString().slice(0, 10),
        timeLeft: {
            days: diffDays,
            hours: diffHours,
            minutes: diffMinutes,
            seconds: diffSeconds
        }
    };
}

module.exports = { getNextHolidayInfo };