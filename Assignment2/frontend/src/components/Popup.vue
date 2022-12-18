<template>
      <v-dialog
          v-model="is_form_open"
      >
        <v-card class="mx-auto w-33 rounded-lg">
          <v-card-title class="ma-4">
            <h2>{{this.title}}</h2>
          </v-card-title>
          <v-card-text class="ma-4">
            <v-container>
              {{this.description}}
            </v-container>
          </v-card-text>
          <v-card-actions class="ma-4">
            <v-spacer></v-spacer>
            <v-btn
                v-if="dismissable"
                color="blue-darken-1"
                variant="text"
                @click="cancel"
            >
              {{canceltext}}
            </v-btn>
            <v-btn
                color="red-darken-1"
                variant="text"
                @click="submit"
            >
              {{submittext}}
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
  name: "Popup",
  data() {
    return {
      is_form_open: this.immediately_open,
    }
  },

  props: {
    immediately_open: {
      type: Boolean,
      default: false
    },
    dismissable: {
      type: Boolean,
      default: true
    },

    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },

    submittext: {
      type: String,
      default: "Continue"
    },
    canceltext: {
      type: String,
      default: "Cancel"
    },

    oncancel: {
      type: Function,
      default: ()=>{}
    },
    onsubmit: {
      type: Function,
      default: ()=>{}
    }
  },

  methods: {
    open() {
      this.is_form_open = true
    },

    submit() {
      this.is_form_open = false;
      this.onsubmit()
    },
    cancel() {
      this.is_form_open = false;
      this.oncancel()
    }
  },

});
</script>


<style scoped>

</style>
