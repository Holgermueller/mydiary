<template>
  <div id="home">
    <LoginRegistration />
  </div>
</template>

<script>
import LoginRegistration from "../components/LoginRegistration/LoginRegistrationTabs";

export default {
  name: "Home",

  components: {
    LoginRegistration,
  },
};
</script>

<style scoped>
.home {
  width: 55%;
  margin: 10% auto;
}
</style>
