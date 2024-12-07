const settings = {
    async: true,
    crossDomain: true,
    url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin&vs_currencies=usd",
    method: "GET",
    headers: { accept: "application/json" },
};

// Function to update prices
function updatePrices() {
    $.ajax(settings)
        .done((response) => {
            document.getElementById("bitcoin").textContent = response.bitcoin.usd.toFixed(2);
            document.getElementById("ethereum").textContent = response.ethereum.usd.toFixed(2);
            document.getElementById("dogecoin").textContent = response.dogecoin.usd.toFixed(4);
        })
        .fail(() => {
            console.error("Error fetching prices.");
            document.getElementById("bitcoin").textContent = "N/A";
            document.getElementById("ethereum").textContent = "N/A";
            document.getElementById("dogecoin").textContent = "N/A";
        });
}

// Toggle language
let lang = "EN";
document.getElementById("lang-btn").addEventListener("click", () => {
    lang = lang === "EN" ? "ES" : "EN";
    document.getElementById("lang-btn").textContent = lang;
    alert("Language switched to: " + lang);
});

// Fetch prices every minute
updatePrices();
setInterval(updatePrices, 60000);
