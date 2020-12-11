<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn elevation="0" color="#DEB887" v-bind="attrs" v-on="on">
          <v-icon left>mdi-clock-outline</v-icon>
          Set reminder
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          Set a time:
        </v-card-title>

        <v-card-subtitle>
          {{ uid }}
        </v-card-subtitle>

        <v-card-text>
          <h4>
            Set the latest time you want to be reminded to write in your
            journal.
          </h4>

          <v-time-picker
            landscape
            v-model="reminderTime"
            ampm-in-title
          ></v-time-picker>

          <v-layout row v-if="error">
            <v-flex xs12 sm12 md12 lg12 xl12>
              <app-alert
                @dismissed="onDismissed"
                :text="error.message || error"
              ></app-alert>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="closeDialog">
            <v-icon left>
              mdi-cancel
            </v-icon>
            Cancel</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn @click.prevent="setTime" :loading="loading" :disabled="loading"
            >Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "TimePicker",

  data() {
    return {
      dialog: false,
      reminderTime: "",
    };
  },

  computed: {
    loading() {
      return this.$store.getters.loading;
    },

    error() {
      return this.$store.getters.error;
    },

    uid() {
      return this.$store.getters.user.uid;
    },
  },

  methods: {
    setTime() {
      this.$store.dispatch("addReminderTime", {
        userId: this.uid,
        reminderTime: this.reminderTime,
      });
    },

    closeDialog() {
      this.dialog = false;
    },

    onDismissed() {
      this.$store.dispatch("clearError");
    },
  },
};
</script>

<style scoped></style>
