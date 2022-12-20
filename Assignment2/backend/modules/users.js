const { v4: uuidv4 } = require('uuid');
const tests = require('./tests')
const _ = require('lodash')

const users = {}

function addUser(token, obj) {
    users[token] = obj
    console.log("Users: ", users)
    return {token,user: _.cloneDeep(users[token])}
}
function getUser(token) {
    if (users[token]===undefined)
        return
    console.log("Users: ", users)
    return _.cloneDeep(users[token])
}

function deleteUser(token) {
    delete users[token]
}
function isValidUser(token) {
    return token !== undefined && users[token] !== undefined
}
function hasUserAccess(token, testset, testname) {
    return true
}




function createUser(form) {
    const required = {}
    let keys = Object.keys(form)
    let diff = Object.keys(required).filter(k=>!keys.includes(k))
    if (diff.length > 0) {
        throw `Form does not contain keys ${diff}`
        return
    }
    keys.forEach((k)=> { if (!Object.keys(required).includes(k)) delete form[k] })

    let newuser = {
        signup: new Date(),
        data: form,
        stats: tests.getAllTestSets()
    }

    Object.keys(newuser.stats).forEach((testset)=>{
        newuser.stats[testset].tests = newuser.stats[testset].tests.map((test)=>{
            return {
                testname: test.testname,
                completed: false
            }
        })
    })

    return addUser(uuidv4(), newuser)
}




function startAttempt(token, testset, testname) {
    let user = getUser(token)
    let test = user.stats[testset].tests.find((t)=>t.testname === testname)

    test.start = new Date()
    addUser(token, user)
}
function endAttempt(token, testset, testname, answer) {
    let user = getUser(token)
    let test = user.stats[testset].tests.find((t)=>t.testname === testname)

    test.end = new Date()
    test.elapsed = test.end - test.start
    test.correct = tests.isAnswerCorrect(testset, testname, answer)
    console.log(user.stats[testset])
    addUser(token, user)
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