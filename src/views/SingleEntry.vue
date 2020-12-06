<template>
  <div>
    <v-card class="entry-card">
      <v-card-title>
        Title: {{ entry.title }}
        <v-spacer></v-spacer>
        {{ entry.entryDate.toDate() | formatEntryDate }}
      </v-card-title>
      <v-card-text class="entry-display">
        {{ entry.todaysThoughts }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn to="/previous">
          Back
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "SingleEntryPage",

  props: {
    entryId: {
      type: String,
    },

    entryDate: {
      type: String,
    },
  },

  computed: {
    entry() {
      return this.$store.getters.singleEntry(this.entryId);
    },
  },

  filters: {
    formatEntryDate(value) {
      return moment(value).format("Do MMMM YYYY");
    },
  },
};
</script>

<style scoped>
.entry-card {
  width: 85%;
  margin: 10% auto;
}
.entry-display {
  white-space: pre-wrap;
}
</style>
