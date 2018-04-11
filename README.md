Tableau Web Data Connector: Fixer IO
=====================================
Created by [Andre de Vries](https://www.twitter.com/andre347_) (21 Feb 2018)

####  **Web Data Connector to download Foreign Exchange Rate data for over 30 currencies**

Web Data Connector. Connecting to the [Fixer IO API](http://fixer.io/). Fetches the latest currency conversion data. Useful for pricing data sets that can be enriched by exchange rate data. Easy to use with cross-db joins or blending in Tableau.

####  **UPDATE 11/04/2018: WDC is Broken**

FIXER IO changed their API Plans. You now need a paid subscription to choose your base currency. I changed the WDC so it only gets EUR values. It still gets the exchange rates for the latest date available in the API. You now also need an API Key. You can get one for free [here](http://fixer.io).

----------------

1. Open Tableau
2. Click on 'Web Data Connector' under 'To a Server'
3. Paste in the url
```
https://andre347.github.io/tableau_wdc_fxrates/
```
4. Specify a base currency
5. Click on 'Get Foreign Exchange Rates'

![FX Rate](https://image.ibb.co/jP093H/fxrate.gif)