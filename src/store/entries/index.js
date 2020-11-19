import firebase from "../../firebase/fbInit";

export default {
  state: {
    entries: [],
  },

  mutations: {},

  actions: {
    addEntry({ commit }, payload) {
      commit("SET_LOADING", true);

      firebase
        .collection("diaryEntries")
        .add({
          title: payload.title,
          todaysThoughts: payload.todaysThoughts,
          entryDate: new Date(),
        })
        .then(() => {
          commit("SET_LOADING", false);
        })
        .catch((err) => {
          commit("SET_LOADING", true);
          commit("SET_ERROR", err);
        });
    },
  },

  getters: {
    entries(state) {
      return state.entries;
    },
  },
};
