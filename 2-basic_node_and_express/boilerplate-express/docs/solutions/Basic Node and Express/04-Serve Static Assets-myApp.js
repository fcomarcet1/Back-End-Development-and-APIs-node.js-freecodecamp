
var express = require('express');
var app = express();

// --> 7)  Mount the Logger middleware here


// --> 11)  Mount the body-parser middleware  here


/** 1) Meet the node console. */
console.log('Hello World');

/** 2) A first working Express Server */
//app.get("/",(req,res)=>res.send("Hello Express"));

/** 3) Serve an HTML file */
app.get("/",(req,res)=>res.sendFile(`${__dirname}/views/index.html`));

/** 4) Serve static assets  */
app.use(express.static(__dirname+"/public"));

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;

