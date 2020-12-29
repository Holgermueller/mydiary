<template>
  <div id="settings">
    <v-card class="settings-card">
      <v-card-title>
        User Settings
      </v-card-title>

      <v-card-text>
        <v-expansion-panels inset>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Change Username:
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-text-field
                v-model="editedUsername"
                :placeholder="user.displayName"
                outlined
                clearable
              >
              </v-text-field>
              <v-btn color="blue" dark>
                <v-icon left>mdi-check</v-icon>
                Submit</v-btn
              >
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              Change Email:
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-text-field
                v-model="editedEmail"
                :placeholder="user.email"
                outlined
                clearable
              ></v-text-field>
              <v-btn color="blue" dark>
                <v-icon left>mdi-check</v-icon>
                Submit</v-btn
              >
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              Change password:
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-btn
                @click.prevent="sendPasswordResetEmail"
                color="blue"
                block
                dark
              >
                <v-icon left>mdi-email-send-outline</v-icon>
                Send email to reset password
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              Delete Account:
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <ReAuth />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import ReAuth from "../components/SettingsComponents/ReAuth";

export default {
  name: "Settings",

  data() {
    return {
      editedUsername: "",
      editedEmail: "",
      editedPassword: "",
      confirmEditedPassword: "",
    };
  },

  components: {
    ReAuth,
  },

  created() {
    return this.$store.getters.user;
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
  },

  methods: {
    sendPasswordResetEmail() {
      this.$store.dispatch("resetPassword");
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
