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

async function ensureValidToken(req, res, next) {
    console.log("Ensuring valid token")
    const {token} = req.query
    if (!await users.isValidUser(token)) {
        res.status(400).end()
        return
    }
    next()
}
async function ensureValidTestset(req, res, next) {
    console.log("Ensuring valid testset")

    const {testset} = req.query
    if (!await testsets.isValidTestSet(testset)) {
        res.status(400).end()
        return
    }
    next()
}

async function ensureValidTest(req, res, next) {
    console.log("Ensuring valid test")

    const {testset, testname} = req.query
    if (!await testsets.isValidTest(testset, testname)) {
        res.status(400).end()
        return
    }
    next()
}


router.get('/test', ensureValidTest, async function (req, res) {
    console.log(req.query)
    const {testset, testname, token} = req.query

    if (!req.query.info && !await users.hasUserAccess(token, testset, testname)) {
        res.status(400).end()
        return
    }

    if (req.query.info) {
        res.json(await testsets.getTestInfo(testset, testname))
    } else {
        await users.startAttempt(token, testset, testname)
        res.json(await testsets.getTest(testset, testname))
    }

})

router.get('/testset', ensureValidTestset, async function (req, res) {
    console.log(req.query)
    const {testset} = req.query


    if (req.query.info) {
        res.json(await testsets.getTestSetInfo(testset))
    } else {
        res.json(await testsets.getTestSetInfo(testset))
    }
})


router.post('/test', ensureValidTest, ensureValidToken, async function (req, res) {
    console.log(req.query)
    const {token, testset, testname, answer} = req.query

    if (answer === undefined) {
        res.status(400).end()
        return
    }
    if (!await users.hasUserAccess(token, testset, testname)) {
        res.status(400).end()
        return
    }

    res.json(await users.endAttempt(token, testset, testname, answer))
})


router.post('/register',async function (req, res) {
    const {formdata} = req.body
    console.log("Body: ", formdata)

    if (formdata === undefined) {
        res.status(400).end()
        return
    }

    users.createUser(formdata).then((newuser)=>{
        res.json({token: newuser.token})
    }).catch((err)=>{
        console.error(err)
        res.status(400).end()
    })

})

module.exports = router;


////////////////

