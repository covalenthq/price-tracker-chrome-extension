# Crypto Price Tracker Chrome Extension

Follow the steps below to set up your custom crypto price tracker powered by the [Covalent Unified API](https://www.covalenthq.com/docs/api/).

![Crypto Price Tracker](/assets/crypto-price-tracker.png)

To start, download and extract this repo on your local machine. Then open up the repo folder in your favourite code editor. 

&nbsp;
1. Add your `.png` extension icon image file to the project folder under `/assets`. By default, we use `omw_icon.png`.


&nbsp;
2. Update the `manifest.json` file with the extension name, description and default icon. Save your changes.
```
{
  "manifest_version": 2,

  "name": "Crypto Price Tracker",
  "description": "Display key crypto spot prices",
  "version": "1.0",

  "browser_action": {
   "default_icon": "assets/omw_icon.png",
   "default_popup": "index.html"
  },
  "permissions": [
   "activeTab"
   ]
}
```

&nbsp;
3. Open up your Chrome browser and go to the URL: `chrome://extensions` which brings up the extensions page.

&nbsp;
4. Ensure that *Developer mode* is enabled.

![Load extension](https://mcusercontent.com/040e2f3f9d74f0f1ed3abc80a/images/ce7e0f35-86e6-4033-a884-822a6a8517ca.png)

&nbsp;
5.  Click *Load unpacked extension* and select your unzipped project folder.

Ensure your custom Chrome extension icon is active and visible in the browser toolbar. When you select it, you should see something similar to:

![Active chrome extension](https://mcusercontent.com/040e2f3f9d74f0f1ed3abc80a/images/909b766d-516f-4f44-820c-2007bb546cf4.png)

And that's it!

 

&nbsp;
## Built using vanilla JavaScript
This app uses vanilla JavaScript and its native Fetch API to access spot price data via Covalent's APIs. All the heavy lifting is done in `script.js`.

### `script.js`
First set the `APIKEY` variable with your key from https://www.covalenthq.com/platform/ (or register to obtain your key if you do not have one)

**Note:** We know that having your `APIKEY` displayed on the front-end of your app is not a good practice! The purpose here is to make it as *simple as possible* to start with a **shippable wallet prototype**. In practice, you will want to have a web server back-end which handles all the API calls.  

The steps in this file are the following:

&nbsp;
1. Reset the token table:
```
const tableRef = document.getElementById('tokenTable').getElementsByTagName('tbody')[0];
tableRef.innerHTML = "";
```

&nbsp;
2. Formulate the URL and add a list of ticker symbols to fetch:
```
const url = new URL(`https://api.covalenthq.com/v1/pricing/tickers/`);
url.search = new URLSearchParams({
    key: APIKEY,
    tickers: ["WBTC", "DAI", "YFI", "AAVE", "UNI"]
})
```

&nbsp;
3. Use the Fetch and Covalent APIs to get and extract the spot price json data:
```
fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
```

&nbsp;
4. Go token by token and build the table data:
```
let tokens = data.data.items;
return tokens.map(function(token) { // Map through the results and for each run the code below
tableRef.insertRow().innerHTML = 
    `<td><img src=${token.logo_url} style=width:50px;height:50px;></td>` +
    `<td> ${token.contract_name} </td>` +
    `<td> ${token.contract_ticker_symbol} </td>` +
    `<td> $${parseFloat(token.quote_rate).toFixed(2)} </td>`
})
```

## Improvements
 Here is your opportunity to play with the response data and further build out your spot price Chrome extension! Some improvement ideas include:
* Ability to add/remove tokens from your list
* Auto refresh the table at a certain frequency
* Ability to see the spot price in different currencies using a dropdown selector
* Add some front-end 'pizzazz' by using a toolkit like Bootstrap (https://getbootstrap.com/)

### Support

If you have any questions regarding this code template, please message us on Discord: https://covalenthq.com/discord