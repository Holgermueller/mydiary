<template>
  <div>
    <v-card class="compose-card">
      <v-card-title>
        Write something here:
      </v-card-title>

      <v-card-text>
        <v-form ref="form">
          <v-text-field label="Title" v-model="title" outlined></v-text-field>

          <v-textarea
            label="Today's thoughts:"
            v-model="todaysThoughts"
          ></v-textarea>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn>
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Dashboard",

  data() {
    return {
      title: "",
      todaysThoughts: "",
    };
  },

  components: {},
};
</script>

<style scoped>
.compose-card {
  width: 75%;
  margin: 10% auto;
}
</style>
