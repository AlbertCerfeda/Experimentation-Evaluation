<template>
  <v-container fluid class="h-100 pa-0 bg-white text-red d-flex justify-center align-center flex-column">
      <TestSet ref="testset" v-if="currentStep==3"
               testset="init"
               modal_canceltext="Repeat demo"
               modal_submittext="Go to real test"
               modal_description="This was an example demo Test Set similar to the one that you may encounter."
               modal_dismissable=true
               :modal_oncancel="repeatdemo"
               :modal_onsubmit="endDemo"/>
      <template v-if="currentStep==1">
        <p>This test aims to measure how the use of different word separators affects text speed and comprehension.</p>
        <p>In particular, examples of two popular separator styles in programming will be shown:</p>
        <p>camelCase and kebab-case</p>
        <br>
        <p>The mechanics of the test are simple:</p>
        <p> a sentence or a series of words will be displayed and you will have to select the correct answer as quickly as possible!</p>
        <v-btn variant="outlined" class="mt-9" @click="currentStep++">I carefully read the experiment description</v-btn>
      </template>
      <template v-if="currentStep==2">
        <Form ref="form" :onsubmit="onsubmit"/>
        <v-btn variant="outlined" class="mt-9" @click="this.$refs.form.submit()">Demo test</v-btn>
      </template>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import TestSet from "@/components/TestSet.vue";
import router from "@/router";
import Form from "@/components/Form.vue";
import store from "@/store";

// Components

export default defineComponent({
  name: "init",

  components: {
    TestSet,
    Form
  },
  data() {
    return {
      currentStep: 1
    }
  },
  async beforeMount() {

  },

  methods: {
    async onsubmit() {
      await store.getters.awaitToken(store)
      this.currentStep++
    },
    repeatdemo() {
      this.$refs.testset.restart()
    },
    endDemo() {
      router.push({path:'/test'})
      router.forward()
    }
  }
});
</script>

<style scoped>

</style>

