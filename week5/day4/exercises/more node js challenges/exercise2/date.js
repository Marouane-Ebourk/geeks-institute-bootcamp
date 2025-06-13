function getMinutesLived(birthdateStr) {
    const birthdate = new Date(birthdateStr);
    console.log(`Birthdate: ${birthdate.toLocaleDateString()}`);
    const now = new Date();
    const diffMs = now - birthdate;
    const minutes = Math.floor(diffMs / (1000 * 60));
    return minutes;
}


module.exports = {
    getMinutesLived,
};
