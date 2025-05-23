const axios = require("axios");
const { getUSDCADRate } = require('./getRate');

const AUTOTASK_API_URL = "https://webservices1.autotask.net/atservicesrest/v1.0/Currencies/";
const AUTOTASK_CURRENCY_ID = 1; // Replace with correct ID
//const AUTOTASK_UPDATE_RESOURCE_ID = 12345678; // Replace with your resource/user ID

async function updateExchangeRateInAutotask(exchangeRate) {
     console.log("Exchange rate received:", exchangeRate);
    const payload = {
        id: AUTOTASK_CURRENCY_ID,
        currencyNegativeFormat: "($n)",
        currencyPositiveFormat: "$n",
        description: "Canadian Dollar",
        displaySymbol: 36,
        exchangeRate: exchangeRate,  // Use the parameter here
        isActive: true,
        isInternalCurrency: false,
        name: "CAD",
        updateResourceId: 30705858
    };

    try {
        const response = await axios.patch(AUTOTASK_API_URL, payload, {
            headers: {
                "Content-Type": "application/json",
                "ApiIntegrationCode": "DTIJNZTCUIOBUE3RJSHOTVNJ57P",
                "UserName": "msnsd4oxrlsutly@NGENUITY.CA",
                "Secret": "Mo5*3E$nW~x6tR1@#9zX8eH$#",
            }
        });

        console.log("Exchange rate updated successfully:", response.data);
    } catch (error) {
        console.error("Failed to update exchange rate:", error.response?.data || error.message);
    }
}

async function main() {
    try {
        const rate = await getUSDCADRate();
        await updateExchangeRateInAutotask(rate);
    } catch (error) {
        console.error(error.message);
    }
}

main();
