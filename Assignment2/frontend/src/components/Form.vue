<!-- form template in Vue -->
<template>
    <v-container fluid class="h-100 pa-0 bg-white text-red d-flex justify-center align-center">
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
                    v-model="age"
                    :rules="ageRules"
                    label="Age"
                    required
                ></v-text-field>
                <!-- options checkbox -->
                <v-select
                    v-model="genders.selected"
                    :items="genders"
                    :rules="[v => !!v || 'Please insert gender']"
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
                    <!-- <v-container fluid class="h-100 pa-0 bg-white d-flex justify-center align-center flex-column"> -->
                    <section class="d-flex flex-row flex-no-wrap justify-space-around">

                        <label v-for="language in programmingLanguages">
                            <v-checkbox type="checkbox" v-model="language.selected"> {{language.name}}</v-checkbox>
                        </label>

                    </section>

                        
                    <!-- other languages -->
                    <v-text-field v-if="programmingLanguages[6].selected"
                        v-model="other_language"
                        :rules="[v => !!v || 'Please insert other language']"
                        label="Other language you know"
                        required
                    ></v-text-field>

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
                    <section class="d-flex flex-row flex-wrap justify-space-around">

                        <label v-for="ide in IDES">
                            <v-checkbox type="checkbox" v-model="ide.selected"> {{ide.name}}</v-checkbox>
                        </label>

                    </section>

                    <v-text-field v-if="IDES[IDES.length - 1].selected"
                        v-model="other_IDE"
                        :rules="[v => !!v || 'Please insert other IDE']"
                        label="IDE you use"
                        required
                    ></v-text-field>
                        
                </section>
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
            (v) => !!v || "Name is required"
        ],
        age: "",
        ageRules: [
            (v) => !!v || "Age is required",
            (v) => (v && v.length <= 3) || "Age must be less than 3 characters",
            (v) => !isNaN(v) || "Age must be a number",
            (v) => (v && v >= 18) || "You must be at least 18 years old to continue",
        ],
        checkboxP: false,

        genders: ["Female", "Male", "Other"],

        programmingLanguages: [
            { id: 1, name: "Java", selected: false },
            { id: 2, name: "JavaScript", selected: false },
            { id: 3, name: "Python", selected: false },
            { id: 4, name: "C++", selected: false },
            { id: 5, name: "C#", selected: false },
            { id: 6, name: "C", selected: false },
            { id: 7, name: "Other", selected: false }
        ],
        other_language: "",
        
        time: ["Less than 1 year", "1-3 years", "3-5 years", "5-10 years", "More than 10 years"],
        hours: ["Less than 1 hour", "1-3 hours", "3-5 hours", "5-10 hours", "More than 10 hours"],
        IDES: [
            {id : 1, name: "Eclipse", selected: false},
            {id : 2, name: "NetBeans", selected: false},
            {id : 3, name: "IntelliJ", selected: false},
            {id : 4, name: "PyCharm", selected: false},
            {id : 5, name: "Atom", selected: false},
            {id : 6, name: "Sublime Text", selected: false},
            {id : 7, name: "Visual Studio Code", selected: false},
            {id : 8, name: "Other", selected: false}
        ],
        other_IDE: "",
        //  ["Eclipse", "NetBeans", "IntelliJ", "PyCharm", "Atom", "Sublime Text", "Visual Studio Code", "Other"],

        };
    },
    props: {
      onsubmit: {
        type: Function,
        default: ()=>{}
      }
    },
    methods: {
        concatOtherLanguage() {
            if (this.programmingLanguages[6].selected) {
                this.programmingLanguages[6].name = this.other_language
            }
        },
        select_IDE() {
            if (this.IDES[7].selected) {
                this.IDES[7].name = this.other_IDE
            }
        },
        async submit() {
          console.log(await this.$refs.form.validate())
          if (true || (await this.$refs.form.validate()).valid) {
            console.log("Validation Success")
            this.select_IDE();
            this.concatOtherLanguage();
            // concatOtherLanguage();
            let client = {
                name: this.name,
                email: this.email,
                age: this.age,
                gender: this.genders.selected,
                programmer: this.checkboxP,
                programmingLanguages: this.programmingLanguages.filter((language) => language.selected),
                time: this.time.selected,
                hours: this.hours.selected,
                IDE: this.IDES.filter((ide) => ide.selected),
            }
            console.log(client)
            store.commit('registerClient', client)
            this.onsubmit()
          } else {
            console.log("Validation Failed")
          }
        },
    },
});

</script>

<style scoped>

#languages {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
}

</style>