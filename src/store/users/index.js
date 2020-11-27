import firebase from "firebase/app";
import db from "../../firebase/fbInit";

export default {
  state: {
    user: null,
  },

  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },

    UPDATE_USERNAME(state, payload) {
      state.user = payload;
    },
  },

  actions: {},

  getters: {
    user(state) {
      return state.user;
    },
  },
};
