import {createStore} from "vuex";

export default createStore({
    state: {},
    getters: {
        registerClient: () => async () => {

        },
        getTestInfo: () => async (testset, testname) => {
            const url = `${import.meta.env.VITE_BACKEND_URL}/test?testset=${testset}&testname=${testname}&info=true`
            console.log('GET '+url)
            return await (await fetch(url)).json()
        },
        getTest: () => async (testset, testname) => {
            const url = `${import.meta.env.VITE_BACKEND_URL}/test?testset=${testset}&testname=${testname}`
            console.log('GET '+url)
            return await (await fetch(url)).json()
        },

        getTestSet: () => async (testset) => {
            const url = `${import.meta.env.VITE_BACKEND_URL}/testset?testset=${testset}&info=true`
            console.log('GET '+url)
            return await (await fetch(url)).json()
        },

        sendTest: () => async (testset, testname, answer) => {
            const url = `${import.meta.env.VITE_BACKEND_URL}/test?testset=${testset}&testname=${testname}&answer=${answer}`
            console.log('POST: '+url)
            return await (await fetch(url,{method:"POST"})).json()
        }
    },
    mutations: {},
    actions: {},
    modules: {},
});
