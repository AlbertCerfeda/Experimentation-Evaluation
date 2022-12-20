/**
 *
 * / API router
 *
 */

const express = require('express');
const router = express.Router();
const config = require("../config/config")
const testsets = require("../modules/tests")
const users =require("../modules/users")

function ensureValidToken(req,res,next) {
    const {token} = req.query
    if(!users.isValidUser(token)) {
        res.status(400).end()
        return
    }
    next()
}
function ensureValidTestset(req,res,next) {
    const {testset} = req.query
    if(!testsets.isValidTestSet(testset)) {
        res.status(400).end()
        return
    }
    next()
}

function ensureValidTest(req,res,next) {
    const {testset, testname} = req.query
    if(!testsets.isValidTest(testset, testname)) {
        res.status(400).end()
        return
    }
    next()
}


router.get('/test', ensureValidTest, function(req, res) {
    console.log(req.query)
    const {testset, testname, token} = req.query

    if(!req.query.info && !users.hasUserAccess(testset, testname)) {
        res.status(400).end()
        return
    }

    if(req.query.info) {
        res.json(testsets.getTestInfo(testset, testname))
    } else {
        users.startAttempt(token, testset, testname)
        res.json(testsets.getTest(testset, testname))
    }

})

router.get('/testset', ensureValidTestset, function(req, res) {
    console.log(req.query)
    const {testset} = req.query


    if(req.query.info) {
        res.json(testsets.getTestSetInfo(testset))
    } else {
        res.json(testsets.getTestSetInfo(testset))
    }
})


router.post('/test', ensureValidTest, ensureValidToken, function(req, res) {
    console.log(req.query)
    const {token, testset, testname, answer} = req.query

    if(answer === undefined) {
        res.status(400).end()
        return
    }
    if(!users.hasUserAccess(token, testset, testname)) {
        res.status(400).end()
        return
    }

    res.json(users.endAttempt(token, testset, testname,answer))
})


router.post('/register',function(req, res) {
    const {formdata} = req.body
    console.log("Body: ", formdata)

    if(formdata === undefined) {
        res.status(400).end()
        return
    }
    let newuser = users.createUser(formdata)

    res.json({token:newuser.token})
})

module.exports = router;


////////////////

