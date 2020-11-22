import firebase from "../../firebase/fbInit";

export default {
  state: {
    entries: [],
  },

  mutations: {
    SET_ENTRIES(state, payload) {
      state.entries = payload;
    },
  },

  actions: {
    getAllEntries({ commit }) {
      commit("SET_LOADING", true);

      firebase.collection("diaryEntries").onSnapshot(
        (querySnapshot) => {
          let entriesFromDB = [];
          querySnapshot.forEach((doc) => {
            let entryData = {
              entryId: doc.id,
              entryDate: doc.data().entryDate,
              title: doc.data().title,
              todaysThoughts: doc.data().todaysThoughts,
            };
            entriesFromDB.push(entryData);
          });
          commit("SET_ENTRIES", entriesFromDB);
          commit("SET_LOADING", false);
        },
        (err) => {
          commit("SET_LOADING", true);
          commit("SET_ERROR", err);
        }
      );
    },

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

    singleEntry(state) {
      return (entryId) => {
        return state.entries.find((entry) => {
          return entry.entryId === entryId;
        });
      };
    },
  },
};
