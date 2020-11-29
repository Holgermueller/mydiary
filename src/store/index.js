import Vue from "vue";
import Vuex from "vuex";

import shared from "./shared";
import entries from "./entries";
import user from "./users";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    shared,
    entries,
    user,
  },
});
