const fs = require('fs')
const model = require("../model/mongo")



async function getTest(testset, testname, dto = true) {
    let test = (await getTestSet(testset)).tests.find((t) => t.testname === testname)
    if (dto)
        delete test.correct
    return test
}
async function getTestSet(testset) {
    return await model.testsets.findOne({testset: testset})
}
async function getAllTestSets() {
    return await model.testsets.find({}).toArray()
}
async function isValidTestSet(testset) {
    return await getTestSet(testset) !== undefined
}
async function isValidTest(testset, testname) {
    return await isValidTestSet(testset) && (await getTestSet(testset)).tests.find((t) => t.testname === testname) !== undefined
}





function stripSensiviteTestInfo(obj) {
    return {
        testname: obj.testname,
        options: obj.options.map(()=>{return{}})
    }
}
async function getTestSetInfo(testset) {
    let tests = await getTestSet(testset)
    tests.tests = tests.tests.map((t) => stripSensiviteTestInfo(t))
    return tests
}

async function getTestInfo(testset, testname) {
    return stripSensiviteTestInfo(await getTest(testset, testname))
}

async function isAnswerCorrect(testset, testname, answer) {
    return await getTest(testset, testname, false).correct == answer
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