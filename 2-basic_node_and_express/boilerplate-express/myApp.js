var bodyParser = require("body-parser");
var express = require('express');
var app = express();


/** 10) Use body-parser to Parse POST Requests */
app.use(bodyParser.urlencoded({ extended: false }));

/** 7) Implement a Root-Level Request Logger Middleware*/
app.use(function (req, res, next) {
    // method path - ip
    let logger = req.method + ' ' + req.path + ' ' + '-' + req.ip;
    console.log("I'm a middleware...");
    console.log(logger);
    next();
})

/** 1) Meet the node console. */
console.log('Hello World');

/** 2) A first working Express Server */
//app.get("/",(req,res)=>res.send("Hello Express"));

/** 3) Serve an HTML file */
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`)
});

/** 4) Serve static assets  */
// Normal usage
app.use(express.static(__dirname + "/public"));

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));


/** 5) Serve JSON on a Specific Route */
app.get('/json', (res, req) => {
    res.json({
        message: "Hello json"
    });
});


/** 6) Use the .env File */
app.get('/json', (req, res) => {

    if (process.env.MESSAGE_STYLE === 'uppercase') {
        message = 'Hello json'.toUpperCase();
        res.json({ "message": message });
    } else {
        message = 'Hello json';
        res.json({ "message": message });
    }

});

/** 8) Chain Middleware to Create a Time Server */
app.get(
    '/now',
    (req, res, next) => {
        res.time = new Date().toString();
        next();
    },
    (req, res) => {
        res.send({
            time: res.time
        });
    }
);

// 2º solution
const middleware = (req, res, next) => {
    req.time = new Date().toString();
    next();
};

app.get("/now", middleware, (req, res) => {
    res.send({
        time: req.time
    });
});


/** 9) Get Route Parameter Input from the Client */
/**
   route_path: '/user/:userId/book/:bookId'
   actual_request_URL: '/user/546/book/6754'
   req.params: {userId: '546', bookId: '6754'}
 */
app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({
        echo: word
    });
});

/** 10) Get Query Parameter Input from the Client */
/**
   route_path: '/library'
   actual_request_URL: '/library?userId=546&bookId=6754'
   req.query: {userId: '546', bookId: '6754'}
 */

// ^/name?first=firstname&last=lastname return { name: 'firstname lastname'}
app.get('/name', (req, res) => {

    firstName = req.query.first;
    lastName = req.query.last;

    // OR you can destructure and rename the keys
    //var { first: firstName, last: lastName } = req.query;

    res.json({
        name: `${firstName} ${lastName}`
    });
});


/** 11) Get Data from POST Requests */
/**
   route: POST '/library'
   urlencoded_body: userId=546&bookId=6754
   req.body: {userId: '546', bookId: '6754'}
 */
app.post('/name', (req, res) => {
    let firstname = req.body.first;
    let lastname = req.body.last;
    res.json({
        name: `${firstname} ${lastname}`
    });

});




























module.exports = app;
