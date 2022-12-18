<template>
  <v-container fluid class="h-100 pa-0 bg-white text-red d-flex justify-center align-center flex-column">
      <TestSet ref="testset" testset="realtest"
               :modal_onsubmit="endDemo"/>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import TestSet from "@/components/TestSet.vue";
import router from "@/router";

// Components

export default defineComponent({
  name: "test",

  components: {
    TestSet
  },
  data() {
    return {
      currentStep: 1,
    }
  },
  async beforeMount() {

  },

  methods: {

    endDemo() {
      router.push({path:'/'})
      router.forward()
    }
  }
});
</script>

<style scoped>

</style>

