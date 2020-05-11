const express = require("express");
const router = express.Router();
const passport = require('passport');
const Tweet = require('../../models/Tweet');
const validateTweetInput = require('../../validation/tweets');

router.get("/test", (req, res) => {
    res.json({
        msg: "This is the tweet route"
    });
});

//get all tweets
router.get("/", (req, res) => {
    Tweet
        .find()
        .sort({ date: -1 })
        .then(tweets => res.json(tweets))
        .catch(err => res.status(404).json({ notweetsfound: "No tweets found"}));
});

//get user's tweets
router.get("/user/:user_id", (req,res) => {
    Tweet
        .find({user: req.params.user_id})
        .then(tweets => res.json(tweets))
        .catch(err => 
            res.status(404).json({notweetsfound: "No tweets found from that user"}
        ));
})

//get specific tweet
router.get("/:id", (req, res) => {
    Tweet
        .findById(req.params.id)
        .then(tweet => res.json(tweet))
        .catch(err =>
            res.status(404).json({ notweetsfound: "No tweets found with that ID"}
        ));
});

//post tweet
router.post("/", 
    passport.authenticate("jwt", { session: false }),
    //req has user key based on json web token
    (req, res) => {
        const { isValid, errors } = validateTweetInput(req.body);

        if (!isValid){
            return res.status(400).json(errors);
        }

        const newTweet = new Tweet({
            text: req.body.text,
            user: req.user.id
        });

        newTweet.save()
            .then(tweet => res.json(tweet));
    }
);

module.exports = router;