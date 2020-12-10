<template>
  <div id="previous">
    <v-layout class="error" row v-if="error">
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

    <v-expansion-panels class="previous-entries" inset>
      <v-expansion-panel v-for="(entry, index) in getEntries" :key="index">
        <v-expansion-panel-header
          >{{ entry.title }}
          <v-spacer></v-spacer>
          {{ entry.entryDate.toDate() | getMonthForDisplay }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ entry.todaysThoughts.substring(0, 8) + "..." }}

          <v-spacer></v-spacer>
          <v-btn
            :entryDate="entry.entryDate"
            :entryId="entry.entryId"
            :to="'/SingleEntryPage/' + entry.entryId"
          >
            Read more
            <v-icon right>mdi-arrow-right-bold</v-icon>
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Previous",

  data() {
    return {
      timeToFormat: "",
    };
  },

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

  filters: {
    getMonthForDisplay(value) {
      return moment(value).format("MMMM");
    },
  },
};
</script>

<style scoped>
.progress {
  width: 55%;
  margin: 1% auto;
}

.previous-entries {
  width: 75%;
  margin: 10% auto;
}

.error {
  margin-top: 14%;
}
</style>
