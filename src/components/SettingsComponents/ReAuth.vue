<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" color="primary" dark block>
          <v-icon left>mdi-account</v-icon>
          Re Authenticate
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          Re Auth Before Delete
        </v-card-title>

        <v-card-text>
          <v-layout row v-if="error">
            <v-flex xs12 sm12 md12 lg12 xl12>
              <app-alert
                @dismissed="onDismissed"
                :text="error.message || error"
              ></app-alert>
            </v-flex>
          </v-layout>

          <v-form ref="form">
            <v-text-field
              v-model="email"
              label="Enter email"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Enter password"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              label="Confirm password"
              outlined
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn @click.prevent="closeDialog" color="red" dark>
            <v-icon left>mdi-cancel</v-icon>
            Cancel</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            @click.prevent="reAuth"
            :loading="loading"
            :disabled="loading"
            color="teal"
            dark
          >
            <v-icon left>mdi-check</v-icon>
            Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ReAuth",

  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    error() {
      return this.$store.getters.error;
    },
  },

  data() {
    return {
      dialog: false,
      email: "",
      password: "",
      confirmPassword: "",
    };
  },

  methods: {
    reAuth() {
      this.$store.dispatch("reAuthUser", {
        email: this.email,
        password: this.password,
      });

      this.closeDialog();

      this.$refs.form.reset();

      this.$router.push("/DeleteAcct");
    },

    closeDialog() {
      this.dialog = false;
    },

    onDismissed() {
      this.$store.dispatch("clearError");
    },
  },
};
</script>

<style scoped></style>
