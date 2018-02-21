// immediate invoked function

(function () {
    // initialise the WDC API
    var myConnector = tableau.makeConnector();

    //setup the schema for the data

    myConnector.getSchema = function (schemaCallback) {
        // define columns in an array of objects
        var cols = [{
            id: "Currency",
            alias: "Currency",
            dataType: tableau.dataTypeEnum.string,
            description: "Currencies Exchanged"
        }, {
            id: "Value",
            alias: "Value",
            dataType: tableau.dataTypeEnum.float,
            description: "Exchange Rate Value"
        }, {
            id: "BaseCurrency",
            alias: "Base Currency",
            dataType: tableau.dataTypeEnum.string,
            description: "Selected Base Currency"
        }, {
            id: "Date",
            alias: "Date",
            dataType: tableau.dataTypeEnum.date,
            description: "Latest API Refresh Date"
        }];

        var tableSchema = {
            id: 'FixerIO',
            alias: 'FX Rates API',
            columns: cols
        };
        schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {

        // get the base currency selected
        var urlParam = tableau.connectionData;
        var baseUrl = 'https://api.fixer.io/latest?base=' + urlParam;

        tableau.log(baseUrl);

        $.getJSON(baseUrl, function (resp) {
            var rateData = resp.rates;
            var date = resp.date;
            var tableData = []
            for (var key in rateData) {
                if (rateData.hasOwnProperty(key)) {
                    tableData.push({
                        'Currency': key,
                        'Value': rateData[key],
                        'BaseCurrency': urlParam,
                        'Date': date 
                    });
                }
            }
            table.appendRows(tableData);
            doneCallback();
        })
    }

    tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
    $("#clickButton").click(function () {

        var urlParam = {
            baseCurr: $('#currencySelect').val().trim()
        };

        if (urlParam.baseCurr !== '') {

            tableau.connectionName = "FIXERio-data";
            tableau.connectionData = urlParam.baseCurr;
            tableau.submit(); // This sends the connector object to Tableau
            //test if works on console
            tableau.log('This button is working neatly');
        } else {
            tableau.log('Please specify a base currency!');
            $(".errorMessage").text('Please specify a base currency');
        }
    });
});