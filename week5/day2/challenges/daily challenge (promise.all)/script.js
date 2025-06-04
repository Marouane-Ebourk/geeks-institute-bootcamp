const form = document.getElementById("city-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const lat1 = document.getElementById("lat1").value;
    const lon1 = document.getElementById("lon1").value;
    const lat2 = document.getElementById("lat2").value;
    const lon2 = document.getElementById("lon2").value;

    const getSunrise = (lat, lon) =>
        fetch(
            `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`
        )
            .then((res) => res.json())
            .then((data) => data.results.sunrise);

    try {
        const [sunrise1, sunrise2] = await Promise.all([
            getSunrise(lat1, lon1),
            getSunrise(lat2, lon2),
        ]);

        console.log("sunrises", sunrise1, sunrise2);
        const hour1 = new Date(sunrise1).getUTCHours();
        const hour2 = new Date(sunrise2).getUTCHours();

        // Remove previous result if exists
        let resultDiv = document.getElementById("result");
        if (resultDiv) resultDiv.remove();

        resultDiv = document.createElement("div");
        resultDiv.id = "result";
        resultDiv.innerHTML = `
            <p>First City Sunrise Hour : <strong>${hour1}</strong></p>
            <p>Second City Sunrise Hour : <strong>${hour2}</strong></p>`;

        form.after(resultDiv);
    } catch (err) {
        alert("Failed to fetch sunrise data. Please check your input.");
    }
});
