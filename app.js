var express = require('express')
var app = express()


function waitFor(ms, cb) {
  var waitTill = new Date(new Date().getTime() + ms);
  while(waitTill > new Date()){};
  if (cb) {
    cb()
  } else {
   return true
  }
}
// ab -n 10 http://localhost:3000
app.get('/', function(req, res) {
   res.send("Hello there from PORT " + process.env.PORT);
})

// ab -n 10 http://localhost:3000/ex1
// ab -n 10 -c 10 http://localhost:3000/ex1
app.get('/ex1', function(req, res) {
    setTimeout(function() {
        res.send("Hello there");
    }, 1000);
})

// ab -n 10 http://localhost:3000/ex2
// ab -n 10 -c 10 http://localhost:3000/ex2
app.get('/ex2', function (req, res) {
    waitFor(1000, function() {
        res.send('Hello World!')
    })
})

// ab -n 10 http://localhost:3000/ex3
// ab -n 10 -c 10 http://localhost:3000/ex3

var apicache = require('apicache');
app.get('/ex3', apicache.middleware('5 minutes'), function (req, res) {
    console.log("Showing data");
    waitFor(2000, function() {
        res.send('Hello World!')
    })
})

app.get('/show_me_cache', function(req, res) {
    res.send(apicache.getIndex());
})


app.listen(process.env.PORT || 3000, function () {
    console.log(`Example app listening on port ${process.env.PORT}!`)
})

