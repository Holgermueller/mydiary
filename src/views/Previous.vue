<template>
  <div id="previous">
    <v-card class="previous-entries">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Some Date</v-expansion-panel-header>
          <v-expansion-panel-content>
            some content
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Previous",
};
</script>

<style scoped>
.previous-entries {
  width: 75%;
  margin: 10% auto;
}
</style>
