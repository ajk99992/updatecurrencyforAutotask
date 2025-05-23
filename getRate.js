const axios = require("axios");

const API_URL = "https://api.exchangerate.host/live?access_key=ce3a5ec63b159b8b1f44b0a452b9b774";

async function getUSDCADRate() {
    try {
        const response = await axios.get(API_URL);
        const rate = response.data.quotes?.USDCAD;

        if (!rate) {
            throw new Error("USDCAD rate not found in response.");
        }

        return rate; // <-- Return instead of console.log
    } catch (error) {
        throw new Error(`Failed to fetch exchange rate: ${error.message}`);
    }
}

module.exports = { getUSDCADRate }; // <-- fixed typo here ("module")
