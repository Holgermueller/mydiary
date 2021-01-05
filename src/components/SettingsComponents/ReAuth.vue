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
          Please Reauthenticate Your Account Before You Delete It
        </v-card-title>

        <v-card-subtitle>
          We just want to make sure you're not doing this by mistake.
        </v-card-subtitle>

        <v-card-text>
          <v-layout row v-if="error">
            <v-flex xs12 sm12 md12 lg12 xl12>
              <app-alert
                @dismissed="onDismissed"
                :text="error.message"
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
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              label="Confirm password"
              outlined
              :type="showConfirmPassword ? 'text' : 'password'"
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showConfirmPassword = !showConfirmPassword"
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
            :disabled="
              loading ||
                validateEmail ||
                validatePassword ||
                validateConfirmPassword ||
                confirmPasswordsMatch
            "
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

    validateEmail() {
      return this.email === "";
    },

    validatePassword() {
      return this.password === "";
    },

    validateConfirmPassword() {
      return this.confirmPassword === "";
    },

    confirmPasswordsMatch() {
      return this.password === "";
    },
  },

  data() {
    return {
      dialog: false,
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
    };
  },

  methods: {
    reAuth() {
      this.$store.dispatch("reAuthUser", {
        email: this.email,
        password: this.password,
      });
      let res;

      console.log(res);

      // if (!this.error) {
      //   this.closeDialog();

      //   this.$refs.form.reset();

      //   this.$router.push("/DeleteAcct");
      // } else {
      //   console.log(this.error.message);
      // }
    },

    closeDialog() {
      this.dialog = false;

      this.resetForm();
    },

    resetForm() {
      this.$refs.form.reset();
    },

    onDismissed() {
      this.$store.dispatch("clearError");
    },
  },
};
</script>

<style scoped></style>
