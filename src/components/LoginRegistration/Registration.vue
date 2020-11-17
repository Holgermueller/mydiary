<template>
  <div id="register">
    <v-form ref="form">
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-text-field
          prepend-icon="mdi-account-circle"
          v-model="displayName"
          label="Username *"
          outlined
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-text-field
          prepend-icon="mdi-email"
          v-model="email"
          label="E-mail address *"
          outlined
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-text-field
          prepend-icon="mdi-lock"
          v-model="password"
          label="Password *"
          hint="Must have at least one capital letter, one symbol, one number, and be at least 8 characters"
          persistent-hint
          outlined
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-text-field
          prepend-icon="mdi-lock"
          v-model="confirmPassword"
          label="Confirm Password *"
          outlined
          :type="showConfirmPassword ? 'text' : 'password'"
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showConfirmPassword = !showConfirmPassword"
        ></v-text-field>
      </v-flex>
    </v-form>

    <small>* Indicates required field</small>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn color="red" @click.prevent="clearRegistrationForm" dark>
        <v-icon left>mdi-close-circle</v-icon>
        Cancel
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="blue"
        @click.prevent="registerUser"
        dark
        :loading="loading"
        :disabled="loading"
      >
        <v-icon left>mdi-check-bold</v-icon>
        Register
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "RegistrationForm",

  data() {
    return {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      valid: true,
      errorFromDom: "",
    };
  },

  computed: {
    // user() {
    //   return this.$store.getters.user;
    // },
    // error() {
    //   return this.$store.getters.error;
    // },
    // loading() {
    //   return this.$store.getters.loading;
    // },
  },

  methods: {
    registerUser() {
      //   this.$store.dispatch("registerUser", {
      //     email: this.email,
      //     password: this.password,
      //     displayName: this.displayName,
      //   });
    },
    clearFrom() {
      this.$refs.form.reset();
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    },
  },
};
</script>
