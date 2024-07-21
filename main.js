// variables
let fromInput = document.querySelector('.from');
let  from = document.querySelector('.from').value;
let to = document.querySelector('.to').value;
let fromOptions = document.querySelectorAll('.from option');
let arrayOptions = Array.from(fromOptions, option => option.value)



const getUserCountryAPI ='https://ipinfo.io/json?token=d302b9c169fa15';
let currentCurrency="";



// ********************************************************************************
// get the get Currency Country  => currentCurrency
function getCurrencyCountry(country){
  const countryToCurrency = {
    "US": "USD",    // United States
    "CA": "CAD",    // Canada
    "GB": "GBP",    // United Kingdom
    "SG": "SGD",    // Singapore
    "FR": "EUR",    // France
    "DE": "EUR",    // Germany
    "ES": "EUR",    // Spain
    "IT": "EUR",    // Italy
    "NL": "EUR",    // Netherlands
    "BE": "EUR",    // Belgium
    "CH": "CHF",    // Switzerland
    "SE": "SEK",    // Sweden
    "NO": "NOK",    // Norway
    "DK": "DKK",    // Denmark
    "PL": "PLN",    // Poland
    "CZ": "CZK",    // Czech Republic
    "EG": "EGP",    // Egypt
    "DZ": "DZD",    // Algeria
    "MA": "MAD",    // Morocco
    "TN": "TND",    // Tunisia
    "ZA": "ZAR",    // South Africa
    "NG": "NGN",    // Nigeria
    "KE": "KES",    // Kenya
    "GH": "GHS",    // Ghana
    "SN": "XOF",    // Senegal (also used by several other West African countries)
    "CI": "XOF",    // Ivory Coast (Côte d'Ivoire)
    "CM": "XAF",    // Cameroon (also used by several other Central African countries)
    "JP": "JPY",    // Japan
    "CN": "CNY",    // China
    "IN": "INR",    // India
    "AU": "AUD",    // Australia
    "NZ": "NZD",    // New Zealand
    "BR": "BRL",    // Brazil
    "MX": "MXN",    // Mexico
    "RU": "RUB",    // Russia
    "KR": "KRW",    // South Korea
    "TR": "TRY",    // Turkey
    "AE": "AED",    // United Arab Emirates
    "SA": "SAR",    // Saudi Arabia
    // Add more countries as needed
  };
    if(countryToCurrency[country]){
      currentCurrency = countryToCurrency[country]
    } else {
      currentCurrency= "UNKNOWN";
    }
  }

// ********************************************************************************
// get the country automatically
// Get User Country
// API used :https://ipinfo.io/json?token=d302b9c169fa15
async function setCountryCurrency() {

  try {
    const response = await fetch(getUserCountryAPI);
    const data = await response.json();
    let country = data.country;
    getCurrencyCountry(country);
    if (currentCurrency != "UNKNOWN") {
    from = currentCurrency;
    let newOption = document.createElement('option');
    newOption.value = currentCurrency;
    newOption.text = currentCurrency;
    const checkExist = arrayOptions.find(option => option === currentCurrency)
    if (!checkExist) {
      fromInput.insertBefore(newOption, fromInput.firstChild);
  fromInput.selectedIndex = 0;

    }
    }
  } catch (error) {
  }
}

setCountryCurrency();



function convertCurrency() {
  const amount = document.querySelector(".amount").value;
  const from = document.querySelector(".from").value;
  const to = document.querySelector(".to").value;
  const resultDiv = document.querySelector(".result");
  if (amount && from && to) {
    fetch(`https://v6.exchangerate-api.com/v6/27815b86acd52881cd94993a/latest/${from}`)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.conversion_rates[to];
        const result = (amount * rate).toFixed(2);
        from.textContent = "";
        resultDiv.innerHTML = `${amount} ${from} = ${result} ${to}`;
      })
      .catch((error) => {
        resultDiv.innerHTML = `Something Went Wrong ${error}`;
      });
  } else {
    resultDiv.innerHTML = "Please Fill All Fields";
  }
}

