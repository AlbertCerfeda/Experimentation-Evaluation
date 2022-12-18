<template>
<v-container fluid class="h-100 bg-white text-red d-flex justify-center align-center flex-column">
  <template v-if="this.tests.length > 0" >
    <Test :testname="this.tests[currentStep].testname" :key="currentStep" :testset="this.testset" :oncomplete="oncomplete"/>

  </template>
</v-container>
  <v-progress-linear
      height="30"
      class="w-100"
      :model-value="currentStep/this.tests.length*100"
      color="red-accent-2"
  >
    <span :class="`${currentStep/this.tests.length>0.5?'text-white':''}`">{{`${currentStep} / ${this.tests.length}`}}</span>
  </v-progress-linear>
</template>

<script>
import store from "@/store";
import Test from "@/components/Test.vue";

export default {
  components: {Test},
  props: {
    testset: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tests: [],
      currentStep: 0
    }
  },
  methods: {
    oncomplete() {
      console.log("banana")
      this.currentStep += 1
    }
  },
  async beforeMount() {
    console.log(this.testset)
    this.tests = await store.getters.getTestSet(this.testset)
    console.log(this.tests)
  }
}
</script>

<style scoped>

</style>