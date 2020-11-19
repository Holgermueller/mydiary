<template>
  <div id="previous">
    <v-layout row v-if="error">
      <v-flex xs12 sm12 md12 lg12 xl12>
        <app-alert
          @dismissed="onDismissed"
          :text="error.message || error"
        ></app-alert>
      </v-flex>
    </v-layout>

    <v-layout class="progress">
      <v-flex class="tet-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"
        ></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-card class="previous-entries">
      <v-expansion-panels>
        <v-expansion-panel v-for="(entry, index) in getEntries" :key="index">
          <v-expansion-panel-header>{{ entry.title }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            {{ entry.todaysThoughts }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Previous",

  created() {
    return this.$store.dispatch("getAllEntries");
  },

  computed: {
    getEntries() {
      return this.$store.getters.entries;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>

<style scoped>
.previous-entries {
  width: 75%;
  margin: 10% auto;
}
</style>
