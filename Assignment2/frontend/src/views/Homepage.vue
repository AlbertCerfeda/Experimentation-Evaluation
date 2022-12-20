<template>
  <v-container fluid class="h-100 bg-red d-flex justify-center align-center flex-column">
    <h1 class="text-h1"> Code reading speed test</h1>
    <br>
    <h3 class="text-h5"> For the course " Experimentation & Evaluation " SA 2022-2023</h3>
    <h4 class="text-h6">SA 2022-2023, part of BSc INF at USI Lugano</h4>
    <br>
    <h4 class="text-h6">Designed by Albert Cerfeda & Alan Copa</h4>
      <v-btn variant="outlined" class="mt-9" to="/init">Start the test</v-btn>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

// Components

export default defineComponent({
  testname: "Homepage",

  components: {
  },
  data() {
    return {

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

