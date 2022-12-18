const fs = require('fs')

const testsets = JSON.parse(fs.readFileSync("./model/testsets.json"))
console.log(testsets)

function getTest(testset, testname, dto=true) {
    let test = {...getTestSet(testset).tests.find((t) => t.testname === testname)}
    if(dto)
        delete test.correct
    return test
}
function getTestSet(testset) {
    return testsets[testset]
}





function stripSensiviteTestInfo(obj) {
    return {
        testname: obj.testname,
        options: obj.options.map(()=>{return{}})
    }
}
function getTestSetInfo(testset) {
    let tests = {...getTestSet(testset)}
    tests.tests = tests.tests.map((t)=>stripSensiviteTestInfo(t))
    return tests
}

function getTestInfo(testset, testname) {
    return stripSensiviteTestInfo(getTest(testset,testname))
}

function isAnswerCorrect(testset, testname, answer) {
    console.log(getTest(testset, testname,false), answer)
    return getTest(testset, testname,false).correct == answer
}





module.exports = {
    getTestSetInfo,
    getTestInfo,
    getTest,

    isAnswerCorrect
}