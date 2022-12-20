<template>
  <Popup ref="popup"
         :title="this.modal_title"
         :description="this.modal_description"
         :dismissable="this.modal_dismissable"
         :oncancel="this.modal_oncancel"
         :submittext="this.modal_submittext"
         :canceltext="this.modal_canceltext"
         :onsubmit="this.modal_onsubmit"
  />

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
import {defineComponent} from "vue";
import Popup from "@/components/Popup.vue";
import router from "@/router";

export default defineComponent({
  name: "TestSet",

  components: {Popup, Test},
  props: {
    testset: {
      type: String,
      required: true
    },




    modal_title: {
      type: String,
      default: "You completed the Test Set, congratulations !"
    },
    modal_description: {
      type: String,
      default: "Thank you for answering, your response has been registered and will be used for our case study."
    },

    modal_submittext: {
      type: String,
      default: "Continue"
    },
    modal_canceltext: {
      type: String,
    },

    modal_dismissable: {
      type: Boolean,
      default: false
    },
    modal_oncancel: {
      type: Function,
    },
    modal_onsubmit: {
      type: Function,
      default: ()=>{
        router.push({path:'/'})
        router.forward()
      }
    }
  },
  data() {
    return {
      tests: [],
      currentStep: 0,
      openmodal: false
    }
  },
  methods: {
    oncomplete() {
      this.currentStep += 1
      if(this.currentStep === this.tests.length) {
        this.$refs.popup.open()
        return
      }
    },

    async restart() {
      this.currentStep = 0
      this.openmodal = false
    }
  },
  async beforeMount() {
    this.tests = (await store.getters.getTestSet(await store.getters.awaitToken(store),this.testset)).tests
  }
})
</script>

<style scoped>

</style>