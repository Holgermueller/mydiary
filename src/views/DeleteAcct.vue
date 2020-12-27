<template>
  <div id="DeleteAcct">
    <v-card class="delete-acct">
      <v-card-title>
        Delete Account.
      </v-card-title>
      <v-card-subtitle>
        Are you certain you want to delete your account?
      </v-card-subtitle>
      <v-card-text>
        <h6>This action cannot be reversed.</h6>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn to="/dashboard" color="red" dark>
          <v-icon left>mdi-cancel</v-icon>
          cancel</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          @click.prevent="deleteUser"
          :loading="loading"
          :disabled="loading"
          color="teal"
          dark
        >
          <v-icon left>mdi-check</v-icon>
          yes</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "DeleteAcct",

  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    error() {
      return this.$store.getters.error;
    },
  },

  data() {
    return {};
  },

  methods: {
    deleteUser() {
      this.closeDialog();

      return this.$store.dispatch("deleteUser");
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

<style scoped>
.delete-acct {
  width: 75%;
  margin: 7% auto;
}
</style>
