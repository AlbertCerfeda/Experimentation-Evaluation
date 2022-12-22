const tests = require('./tests')
const model = require('../model/mongo.js')
const config = require("../config/config")
const {ObjectID} = require("mongodb");

async function purgeUsers() {
    let IDdelete = []
    await model.users.find({
        signup: {'$lt': new Date(Date.now() - config.users.purge_incomplete_after_m * 60 * 1000)},
    }).forEach((doc) => {
        // If the user did not complete all the tests
        if (Object.keys(doc.stats).some((testset) => doc.stats[testset].tests.some((test) => !test.completed)))
            IDdelete.push(doc._id)
    })
    console.log(`[+] Purged ${(await model.users.deleteMany({_id: {'$in': IDdelete}})).deletedCount} users`)
}

setTimeout(() => {
    async function purgeLoop() {
        await purgeUsers()
        setTimeout(purgeLoop, config.users.check_purge_m * 60 * 1000)
    }

    purgeLoop()
}, 1000)


async function addUser(obj) {
    let newuser = await model.users.insertOne(obj)
    return {token: newuser.insertedId.toHexString()}
}

async function updateUser(obj) {
    let newuser = await model.users.findOneAndReplace({_id: new ObjectID(obj._id)}, obj)
    return {token: newuser.value._id.toHexString()}
}

async function getUser(objectid) {
    let user = await model.users.findOne({_id: new ObjectID(objectid)})
    return user
}

async function deleteUser(objectid) {
    await model.users.findOneAndDelete({_id: new ObjectID(objectid)})
}

async function isValidUser(objectid) {
    return objectid !== undefined && await model.users.findOne({_id: new ObjectID(objectid)})
}

async function hasUserAccess(token, testset, testname) {
    return true
}


async function createUser(form) {
    const required = [
        'name',
        'age',
        'gender',
        'programmer',
        'programmingLanguages']

    let keys = Object.keys(form)
    let diff = [...required].filter(k => !keys.includes(k))
    if (diff.length > 0) {
        throw `Form does not contain keys ${diff}`
        return
    }
    keys.forEach((k) => {
        if (!required.includes(k)) delete form[k]
    })

    let newuser = {
        signup: new Date(),
        data: form,
        stats: {}
    }
    let testsets = await tests.getAllTestSets()
    testsets.forEach((testset) => {
        console.log(testset)
        newuser.stats[testset.testset] = {
            tests: testset.tests
        }
    })


    console.log(newuser)

    Object.keys(newuser.stats).forEach((testset) => {
        newuser.stats[testset].tests = newuser.stats[testset].tests.map((test) => {
            return {
                testname: test.testname,
                completed: false
            }
        })
    })

    return addUser(newuser)
}


async function startAttempt(token, testset, testname) {
    let user = await getUser(token)
    console.log(user)
    let test = user.stats[testset].tests.find((t) => t.testname === testname)

    test.start = new Date()
    await updateUser(user)
}

async function endAttempt(token, testset, testname, answer) {
    let user = await getUser(token)
    let test = user.stats[testset].tests.find((t) => t.testname === testname)

    test.end = new Date()
    test.elapsed = test.end - test.start
    test.correct = await tests.isAnswerCorrect(testset, testname, answer)
    test.completed = true
    console.log(user.stats[testset])
    await updateUser(user)
    return {
        elapsed: test.elapsed,
        correct: test.correct
    }
}


module.exports = {
    createUser,
    isValidUser,
    startAttempt,
    endAttempt,

    hasUserAccess
}