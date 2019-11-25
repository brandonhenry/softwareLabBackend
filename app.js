import {blockChain} from './Blockchain.js';
import {Block} from './Blockchain.js';

var express = require('express');
var app = express();
let podChain = new blockChain();
let PORT = process.env.PORT || 3000;

let cors = require('cors');

app.get('/', cors(), function(req, res){
    res.send("Welcome to the MSU Blockchain API!");
});

app.get('/purchase', cors(), function(req, res){
    let price = req.url.substr(req.url.indexOf("=") + 1, req.url.length);
    podChain.addBlock(new Block(podChain.getLatestBlock().index + 1, Date(), price));
    res.send(podChain.getLatestBlock());
});

app.get('/searchID', cors(), function(req, res){
    let id = req.url.substr(req.url.indexOf("=") + 1, req.url.length);
    const tempBlock = podChain.findID(id);
    res.send(tempBlock);
});

app.get('/searchDates', cors(), function(req, res){
    let endDate = req.url.substr(req.url.indexOf("end") + 4, req.url.length);
    let start = req.url.substr(req.url.indexOf("?") + 1, req.url.indexOf("&"));
    console.log(endDate);
    console.log(start);
    const tempList = podChain.findDates("11/20/2019", "11/30/2019");
    res.send(tempList)
});

app.get('/latest', cors(), function(req, res){
    res.send(podChain.getLatestBlock())
});

app.listen(PORT);