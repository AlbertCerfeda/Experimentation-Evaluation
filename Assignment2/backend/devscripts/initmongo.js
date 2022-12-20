const mongo = require("../model/mongo")
const fs = require("fs");

async function run() {
    // console.log("[+] Deleting collection 'users'")
    // await mongo.users.deleteMany({})
    console.log("[+] Deleting collection 'testsets'")
    await mongo.testsets.deleteMany({})

    const testsets = JSON.parse(fs.readFileSync("./model/testsets.json"))
    console.log(testsets)
    for (let key in testsets){
        console.log(`[+] Importing testset '${key}' into collection 'testsets'`)
        await mongo.testsets.insertOne({
            testset: key,
            ...testsets[key]
        })
    }
    process.exit()
}

setTimeout(run, 1000)