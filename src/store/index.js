import Vue from "vue";
import Vuex from "vuex";

import shared from "./shared";
import entries from "./entries";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    shared,
    entries,
  },
});
