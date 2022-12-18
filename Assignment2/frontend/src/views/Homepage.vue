<template>
  <v-container fluid class="h-100 bg-red d-flex justify-center align-center flex-column">
    <h1>This is a Test.</h1>
    This test is a test => Description
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

