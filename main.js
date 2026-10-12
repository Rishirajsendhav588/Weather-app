
let h1 = document.querySelector("h1");
let h2 = document.querySelector("h2");
let p = document.querySelector("p");
let img = document.querySelector("img");
let input = document.querySelector("input");
let form = document.querySelector("form");
let card = document.querySelector("#card");
let weatherApp = document.querySelector("#weatherApp");

const fetchWeather = async (e) => {
    e.preventDefault();

    let city = input.value.trim();

    if (city === "") {
        alert("Please enter city name!");
        return;
    }

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${encodeURIComponent(city)}&aqi=yes`
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.error.message);
            return;
        }

        // Temperature show karna
        h1.innerText = data.current.temp_c + "°C";

        // City name show karna
        h2.innerText = data.location.name;

        // Weather condition show karna
        p.innerText = data.current.condition.text;

        // Weather icon show karna
        img.src = "https:" + data.current.condition.icon;

        // Card show karna
        card.className =
            "p-8 rounded-lg bg-white flex items-center justify-between w-full md:w-1/2";

        // Background change karna
        let condition =
            data.current.condition.text.toLowerCase();

        if (
            condition.includes("rain") ||
            condition.includes("drizzle") ||
            condition.includes("thunder")
        ) {
            weatherApp.style.background =
                "linear-gradient(135deg, #334155, #64748b)";

        } else if (
            condition.includes("cloud") ||
            condition.includes("overcast") ||
            condition.includes("fog") ||
            condition.includes("mist")
        ) {
            weatherApp.style.background =
                "linear-gradient(135deg, #94a3b8, #cbd5e1)";

        } else if (data.current.temp_c >= 35) {
            weatherApp.style.background =
                "linear-gradient(135deg, #f97316, #facc15)";

        } else if (
            condition.includes("sun") ||
            condition.includes("clear")
        ) {
            weatherApp.style.background =
                "linear-gradient(135deg, #38bdf8, #fde68a)";

        } else {
            weatherApp.style.background =
                "linear-gradient(135deg, #60a5fa, #c4b5fd)";
        }

        form.reset();

    } catch (error) {
        console.log(error);
        alert("Weather load nahi hua. Internet aur API key check karo.");
    }
};

form.addEventListener("submit", fetchWeather);