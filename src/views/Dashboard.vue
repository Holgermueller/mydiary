<template>
  <div>
    <v-card class="compose-card">
      <v-card-title>
        <v-icon left>mdi-lead-pencil</v-icon>
        Write something here:
      </v-card-title>

      <v-card-text>
        <v-form ref="form">
          <v-text-field
            label="Title"
            v-model="title"
            outlined
            clearable
          ></v-text-field>

          <v-textarea
            label="Today's thoughts:"
            v-model="todaysThoughts"
            outlined
          ></v-textarea>
        </v-form>

        <v-layout row v-if="error">
          <v-flex xs12 sm12 md12 lg12 xl12>
            <app-alert
              @dismissed="onDismissed"
              :text="error.message || error"
            ></app-alert>
          </v-flex>
        </v-layout>

        <v-layout row v-if="domError">
          <v-flex xs12 sm12 md12 lg12 xl12>
            <app-alert @dismissed="onDismissed" :text="domError"></app-alert>
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          @click.prevent="checkForm"
          :loading="loading"
          :disabled="loading"
          block
          color="blue"
          dark
        >
          Submit
          <v-icon right>mdi-upload</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Dashboard",

  data() {
    return {
      title: "",
      todaysThoughts: "",
      domError: "",
    };
  },

  components: {},

  computed: {
    loading() {
      return this.$store.getters.loading;
    },

    error() {
      return this.$store.getters.error;
    },
  },

  methods: {
    submitEntry() {
      this.$store.dispatch("addEntry", {
        title: this.title,
        todaysThoughts: this.todaysThoughts,
      });

      this.clearForm();
    },

    checkForm() {
      if (!this.title || !this.todaysThoughts) {
        this.domError = "Please fill in both fields.";
      } else {
        this.submitEntry();
      }
    },

    clearForm() {
      this.$refs.form.reset();
    },

    onDismissed() {
      this.$store.dispatch("clearError");
    },
  },
};
</script>

<style scoped>
.compose-card {
  width: 75%;
  margin: 10% auto;
}
</style>
