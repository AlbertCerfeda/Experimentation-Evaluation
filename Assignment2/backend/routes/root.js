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

router.get('/test',function(req, res) {
    console.log(req.query)
    if(req.query.testset === undefined || req.query.testname === undefined) {
        res.status(400).end()
        return
    }

    if(req.query.info) {
        res.json(testsets.getTestInfo(req.query.testset, req.query.testname))
    } else {
        res.json(testsets.getTest(req.query.testset, req.query.testname))
    }

})

router.get('/testset',function(req, res) {
    console.log(req.query)

    if(req.query.testset === undefined) {
        res.status(400).end()
        return
    }

    if(req.query.info) {
        res.json(testsets.getTestSetInfo(req.query.testset))
    } else {
        res.json(testsets.getTestSetInfo(req.query.testset))
    }
})


router.post('/test',function(req, res) {
    console.log(req.query)
    if(req.query.testset === undefined || req.query.testname === undefined || req.query.answer === undefined) {
        res.status(400).end()
        return
    }

    res.json({
        elapsed: new Date(),
        correct: testsets.isAnswerCorrect(req.query.testset, req.query.testname, req.query.answer)
    })
})


router.post('/register',function(req, res) {
    console.log("Body: ", req.body.formdata)
    if(req.body.formdata === undefined) {
        res.status(400).end()
        return
    }
    let newuser = users.createUser(req.body.formdata)

    res.json({token:newuser.token})
})

module.exports = router;


////////////////

