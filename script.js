const settings = {
    async: true,
    crossDomain: true,
    url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin&vs_currencies=usd",
    method: "GET",
    headers: { accept: "application/json" },
};

let cachedData = null; // Cache data here
let lastUpdated = null; // Track the last update time

function updatePrices() {
    if (lastUpdated && Date.now() - lastUpdated < 300000) {
        console.log("Using cached data"); // Use cached data for 5 minutes
        displayPrices(cachedData);
        return;
    }

    $.ajax(settings)
        .done(function (response) {
            cachedData = response; // Cache the response
            lastUpdated = Date.now(); // Update timestamp
            displayPrices(response);
        })
        .fail(function (error) {
            console.error("API Error:", error);
            alert("Rate limit exceeded. Please wait before trying again.");
        });
}

function displayPrices(data) {
    document.getElementById("bitcoin").innerHTML = data.bitcoin?.usd?.toFixed(2) || "N/A";
    document.getElementById("ethereum").innerHTML = data.ethereum?.usd?.toFixed(2) || "N/A";
    document.getElementById("dogecoin").innerHTML = data.dogecoin?.usd?.toFixed(4) || "N/A";
}

// Call the API every 5 minutes
updatePrices();
setInterval(updatePrices, 300000);
