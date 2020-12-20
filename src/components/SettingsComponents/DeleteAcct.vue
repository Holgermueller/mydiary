<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" block>
          Delete Account
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          Delete Account
        </v-card-title>

        <v-card-subtitle>
          Are you certain you want to delete your account?
        </v-card-subtitle>

        <v-card-text>
          <h5>This action cannot be reversed.</h5>

          <v-layout row v-if="error">
            <v-flex xs12 sm12 md12 lg12 xl12>
              <app-alert
                @dismissed="onDismissed"
                :text="error.message || error"
              ></app-alert>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click.prevent="closeDialog">No</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            @click.prevent="deleteUser"
            :loading="loading"
            :disabled="loading"
            >Yes</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DeleteAcct",

  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    error() {
      return this.$store.getters.error;
    },
  },

  data() {
    return {
      dialog: false,
    };
  },

  methods: {
    deleteUser() {
      this.closeDialog();

      return this.$store.dispatch("deleteUser");
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
