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

    ADD_REMINDER_TIME(state, payload) {
      state.user = payload;
    },
  },

  actions: {
    registerUser({ commit }, payload) {
      commit("SET_LOADING", true);
      commit("CLEAR_ERROR");

      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((userCredential) => {
          const userToUpdate = firebase.auth().currentUser;
          userToUpdate
            .updateProfile({
              displayName: payload.displayName,
            })
            .then(() => {
              commit("SET_LOADING", false);
            })
            .catch((err) => {
              commit("SET_LOADING", true);
              commit("SET_ERROR", err);
            });

          const user = userCredential.user;
          const newUser = {
            displayName: payload.displayName,
            email: user.email,
            userId: user.uid,
          };

          commit("SET_USER", newUser);

          db.collection("userProfiles")
            .add({
              displayName: payload.displayName,
              email: user.email,
              uid: user.uid,
            })
            .then(() => {
              commit("SET_LOADING", false);
            })
            .catch((err) => {
              commit("SET_LOADING", true);
              commit("SET_ERROR", err);
            });
        })
        .catch((err) => {
          commit("SET_LOADING", true);
          commit("SET_ERROR", err);
        });
    },

    login({ commit }, payload) {
      commit("SET_LOADING", true);
      commit("CLEAR_ERROR");

      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const signedInUser = {
            email: user.user.email,
            id: user.user.id,
            displayName: user.user.displayName,
          };
          commit("SET_LOADING", false);
          commit("SET_USER", signedInUser);
        })
        .catch((err) => {
          commit("SET_LOADING", true);
          commit("SET_ERROR", err);
        });
    },

    autoSignIn({ commit }, payload) {
      commit("SET_LOADING", false);
      commit("SET_USER", {
        userId: payload.uid,
        email: payload.email,
        displayName: payload.displayName,
      });
    },

    addReminderTime({ commit }, payload) {
      commit("SET_LOADING", true);
      commit("CLEAR_ERROR");

      db.collection("userProfiles")
        .add({
          reminderTime: payload.reminderTime,
        })
        .then(() => {
          commit("SET_LOADING", false);
        })
        .catch((err) => {
          commit("SET_LOADING", true);
          commit("SET_ERROR", err);
        });
    },

    logout({ commit }) {
      commit("SET_LOADING", true);

      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("SET_USER", null);
          commit("SET_LOADING", false).catch((err) => {
            commit("SET_LOADING", true);
            commit("SET_ERROR", err);
          });
        });
    },
  },

  getters: {
    user(state) {
      return state.user;
    },
  },
};
