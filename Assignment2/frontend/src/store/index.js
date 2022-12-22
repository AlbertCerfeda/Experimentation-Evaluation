import {createStore} from "vuex";

export default createStore({
    state () {
        return {
            token: undefined
        }
    },
    getters: {
        awaitToken: ()=> (store) => {
            return new Promise((resolve) => {
                function wait() {
                    if (store.state.token === undefined) {
                        setTimeout(wait, 50)
                        return
                    }
                    resolve(store.state.token)
                }
                wait()
            })
        },

        getTestInfo: () => async (token, testset, testname) => {
            const url = `${import.meta.env.VITE_BACKEND_URL}/test?testset=${testset}&testname=${testname}&info=true&token=${token}`
            console.log('GET '+url)
            return await (await fetch(url)).json()
        },
        getTest: () => async (token, testset, testname) => {
            const url = `${import.meta.env.VITE_BACKEND_URL}/test?testset=${testset}&testname=${testname}&token=${token}`
            console.log('GET '+url)
            return await (await fetch(url)).json()
        },

        getTestSet: () => async (token, testset) => {
            const url = `${import.meta.env.VITE_BACKEND_URL}/testset?testset=${testset}&info=true&token=${token}`
            console.log('GET '+url)
            return await (await fetch(url)).json()
        },

        sendTest: () => async (token, testset, testname, answer) => {
            const url = `${import.meta.env.VITE_BACKEND_URL}/test?testset=${testset}&testname=${testname}&answer=${answer}&token=${token}`
            console.log('POST: '+url)
            return await (await fetch(url,{method:"POST"})).json()
        }
    },
    mutations: {
        async registerClient(state, formData) {
            const url = `${import.meta.env.VITE_BACKEND_URL}/register`
            console.log('POST: ' + url)
            state.token = (await (await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({formdata: formData})
                })
            ).json()).token
        },

        async logoutClient(state) {
            console.log("Logging out user")
            state.token = undefined
        }
    },
    actions: {},
    modules: {},
});
