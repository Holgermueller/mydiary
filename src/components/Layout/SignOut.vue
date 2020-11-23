<template>
  <div>
    <v-btn @click.prevent="signOut">
      Sign Out
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "SignOut",

  methods: {
    signOut() {
      console.log("click");
    },
  },
};
</script>

<style scoped></style>
