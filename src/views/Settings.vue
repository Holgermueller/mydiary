<template>
  <div id="settings">
    <v-card class="settings-card">
      <v-card-title>
        User Settings
      </v-card-title>

      <v-card-text>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              {{ user.displayName }}
            </v-expansion-panel-header>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              {{ user.email }}
            </v-expansion-panel-header>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Settings",

  created() {
    return this.$store.getters.user;
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style scoped>
#settings {
  margin: 7% auto;
}
.settings-card {
  width: 75%;
  margin: 1% auto;
}
</style>
