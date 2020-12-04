<template>
  <v-app>
    <v-main>
      <Nav />
      <router-view></router-view>
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Nav from "./components/Layout/Nav";
import Footer from "./components/Layout/Footer";

export default {
  name: "App",

  components: {
    Nav,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
main {
  background-image: url("./assets/notepad.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
