<template>
  <div id="login">
    <v-form ref="form">
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-text-field
          v-model="email"
          label="Email"
          prepend-inner-icon="mdi-account-circle"
          outlined
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-text-field
          v-model="password"
          label="Password"
          prepend-inner-icon="mdi-lock"
          outlined
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-flex>
    </v-form>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn color="red" @click.prevent="clearForm" dark>
        <v-icon left>mdi-close-circle</v-icon>
        cancel
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="blue"
        dark
        @click.prevent="loginUser"
        :loading="loading"
        :disabled="loading"
      >
        <v-icon left>mdi-check-bold</v-icon>
        Submit
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      showPassword: "",
      currentUser: false,
      userId: null,
      errorFromDom: "",
    };
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },

  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("./dashboard");
      }
    },
  },

  methods: {
    loginUser() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
        userId: this.userId,
        currentUser: this.currentUser,
      });
      this.clearForm();
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
