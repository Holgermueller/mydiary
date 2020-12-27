<template>
  <div id="GoodBye">
    <v-card class="good-bye">
      <v-card-title>
        Good Bye!
      </v-card-title>
      <v-card-text>
        <p>We're sorry to see you go.</p>
        <p>If you change your mind, feel free to register a new account!</p>
      </v-card-text>
      <v-card-actions>
        <v-btn to="/" color="blue" dark block>
          <v-icon left>mdi-home</v-icon>
          Home</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "GoodBye",
};
</script>

<style scoped>
.good-bye {
  width: 75%;
  margin: 7% auto;
}
</style>
