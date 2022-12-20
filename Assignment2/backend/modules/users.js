const { v4: uuidv4 } = require('uuid');
const tests = require('./tests')

const users = {}

function addUser(token, obj) {
    users[token] = obj
    console.log("Users: ", users)
    return {token,user: {...users[token]}}
}
function getUser(token) {
    if (users[token]===undefined)
        return
    console.log("Users: ", users)
    return {...users[token]}
}
function deleteUser(token) {
    delete users[token]
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





module.exports = {
    createUser
}