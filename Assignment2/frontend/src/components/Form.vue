<!-- form template in Vue -->
<template>
    <v-container fluid class="h-100 pa-0 bg-white text-red d-flex justify-center align-center flex-column">
        <v-row class="d-flex justify-center align-center flex-column">
        <v-col cols="12" md="8" lg="6">
            <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Name"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"

                ></v-text-field>
                <v-text-field
                    v-model="age"
                    :rules="ageRules"
                    label="Age"
                    required
                ></v-text-field>
                <!-- options checkbox -->
                <v-select
                    v-model="genders.selected"
                    :items="genders"
                    :rules="[v => !!v || 'Please inser gender']"
                    label="Gender"
                    required
                ></v-select>
                <!-- checkbox programmer -->
                <v-checkbox
                    v-model="checkboxP"
                    :rules="[]"
                    label="Do you code?"
                ></v-checkbox>
                <section v-if="checkboxP">

                    <!-- select programming languages -->
                    <v-container fluid class="h-100 pa-0 bg-white d-flex justify-center align-center flex-column">
                        <!-- fatto male male :((((( -->

                        
                        <label id="languages" v-for="language in programmingLanguages">
                            <v-checkbox type="checkbox" v-model="language.selected"> {{language.name}}></v-checkbox>
                        </label>
                    </v-container>

                    <!-- select time -->
                    <v-select
                        v-model="time.selected"
                        :items="time"
                        :rules="[v => !!v || 'Please select an option']"
                        label="How long have you been programming?"
                        required
                    ></v-select>

                    <!-- select experience -->
                    <v-select
                        v-model="hours.selected"
                        :items="hours"
                        :rules="[v => !!v || 'Please select an option']"
                        label="How much hours do you spend coding during a day?"
                        required
                    ></v-select>

                    <!-- select IDE -->
                    <v-select
                        v-model="IDE.selected"
                        :items="IDE"
                        :rules="[v => !!v || 'Please select an option']"
                        label="What IDE do you use?"
                        required
                    ></v-select>
                        
                </section>
                <!-- checkbox agreement -->
                <v-checkbox
                    v-model="checkboxA"
                    :rules="agreementRules"
                    label="I agree to the terms and conditions"
                    required
                ></v-checkbox>
                <!-- <section v-if="checkboxA">
                    <v-btn color="primary" @click="submit">Submit</v-btn>
                </section> -->
                </v-form>
                </v-card-text>
            </v-card>
            </v-col>
            </v-row>
        </v-container>
</template>

<script>
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
    name: "Form",

    components: {

    },

    data() {
        return {
        valid: true,
        name: "",
        nameRules: [
            (v) => !!v || "Name is required",
            (v) => (v && v.length <= 15) || "Name must be less than 15 characters",
        ],
        email: "",
        emailRules: [
            (v) => !!v || "E-mail is required",
            (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        age: "",
        ageRules: [
            (v) => !!v || "Age is required",
            (v) => (v && v.length <= 3) || "Age must be less than 3 characters",
            (v) => !isNaN(v) || "Age must be a number",
            (v) => (v && v >= 18) || "You must be at least 18 years old to continue",
        ],
        checkboxP: false,

        checkboxA: false,
        agreementRules: [(v) => !!v || 'You must agree to continue'],

        genders: ["Female", "Male", "Other"],

        programmingLanguages: [
            { id: 1, name: "Java", selected: false },
            { id: 2, name: "JavaScript", selected: false },
            { id: 3, name: "Python", selected: false },
            { id: 4, name: "C++", selected: false },
            { id: 5, name: "C#", selected: false },
            { id: 6, name: "C", selected: false },
            { id: 7, name: "Other", selected: false },
        ],

        time: ["Less than 1 year", "1-3 years", "3-5 years", "5-10 years", "More than 10 years"],
        hours: ["Less than 1 hour", "1-3 hours", "3-5 hours", "5-10 hours", "More than 10 hours"],
        IDE: ["Visual Studio", "Eclipse", "NetBeans", "IntelliJ", "PyCharm", "Atom", "Sublime Text", "Visual Studio Code", "Other"],

        };
    },
    props: {
      onsubmit: {
        type: Function,
        default: ()=>{}
      }
    },
    methods: {
        async submit() {
          console.log(await this.$refs.form.validate())
          if ((await this.$refs.form.validate()).valid) {
            console.log("Validation Success")
            let client = {
                name: this.name,
                email: this.email,
                age: this.age,
                gender: this.genders.selected,
                programmer: this.checkboxP,
                programmingLanguages: this.programmingLanguages.filter((language) => language.selected),
                time: this.time.selected,
                hours: this.hours.selected,
                IDE: this.IDE.selected,
            }
            console.log(client)
            // store.commit('registerClient', client)
            this.onsubmit()
          } else {
            console.log("Validation Failed")
          }
        },
    },
});

</script>

<style scoped>

/* #languages {
    display: block;
    margin: 0 0 10px 0;
} */

</style>