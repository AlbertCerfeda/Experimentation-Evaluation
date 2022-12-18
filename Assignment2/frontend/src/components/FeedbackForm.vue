<template>
      <v-dialog
          v-model="is_form_open"
      >
        <v-card class="mx-auto w-50 rounded-lg">
          <v-card-title class="ma-4">
            <h2>Query feedback</h2>
          </v-card-title>
          <v-card-text class="ma-4">
            <v-container>
              <v-row>
                <v-col cols="12">

                </v-col>
                <v-col cols="12">

                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions class="ma-4">
            <v-spacer></v-spacer>
            <v-btn
                color="blue-darken-1"
                variant="text"
                @click="is_form_open = false"
            >
              Close
            </v-btn>
            <v-btn
                color="red-darken-1"
                variant="text"
                @click="submit"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
// Components
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  name: "FeedbackForm",
  data() {
    return {
      is_form_open: this.immediately_open,
    }
  },
  watch: {
    'query': {
      handler() {
        this.form_data.query = this.query
      },
      immediate: true
    }
  },

  props: {
    immediately_open: {
      type: Boolean,
      default: false
    },
    query: {
      type: String,
    }
  },

  methods: {
    open() {
      this.is_form_open = true
    },

    submit() {
      this.is_loading = true
      setTimeout(()=>store.getters.sendFeedback({
        query: this.form_data.query,
        description: this.form_data.description,
      }).then(()=>{
        this.is_loading = false
        this.is_form_open = false
      }),250)
    }
  },

});
</script>


<style scoped>

</style>
