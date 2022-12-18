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
        Description of the test
        This test is a test => Description
        <v-btn variant="outlined" class="mt-9" @click="currentStep++">I carefully read the experiment description</v-btn>
      </template>
      <template v-if="currentStep==2">
        Form
        <v-btn variant="outlined" class="mt-9" @click="currentStep++">Demo test</v-btn>
      </template>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import TestSet from "@/components/TestSet.vue";
import router from "@/router";

// Components

export default defineComponent({
  name: "init",

  components: {
    TestSet
  },
  data() {
    return {
      currentStep: 1
    }
  },
  async beforeMount() {

  },

  methods: {
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

