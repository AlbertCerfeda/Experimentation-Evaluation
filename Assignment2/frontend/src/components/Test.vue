<template>
  <v-container fluid class="h-100 d-flex justify-center align-center flex-column">
    <v-container class="w-50 h-75 bg-blue-grey-darken-3 rounded-lg">
      <v-container fluid class="h-25 w-100 h-25 d-flex flex-column justify-end align-center pa-0">
        <h2 class="text-h5"> You are about to perform test</h2>
        <h1 class="text-h4 ma-2 mb-5 font-weight-bold">{{ test.testname }}</h1>
          <h2 class="text-h5">The word is:</h2>
          <h1 class="text-h4 ma-2 mb-5 font-weight-bold">{{ test.word!==undefined?test.word:'-' }}</h1>


        <v-progress-linear
            height="30"
            :model-value="testStartCountdown"
            @click="initiateCountdown()"
            color="red-accent-2"
        >
          <v-btn v-if="show_timer" class="text-h6"  variant="tonal">{{this.stopWatch.timer}}</v-btn>
          <v-btn v-else variant="tonal">Start countdown</v-btn>

        </v-progress-linear>
      </v-container>
      <v-container fluid class="h-75 w-75 h-50 d-flex justify-space-around align-center flex-wrap">
        <AnswerButton @click="onanswerclick(option.text, idx)" :style="`flex-basis: 33.33333%`" :class="`h-25 flex-grow-1 flex-shrink-0 ${test_results.correct!==undefined && selected_option===idx? test_results.correct?'bg-green':'bg-red' :''}`" v-for="(option, idx) in test.options" :key="idx" :disabled="!is_test_running && selected_option!=idx" :selected="selected_option===idx" :text="option.text" />

      </v-container>
    </v-container>

  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import AnswerButton from "@/components/AnswerButton.vue";
import store from "@/store";
import Popup from "@/components/Popup.vue";

// Components

export default defineComponent({
  testname: "Test",

  props: {
    testset: {
      type: String,
      required: true
    },
    testname: {
      type: String,
      required: true
    },
    oncomplete: {
      type: Function,
      default: ()=>{}
    }
  },


  components: {
    Popup,
    AnswerButton

  },
  data() {
    return {
      test: {
        testname: undefined,
        word: undefined,
        options: []
      },
      selected_option: undefined,
      test_results: { },

      testStartCountdown:100,
      show_timer: false,

      is_countingdown: false,
      is_test_running: false,


      stopWatch: {
        interval: undefined,
        dateStart: undefined,
        start: () => {
          stop()
          this.stopWatch.dateStart = new Date()
          this.stopWatch.interval = setInterval(()=> {
            let currentTime = new Date(), timeElapsed = new Date(currentTime - this.stopWatch.dateStart)
            this.stopWatch.timer =
                this.stopWatch.formatDate(timeElapsed)
          },10)

        },
        stop: () => {
          if(this.stopWatch.interval)
            clearInterval(this.stopWatch.interval)
          this.stopWatch.interval = undefined
        },
        timer: '00:00.000',
        formatDate: (date) => {
          let min = date.getUTCMinutes()
              , sec = date.getUTCSeconds()
              , ms = date.getUTCMilliseconds();
          return `${min}:`.padStart(3, '0') +
              `${sec}.`.padStart(3, '0') +
              `${ms}`.padStart(3, '0')
        }
      }

    }
  },
  async beforeMount() {
    this.test = await store.getters.getTestInfo(this.testset, this.testname)
    console.log(this.test)
  },

  methods: {
    async initiateCountdown() {
      if(this.is_test_running || this.selected_option !== undefined)
        return
      this.testStartCountdown = 100
      this.is_countingdown = true
      this.show_timer = true

      let i = 20
      let interval = setInterval(()=>{
        this.testStartCountdown = i
        i-=10
        if (i< 0) {
          clearInterval(interval)
          this.initiateTest()
        }
      },300)
    },

    async initiateTest() {
      this.is_countingdown = false
      this.test = await store.getters.getTest(this.testset, this.testname)
      this.is_test_running = true
      this.stopWatch.start()
    },

    onanswerclick(text, idx) {
      if(!this.is_test_running) {
        return
      }
      this.selected_option = idx
      this.sendTest(text)
    },

    async sendTest(answer) {
      this.stopWatch.stop()
      this.is_test_running = false
      this.test_results = await store.getters.sendTest(this.testset, this.testname, answer)
      console.log(this.test_results)
      this.stopWatch.timer = this.stopWatch.formatDate(this.test_results.elapsed)

      this.oncomplete()
    },


  }
});
</script>

<style scoped>

</style>

