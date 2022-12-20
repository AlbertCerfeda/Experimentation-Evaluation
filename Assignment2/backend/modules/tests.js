const fs = require('fs')
const _ = require('lodash');

const testsets = JSON.parse(fs.readFileSync("./model/testsets.json"))
console.log(testsets)

function getTest(testset, testname, dto=true) {
    let test = _.cloneDeep(getTestSet(testset).tests.find((t) => t.testname === testname))
    if(dto)
        delete test.correct
    return test
}
function getTestSet(testset) {
    return _.cloneDeep(testsets[testset])
}
function getAllTestSets() {
    return _.cloneDeep(testsets)
}





function stripSensiviteTestInfo(obj) {
    return {
        testname: obj.testname,
        options: obj.options.map(()=>{return{}})
    }
}
function getTestSetInfo(testset) {
    let tests = getTestSet(testset)
    tests.tests = tests.tests.map((t)=>stripSensiviteTestInfo(t))
    return tests
}

function getTestInfo(testset, testname) {
    return stripSensiviteTestInfo(getTest(testset,testname))
}

function isAnswerCorrect(testset, testname, answer) {
    return getTest(testset, testname,false).correct == answer
}

function isValidTestSet(testset) {
    return testsets[testset] !== undefined
}
function isValidTest(testset, testname) {
    return isValidTestSet(testset) && testsets[testset].tests.find((t) => t.testname === testname) !== undefined
}





module.exports = {
    getAllTestSets,
    getTestSetInfo,
    getTestInfo,
    getTest,
    isValidTest,
    isValidTestSet,

    isAnswerCorrect
}