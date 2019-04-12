const requestPromise = require('request-promise');
var mdAutenticacion = require('../middleware/autenticacion');
const fs = require('fs');
const apiKey = 'X86NOH6II01P7R24';
const baseUrl = 'https://www.alphavantage.co/';

let urlLog = new URL("https://www.alphavantage.co/");

const express = require('express');

const app = express();

let url = ``;


app.get('/:action', mdAutenticacion.verificaToken, (req, res) => {

    var action = req.params.action;

    const requestAuctions = (functionToUse, auctionSymbol, outpoutSize) => {
        url = `${baseUrl}query?function=${functionToUse}&symbol=${auctionSymbol}&outputsize=${outpoutSize}&apikey=${apiKey}`;
        return requestPromise(url);
        // console.log(url);

        // const timeSeries = dataInJson['Time Series (Daily)'];
        // console.log(timeSeries);

    }

    requestAuctions('TIME_SERIES_DAILY', action, 'compact').then((responseFromApi) => {

        const dataInJson = JSON.parse(responseFromApi);
        // console.log(dataInJson);

        const timeSeries = dataInJson['Time Series (Daily)'];
        // console.log(timeSeries);

        const timeSeriesKey = Object.keys(dataInJson['Time Series (Daily)']);
        // console.log(timeSeriesKey);

        const previousDay = timeSeriesKey[1].open;
        console.log(previousDay);

        let i = 1;



        timeSeriesKey.map((timeSerieKey) => {
            try {
                const priceKeys = Object.keys(timeSeries[timeSerieKey]);
                // console.log(priceKeys);

                const openPrice = timeSeries[timeSerieKey][priceKeys[0]];
                // console.log(openPrice);
                const highPrice = timeSeries[timeSerieKey][priceKeys[1]];
                // console.log(highPrice);
                const lowPrice = timeSeries[timeSerieKey][priceKeys[2]];
                // console.log(lowPrice);
                const closePrice = timeSeries[timeSerieKey][priceKeys[3]];
                // console.log(closePrice);

                // console.log(timeSeries[timeSeriesKey[0]][priceKeys[0]]);


                let pricePrevio = 0;
                if (i < timeSeriesKey.length) {
                    pricePrevio = timeSeries[timeSeriesKey[i]][priceKeys[0]];
                    i++;
                }


                // console.log(pricePrevio);
                // console.log('precio previo ' + pricePrevio + ' precio apertura nuevo: ' + openPrice);

                let dif = openPrice - pricePrevio;
                let porcAction = openPrice / pricePrevio;

                // console.log('open: ' + openPrice + ' close: ' + pricePrevio + ' dif ' + dif);
                let code_color = '';
                if (dif > 0) {
                    code_color = 'green';
                } else {
                    code_color = 'red';
                }

                let objReturn = {
                    "symbol": action,
                    "value": openPrice,
                    "previous": pricePrevio,
                    "change_percent": porcAction,
                    "change_value": dif,
                    "color_code": code_color
                };
                console.log(objReturn);

                let message = `\nHost: ${urlLog.host} | URL: ${urlLog} | Action: ${action} |\n
                |${objReturn.value}|${objReturn.previous}|${objReturn.change_percent}|${objReturn.change_value}|\n
                `;

                const writeLog = (message) => {
                    const date = new Date();
                    const logToAdd = `date ${date}:: -- ${message}`;
                    fs.appendFile('investApiLog.txt', logToAdd, () => {
                        // console.log('file writted');
                    });
                }

                writeLog(message);


            } catch (error) {
                console.log(error);
            }



        })
    });




    return res.status(200).json({
        ok: true,
        mensaje: 'peticion get reporte',
        actionParametro: action,
        usuarioQueRealizoPeticion: req.usuario
    });


});

module.exports = app;