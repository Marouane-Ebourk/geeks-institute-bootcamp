// API CONFIG
const API_KEY = "08b8ee1c39ddfd3649c16f9a"; 
const BASE_URL = "https://v6.exchangerate-api.com/v6/" + API_KEY;

// DOM Elements
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const form = document.getElementById("converter-form");
const resultDiv = document.getElementById("result");
const switchBtn = document.getElementById("switch-btn");

// Fetch Supported Currencies
async function fetchCurrencies() {
    try {
        const res = await fetch(`${BASE_URL}/codes`);
        const data = await res.json();
        if (data.result === "success") {
            populateCurrencyOptions(data.supported_codes);
        } else {
            throw new Error("Failed to fetch currencies");
        }
    } catch (err) {
        fromCurrency.innerHTML = toCurrency.innerHTML =
            "<option>Error loading currencies</option>";
    }
}

function populateCurrencyOptions(codes) {
    fromCurrency.innerHTML = "";
    toCurrency.innerHTML = "";
    codes.forEach(([code, name]) => {
        const option1 = document.createElement("option");
        option1.value = code;
        option1.textContent = `${code} - ${name}`;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = code;
        option2.textContent = `${code} - ${name}`;
        toCurrency.appendChild(option2);
    });
    // Set defaults
    fromCurrency.value = "USD";
    toCurrency.value = "MAD";
}

// Fetch Conversion
async function fetchConversion(from, to, amount) {
    resultDiv.textContent = "Converting...";
    try {
        const res = await fetch(`${BASE_URL}/pair/${from}/${to}/${amount}`);
        const data = await res.json();
        if (data.result === "success") {
            resultDiv.textContent = `${amount} ${from} = ${data.conversion_result} ${to}`;
        } else {
            resultDiv.textContent = "Conversion failed. Try again.";
        }
    } catch (err) {
        resultDiv.textContent = "Error fetching conversion.";
    }
}

// Form Submit Handler
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amount = parseFloat(amountInput.value);
    if (from && to && amount > 0) {
        fetchConversion(from, to, amount);
    } else {
        resultDiv.textContent = "Please enter valid data.";
    }
});

// Switch Button Handler
switchBtn.addEventListener("click", function () {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    // Trigger conversion if amount is filled
    if (amountInput.value) {
        form.dispatchEvent(new Event("submit"));
    }
});

fetchCurrencies();
