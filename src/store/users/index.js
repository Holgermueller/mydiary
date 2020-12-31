import firebase from "firebase/app";
import db from "../../firebase/fbInit";

export default {
  state: {
    user: null,
    userDocId: null,
  },

  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },

    SET_USER_DOC_ID(state, payload) {
      state.userDocId = payload;
    },

    UPDATE_USERNAME(state, payload) {
      state.user = payload;
    },

    ADD_REMINDER_TIME(state, payload) {
      const userToEdit = state.user.find((thisUser) => {
        return thisUser.uid === payload.uid;
      });
      if (payload.user) {
        userToEdit.reminderTime = payload.reminderTime;
      }
    },

    UPDATE_USER_INFO(state, payload) {
      const infoToEdit = state.user;

      if (payload.username) {
        infoToEdit.displayName = payload.username;
      }
      if (payload.email) {
        infoToEdit.email = payload.email;
      }
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
            uid: user.uid,
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
            uid: user.user.id,
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
        uid: payload.uid,
        email: payload.email,
        displayName: payload.displayName,
      });
    },

    getUserDocId({ commit, getters }) {
      commit("SET_LOADING", true);

      db.collection("userProfiles")
        .where("uid", "==", getters.user.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let userIdFromDb = {
              userDocId: doc.id,
            };
            commit("SET_USER_DOC_ID", userIdFromDb);
            commit("SET_LOADING", false);
          });
        })
        .catch((err) => {
          commit("SET_LOADING", true);
          commit("SET_ERROR", err);
        });
    },

    addReminderTime({ commit }, payload) {
      commit("SET_LOADING", true);
      commit("CLEAR_ERROR");

      db.collection("userProfiles")
        .doc(payload.userDocId)
        .update({
          reminderTime: payload.reminderTime,
        })
        .then(() => {
          commit("ADD_REMINDER_TIME", payload);
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
          commit("SET_LOADING", false);
        })
        .catch((err) => {
          commit("SET_LOADING", true);
          commit("SET_ERROR", err);
        });
    },

    resetPassword({ commit, getters }) {
      commit("SET_LOADING", true);

      firebase
        .auth()
        .sendPasswordResetEmail(getters.user.email)
        .then(() => {
          console.log("email sent!");
          commit("SET_LOADING", false);
        })
        .catch((err) => {
          commit("SET_LOADING", true);
          commit("SET_ERROR", err);
        });
    },

    reAuthUser({ commit }, payload) {
      commit("SET_LOADING", true);

      let credentials = firebase.auth.EmailAuthProvider.credential(
        payload.email,
        payload.password
      );

      firebase
        .auth()
        .currentUser.reauthenticateWithCredential(credentials)
        .then(() => {
          console.log("user reauthed!!");
        })
        .catch((err) => {
          commit("SET_LOADING", true);
          commit("SET_ERROR", err);
        });
    },

    deleteUser({ commit }) {
      commit("SET_LOADING", true);

      firebase
        .auth()
        .currentUser.delete()
        .then(() => {
          commit("SET_USER", null);
          commit("SET_LOADING", false);
        })
        .catch((err) => {
          commit("SET_LOADING", true);
          commit("SET_ERROR", err);
        });
    },
  },

  getters: {
    user(state) {
      return state.user;
    },

    userDocId(state) {
      return state.userDocId;
    },
  },
};
