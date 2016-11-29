var express = require('express')
var app = express()
var request = require('request');

var startPort = 3000;
var roundRobin = 0;
var totalNodes = 2;

app.get(/(.*)/, function(req, res) {
  var currentPort = startPort + roundRobin % totalNodes;
  roundRobin += 1;
  console.log("Sending request to port: ", currentPort, req.params[0]);
  request(`http://localhost:${currentPort}${req.params[0]}`, function(err, resp, body) {
    console.log(err);
    res.send(body);
  })
})

app.listen(8000, function() {
  console.log("Load balancer started.");
})

/*
 2994  ab -n 10 -c 1 http://localhost:8000/ex2
 2995  ab -n 10 -c 2 http://localhost:8000/ex2
 */