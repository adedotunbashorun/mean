var express = require('express');

var morgan = require('morgan');
var mongoose = require('mongoose');
// var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

//port no
const port = process.env.PORT || 8000;

//connect to database

mongoose.connect('mongodb://localhost:27017/bezop', function(err) {
    if (err) {
        console.log('not connected to ' + err);
    } else {
        console.log('connected');
    }
});

var passport = require('passport');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(session({
    name: 'myname.sid',
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
    cookie: {
        maxAge: 36000000,
        httpOnly: false,
        secure: false
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

require('./passport-config');

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    credentials: true
}));

app.use(morgan('dev'));

const appRoutes = require('./app/routes/api');
const fileRoutes = require('./app/routes/file');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/api', appRoutes);
app.use("/api", fileRoutes);


app.get('*', function(req, res) {
    //res.sendFile(path.join(__dirname, '/public/app/views/index.html'));
})

app.listen(port, function() {
    console.log('server started ' + port);
});