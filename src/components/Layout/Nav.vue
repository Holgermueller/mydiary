<template>
  <div id="nav">
    <v-app-bar fixed dense>
      <div v-for="link in menuLinks" :key="link.title" link>
        <v-btn :to="link.link">
          <v-icon left>
            {{ link.icon }}
          </v-icon>
          {{ link.title }}
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <SignOut />
    </v-app-bar>
  </div>
</template>

<script>
import SignOut from "./SignOut";

export default {
  name: "Nav",

  data() {
    return {};
  },

  components: {
    SignOut,
  },

  computed: {
    menuLinks() {
      let menuLinks = [
        {
          icon: "mdi-home",
          title: "Home",
          link: "/",
        },
        {
          icon: "mdi-account",
          title: "Dashboard",
          link: "/dashboard",
        },
        {
          icon: "mdi-notebook",
          title: "Previous",
          link: "/previous",
        },
      ];
      return menuLinks;
    },
  },
};
</script>

<style scoped></style>
