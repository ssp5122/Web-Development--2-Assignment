const form = document.querySelector("#form");
const cityInput = document.querySelector("#city");
const info = document.querySelector(".info");
const historyDiv = document.querySelector(".historyBtn");
const consoleBox = document.querySelector(".console");
const searchBtn = document.querySelector("#searchBtn");

const STORAGE_KEY = "a2-weather-history";
const weatherSamples = {
    mumbai: { temp: "29.4 C", weather: "Humid clouds", humidity: "74%", wind: "4.8 m/s" },
    delhi: { temp: "31.1 C", weather: "Haze", humidity: "42%", wind: "3.4 m/s" },
    london: { temp: "14.8 C", weather: "Light rain", humidity: "81%", wind: "6.2 m/s" },
    tokyo: { temp: "20.7 C", weather: "Clear night", humidity: "58%", wind: "2.9 m/s" },
    sydney: { temp: "18.3 C", weather: "Breezy", humidity: "64%", wind: "7.1 m/s" }
};

let history = loadHistory();

function log(message, tone = "") {
    const line = document.createElement("div");
    line.textContent = message;
    if (tone) {
        line.className = tone;
    }
    consoleBox.appendChild(line);
    consoleBox.scrollTop = consoleBox.scrollHeight;
}

function normalizeCity(city) {
    return city.trim().replace(/\s+/g, " ");
}

function titleCase(value) {
    return value
        .split(" ")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

function loadHistory() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function saveHistory() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 6)));
}

function setLoading(isLoading) {
    searchBtn.disabled = isLoading;
    searchBtn.textContent = isLoading ? "Searching..." : "Search";
}

function setStatus(text) {
    const statusText = document.querySelector("#statusText");
    if (statusText) {
        statusText.textContent = text;
    }
}

function fetchWeather(city) {
    log("Sync: submit handler started");

    return new Promise((resolve, reject) => {
        log("Promise: async weather request created");

        setTimeout(() => {
            log("Macrotask: setTimeout callback running", "muted");
            const sample = weatherSamples[city.toLowerCase()];

            if (!sample) {
                reject(new Error("No sample weather found for this city. Try Mumbai, Delhi, London, Tokyo or Sydney."));
                return;
            }

            resolve({
                city: titleCase(city),
                updatedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                ...sample
            });
        }, 900);

        log("Sync: setTimeout registered");
    });
}

function displayWeather(data) {
    info.innerHTML = `
        <div class="panel-heading">
            <span>Weather Info</span>
            <small id="statusText">Updated</small>
        </div>
        <div class="weather-card">
            <div class="weather-main">
                <div>
                    <h2 class="city-name">${data.city}</h2>
                    <p class="condition">${data.weather} - ${data.updatedAt}</p>
                </div>
                <div class="temp">${data.temp}</div>
            </div>
            <div class="weather-grid">
                <div class="metric">
                    <span>Humidity</span>
                    <strong>${data.humidity}</strong>
                </div>
                <div class="metric">
                    <span>Wind</span>
                    <strong>${data.wind}</strong>
                </div>
                <div class="metric">
                    <span>Source</span>
                    <strong>Mock API</strong>
                </div>
            </div>
        </div>
    `;
}

function displayError(message) {
    info.innerHTML = `
        <div class="panel-heading">
            <span>Weather Info</span>
            <small id="statusText">Error</small>
        </div>
        <div class="empty-state">
            <strong class="error-text">Search failed</strong>
            <span>${message}</span>
        </div>
    `;
}

function renderHistory() {
    historyDiv.innerHTML = "";

    if (history.length === 0) {
        const empty = document.createElement("span");
        empty.className = "history-empty";
        empty.textContent = "No searches yet";
        historyDiv.appendChild(empty);
        return;
    }

    history.forEach((city) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = city;

        btn.addEventListener("click", () => {
            cityInput.value = city;
            form.requestSubmit();
        });

        historyDiv.appendChild(btn);
    });
}

function addHistory(city) {
    history = [city, ...history.filter((item) => item.toLowerCase() !== city.toLowerCase())].slice(0, 6);
    saveHistory();
    renderHistory();
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = normalizeCity(cityInput.value);
    consoleBox.innerHTML = "";

    if (!city) {
        displayError("Please enter a city name.");
        log("Validation: empty city rejected");
        return;
    }

    setLoading(true);
    setStatus("Loading");

    try {
        const data = await fetchWeather(city);
        log("Microtask: promise resolved after await", "muted");
        displayWeather(data);
        addHistory(data.city);
        log("Async: weather data rendered");
    } catch (error) {
        displayError(error.message);
        log(`Error: ${error.message}`);
    } finally {
        setLoading(false);
    }
});

renderHistory();
log("Ready: enter a city to begin", "muted");
