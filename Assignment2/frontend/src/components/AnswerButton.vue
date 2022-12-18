<template>
  <v-btn variant="outlined" class="rounded-lg ma-4" :style="`${selected? 'border-width:6px':''}`" :disabled="disabled!== undefined ? disabled : !text">
    <span class="font-weight-black text-h3">{{text||'-'}}</span>
  </v-btn>

</template>

<script>
export default {
  testname: "AnswerButton",

  props: {
    text: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>