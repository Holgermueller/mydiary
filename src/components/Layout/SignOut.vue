<template>
  <div>
    <v-btn
      @click.prevent="signOut"
      :loading="loading"
      :disabled="loading"
      elevation="0"
      color="#DEB887"
    >
      <v-icon left>mdi-logout</v-icon>
      Sign Out
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "SignOut",

  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },

  methods: {
    signOut() {
      this.$store.dispatch("logout");
      this.$router.go({ path: this.$router.path });
    },
  },
};
</script>

<style scoped></style>
