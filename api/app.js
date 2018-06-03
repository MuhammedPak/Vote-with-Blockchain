let Block = require('./models/block');
let Blockchain = require('./models/blockchain');
let BlockchainNode = require('./models/BlockchainNode');
let Transaction = require('./models/transaction');

let fetch = require('node-fetch');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const user = require('./Routers/user');

const now = new Date();
const ay = now.getMonth() + 1;


let port = 3000;

// access the arguments
process.argv.forEach(function (val, index, array) {
  port = array[2];
});

if (port == undefined) {
  port = 3000;
}

let transactions = [];
let nodes = [];
let genesisBlock = new Block();
let blockchain = new Blockchain(genesisBlock);
app.use(cors());
app.use(bodyParser.json());
app.use('/user', user);

//tum nodelardaki bilgileri esitler
app.get('/resolve', function (req, res) {

  nodes.forEach(function (node) {
    fetch(node.url + '/blockchain')
      .then(function (response) {
        return response.json();
      })
      .then(function (otherNodeBlockchain) {
        if (blockchain.blocks.length < otherNodeBlockchain.blocks.length) {
          blockchain = otherNodeBlockchain;
        }
        res.send(blockchain);
      });
  });
});



// yukarda 3000 olarak belirttiğimiz portu dinliyor. ana node
app.listen(port, function () {
  console.log("server has started");
});

//yeni node eklenecegi zaman gelen isteklere cevap verir
app.post('/nodes/register', function (req, res) {

  let nodesLists = req.body.urls;
  nodesLists.forEach(function (nodeDictionary) {
    let node = new BlockchainNode(nodeDictionary["url"]);
    nodes.push(node);
  });
  res.json(nodes);
});

//nodeları listeler
app.get('/nodes', function (req, res) {
  res.json(nodes);
});

//transection istegi geldiğinde çalışan fonksiyon
app.post('/transactions', function (req, res) {
  let code = req.body.code;
  let vote = req.body.vote;
  let transaction = new Transaction(code, vote);
  transactions.push(transaction);
  res.json(transactions);
  console.log(transactions);
  console.log("Zaman:"+now.getDate()+"/"+ay+"/"+now.getFullYear()+" - "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds());
});

//blockchain listesi
app.get('/blockchain', function (req, res) {
  res.json(blockchain);
});

app.get('/', function (req, res) {
  res.send("blockchain system");
});

//mining
app.get('/mine', function (req, res) {
  let block = blockchain.getNextBlock(transactions);
  blockchain.addBlock(block);
  transactions = [];
  console.log(transactions);
  res.json(block);
});




