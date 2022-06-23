// Set your API key here
const APIKEY = "ckey_3bdabb7325ee47cc9bcc1e5f3d7"

// Set your crypto tickers here
const tickers = ["BTC", "WETH", "DAI", "AAVE"]

// Set the Covalent API
const covalentAPI = "https://api.covalenthq.com/v1"
const APIEndpoint = '/pricing/tickers'

// Token table reset
const tableRef = document.getElementById('tokenTable').getElementsByTagName('tbody')[0];
tableRef.innerHTML = "";

// Covalent API request setup
const url = new URL(`${covalentAPI}${APIEndpoint}/`);
url.search = new URLSearchParams({
    key: APIKEY,
    tickers: tickers
})

// Use Fetch API to get Covalent data and display in token table
fetch(url)
.then((resp) => resp.json())
.then(function(data) {
    let tokens = data.data.items;
    return tokens.map(function(token) { // Map through the results and for each run the code below
    tableRef.insertRow().innerHTML = 
        `<td><img src=${token.logo_url} style=width:40px;height:40px;></td>` +
        `<td> ${token.contract_name} </td>` +
        `<td> ${token.contract_ticker_symbol} </td>` +
        `<td> $${parseFloat(token.quote_rate).toFixed(2)} </td>`
    })
})
