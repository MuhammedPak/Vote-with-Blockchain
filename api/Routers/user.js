const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const db = "mongodb://merveagca:merveagca@ds219130.mlab.com:19130/ngblockchain";
const date = new Date();

mongoose.connect(db, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('connected to mongodb');
    }
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split('')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject;
    next();
}

router.get('/', (req, res) => {
    res.send('user route');
});



router.post('/register', (req, res, next) => {
    User.find({
            tc: req.body.tc
        })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "TC Kimlik Numarası Mevcut"
                });
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    tc: req.body.tc,
                    password: req.body.password
                });
                user
                    .save()
                    .then(result => {
                        console.log(result);
                        console.log(date.getDate);
                        res.status(201).json({
                            message: "Kullanıcı Oluşturuldu",
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        });
});

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({
        tc: userData.tc
    }, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            if (!user) {
                res.status(401).send('Invalid tc');
            } else if (user.tc != userData.tc) {
                res.status(401).send('Invalid password');
            } else if (user.password != userData.password) {
                res.status(401).send('Invalid password');
            } else {
                let payload = {
                    subject: user._id
                };
                let token = jwt.sign(payload, 'secretKey');
                let tc = user.tc;
                let voteStatus = user.voteStatus;
                res.status(200).send({
                    token,
                    tc, 
                    voteStatus
                });
            }
        }
    });
});



router.patch('/update/:tc', (req, res) => {
    let userData = req.body;
    // use our bear model to find the bear we want
    User.findOne({
        tc: req.params.tc
    }, (err, user) => {

        if (err)
            res.send(err);

        user.voteStatus = userData.voteStatus;
        user.cryptedVote = userData.cryptedVote;
        user.save(function (err) {
            if (err)
                res.send(err);

            res.json({
                message: 'User updated!'
            });
        });

    });
});

router.get('/:tc', (req, res) => {
    let userData = req.body;
    // use our bear model to find the bear we want
    User.findOne({
        tc: req.params.tc
    }, (err, user) => {

        if (err)
            res.send(err);
        if (user) {
            res.status(200).json({
                user: user
            });
        }
    });
});


module.exports = router;