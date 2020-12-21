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
              <v-text-field outlined> </v-text-field>
              <v-btn dark>
                <v-icon left>mdi-check</v-icon>
                Submit</v-btn
              >
              {{ user.displayName }}
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              Change Email:
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-text-field outlined></v-text-field>
              <v-btn dark>
                <v-icon left>mdi-check</v-icon>
                Submit</v-btn
              >
              {{ user.email }}
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              Change password:
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-text-field outlined></v-text-field>
              <v-btn dark>
                <v-icon left>mdi-check</v-icon>
                Submit</v-btn
              >
              {{ user.password }}
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              Delete Account:
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <DeleteAcct />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import DeleteAcct from "../components/SettingsComponents/DeleteAcct";

export default {
  name: "Settings",

  components: {
    DeleteAcct,
  },

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
