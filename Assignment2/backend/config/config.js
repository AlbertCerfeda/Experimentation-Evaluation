/**
 *
 * Contains all the application settings and/or parameters.
 *
*/
const path = require('path')

const rate_limit = require("express-rate-limit");

///////////////////
// Initializes some settings that depend on whether the application is getting deployed locally or remotely
const PORT = process.env.PORT || 8888
const HOST = process.env.HOST || "localhost"
///////////////////

const settings = {
    webserver: {
        domain: HOST,
        port: PORT,

        corsOptions: {
            origin: '*',
            optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
        },

        rate : {
            generic_limiter:
             rate_limit({
                windowMs: 2000,
                max: 1000,
                message: "This IP is sending too many requests, slow down."
            })
        },
    },
    mongodb: {
        mongodb_uri: `mongodb://${process.env.MONGODB_URI || 'localhost:27017'}`,
        db_name: "Experimentation2",
        collections: ["users","testsets"]
    },

    users: {
        purge_incomplete_after_m: 10,   // Delete users who haven't completed all the tests sets under X minutes
        check_purge_m: 1                // How often to check for purgeable users
    }
}

// Deep freezes the settings object.
const deepFreeze = obj => {
    Object.keys(obj).forEach(prop => {
        if (typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) deepFreeze(obj[prop]);
    });
    return Object.freeze(obj);
};

// module.exports = deepFreeze(settings)
module.exports = settings
