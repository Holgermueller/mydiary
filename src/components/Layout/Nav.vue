<template>
  <div id="nav">
    <v-app-bar fixed dense color="#DEB887">
      <div v-for="link in menuLinks" :key="link.title" link>
        <v-btn :to="link.link" elevation="0" color="#DEB887">
          <v-icon left>
            {{ link.icon }}
          </v-icon>
          {{ link.title }}
        </v-btn>
      </div>

      <TimePicker v-if="userIsAuthenticated" />

      <v-spacer></v-spacer>

      <SignOut v-if="userIsAuthenticated" />
    </v-app-bar>
  </div>
</template>

<script>
import SignOut from "./SignOut";
import TimePicker from "../DashComponents/TimePicker";

export default {
  name: "Nav",

  data() {
    return {
      userId: null,
    };
  },

  components: {
    SignOut,
    TimePicker,
  },

  computed: {
    userName() {
      return this.$store.getters.user.displayName;
    },

    loading() {
      return this.$store.getters.loading;
    },

    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },

    menuLinks() {
      let menuLinks = [
        {
          icon: "mdi-home",
          title: "Home",
          link: "/",
        },
      ];
      if (this.userIsAuthenticated) {
        menuLinks = [
          {
            icon: "mdi-account",
            title: "Dashboard",
            link: "/dashboard",
          },
          {
            icon: "mdi-account",
            title: "Settings",
            link: "/settings",
          },
          {
            icon: "mdi-notebook",
            title: "Previous",
            link: "/previous",
          },
        ];
      }
      return menuLinks;
    },
  },

  watch: {
    user(value) {
      return value;
    },
  },
};
</script>

<style scoped></style>
