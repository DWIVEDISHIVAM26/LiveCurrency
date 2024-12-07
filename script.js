// Update coin prices
var btc = document.getElementById("bitcoin");
var eth = document.getElementById("ethereum");
var doge = document.getElementById("dogecoin");

var settings = {
    async: true,
    crossDomain: true,
    url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin&vs_currencies=usd",
    method: "GET",
    headers: { 'accept': 'application/json' }
};

function updatePrices() {
    $.ajax(settings).done(function (response) {
        btc.innerHTML = response.bitcoin.usd;
        eth.innerHTML = response.ethereum.usd;
        doge.innerHTML = response.dogecoin.usd;
    });
}

// Call price update every minute
setInterval(updatePrices, 60000);
updatePrices();

// Toggle language functionality
var lang = "EN";
document.getElementById("lang-btn").addEventListener("click", function () {
    lang = lang === "EN" ? "ES" : "EN"; // Switch to Spanish (ES) as an example
    this.innerHTML = lang;
    alert("Language changed to: " + lang);
});
