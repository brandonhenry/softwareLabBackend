import {blockChain} from './Blockchain.js';
import {Block} from './Blockchain.js';

var express = require('express');
var app = express();
let podChain = new blockChain();
let PORT = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.send("Welcome to the MSU Blockchain API!");
});

app.get('/purchase', function(req, res){
    podChain.addBlock(new Block(this.getLatestBlock().index + 1, Date(), req.body.price));
    res.send("Success");
});

app.get('/searchID', function(req, res){
    const tempBlock = podChain.findID(req.body.userID);
    res.send(tempBlock);
});

app.get('/searchDates', function(req, res){
    const tempList = podChain.findDates(res.body.startDate, res.body.endDate);
    res.send(tempList)
});

app.listen(PORT);