const express = require('express');
const router = express.Router();
const passport = require('passport');
var nodemailer = require("nodemailer");
var sgTransport = require("nodemailer-sendgrid-transport");
const multer = require("multer");
const path = require("path");
const crypto = require('crypto');

const File = require("../models/file");
const User = require('../models/user');


var options = {
    auth: {
        api_user: "dollarman2",
        api_key: "Professionals@2017"
    }
};

var client = nodemailer.createTransport(sgTransport(options));


router.post('/register', (req, res, next) => {
    let user = new User();
    user.fullname = req.body.fullname;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = User.hashPassword(req.body.password);
    user.temporarytoken = crypto.randomBytes(20).toString('hex');
    user.created_at = Date.now();
    try {
        var email = {
            from: 'Bezop, bezop@bezop.com',
            to: user.email,
            subject: 'Activation Link',
            text: 'Hello ' + user.fullname + ', Thank you for registering to bezop.com. Please click the link below to complete registration http://localhost:8000/api/activate/' + user.temporarytoken,
            html: 'Hello<strong> ' + user.fullname + ' </strong><br/><br/> Thank you for registering to bezop.com. Please click the link below to complete registration.<br/>http://localhost:4200/activate/' + user.temporarytoken
        };

        client.sendMail(email, function(err, info) {
            if (err) {
                console.log(error);
            } else {
                console.log("Message sent: " + info.response);
            }
        });
        user.save();
        return res.status(201).json(user);
    } catch (error) {
        return res.status(501).json(error);
    }

});

router.patch('/activate/:token', (req, res, next) => {
    User.findOne({ temporarytoken: req.params.token }, function(error, user) {
        if (error) {
            res.json(error);
        } else if (!user) {
            res.json({ 'msg': 'token do not math' });
        } else {
            user.temporarytoken = false;
            user.is_active = true;
            var email = {
                from: 'Bezop, bezop@bezop.com',
                to: user.email,
                subject: 'Account Activated',
                text: 'Hello ' + user.fullname + ', Thank you for registering to bezop.com. Your Account has been activated successfully.',
                html: 'Hello<strong> ' + user.fullname + '</strong>,<br/><br/> Thank you for registering to bezop.com. Your Account has been activated successfully.'
            };

            client.sendMail(email, function(err, info) {
                if (err) {
                    console.log(error);
                } else {
                    console.log("Message sent: " + info.response);
                }
            });
            user.save();
            return res.status(201).json(user);
        }

    });
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return res.status(501).json(err); }
        if (!user) { return res.status(501).json(info); }
        if (user.is_active != true) { return res.status(401).json({ msg: 'User not activated' }); }
        req.logIn(user, function(err) {
            if (err) { res.status(501).json(err); }
            return res.status(201).json({ 'msg': 'Login Successful!' });
        });
    })(req, res, next);

});

router.get('/users', (req, res, next) => {
    User.find(function(error, users) {
        res.json(users);
    })

});

router.get('/user', isValidUser, function(req, res, next) {
    return res.status(200).json(req.user);
});

router.get("/logout", isValidUser, function(req, res, next) {
    req.logout();
    return res.status(200).json({ 'msg': 'Logout Successfull!' });
});

function isValidUser(req, res, next) {
    if (req.isAuthenticated()) next();
    else return res.status(401).json({ 'msg': 'UnAuthorized Request!' });
}

router.get('/users/:id', (req, res, next) => {
    User.findOne({ _id: req.params.id }, function(error, user) {
        if (error) {
            res.json(error);
        } else {
            res.json(user);
        }

    });

});

router.delete('/users/:id', (req, res, next) => {
    User.remove({ _id: req.params.id }, function(error, result) {
        if (error) {
            res.json(error);
        } else {
            res.json(result);
        }

    });

});

const store = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "." + file.originalname);
    }
});

var upload = multer({ storage: store }).single("file");

router.post("/upload", function(req, res, next) {
    upload(req, res, function(error) {
        if (error) {
            return res.status(501).json({ error: error });
        }
        let file = new File();
        file.filename = req.file.filename;
        //file.user = req.user._id;
        file.save();
        return res.json({
            originalname: req.file.originalname,
            uploadname: req.file.filename
        });
    });
});

router.post("/download", function(req, res, next) {
    filepath = path.join(__dirname, "./../../uploads") + "/" + req.body.filename;
    res.sendFile(filepath);
});

router.get("/uploaded/", isValidUser, (req, res, next) => {
    File.find({ user: req.user._id }, function(error, user) {
        if (error) {
            res.json(error);
        } else {
            res.json(user);
        }
    });
});

router.get('/files', (req, res, next) => {
    File.find(function(error, files) {
        res.json(files);
    });
});

module.exports = router;