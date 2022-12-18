import {createStore} from "vuex";

export default createStore({
    state: {},
    getters: {
        registerClient: () => async () => {

        },
        getTestInfo: () => async (testset, testname) => {
            return {
                testname: testname,
                options: [{}, {}, {}, {}, {}, {}]
            }
        },
        getTestSet: () => async (testset) => {
            return [{
                testname: "#1.1",
                options: [{}, {}, {}, {}, {}, {}]
            },
                {
                    testname: "#1.2",
                    options: [{}, {}, {}, {}, {}, {}]
                }, {
                    testname: "#1.3",
                    options: [{}, {}, {}, {}, {}, {}]
                }]
        },
        getTest: () => async (testset, testname) => {
            return {
                testname: testname,
                word: "banana",
                options: [{text: "banana"}, {text: "banana"}, {text: "banana"}, {text: "banana"}, {text: "banana"}, {text: "banana"}]
            }
        },
        sendTest: () => async (testset, testname, answer) => {
            return {
                elapsed: new Date(),
                correct: false
            }
        }
    },
    mutations: {},
    actions: {},
    modules: {},
});
