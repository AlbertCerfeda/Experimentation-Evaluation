<template>
  <v-container fluid class="h-100 pa-0 bg-white text-red d-flex justify-center align-center flex-column">
    <TestSet v-if="currentStep==3" testset="init"/>
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
import Test from "@/components/Test.vue";
import TestSet from "@/components/TestSet.vue";

// Components

export default defineComponent({
  testname: "init",

  components: {
    TestSet,
    Test

  },
  data() {
    return {
      currentStep: 1
    }
  },
  async beforeMount() {

  },

  methods: {

  }
});
</script>

<style scoped>

</style>

