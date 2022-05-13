import {authFirebase, logout} from "@/utils/firebase.config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import {firebaseUrlUsers} from "@/utils/firebaseUrl";

export default {
  state: {
    user: null,
  },
  getters: {
    user(state) {
      return state.user
    },
  },
  mutations: {
    updateUser(state, user) {
      state.user = user;
    },

    updateName(state, name) {
      state.user.name = name;
    }
  },
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        const signUser = await signInWithEmailAndPassword(authFirebase, email, password);
        localStorage.setItem('token', signUser.user.uid)
      } catch (e) {
        commit('changeError', e)
        throw e
      }
    },

    async logout({commit}) {
      await logout;
      commit('clearInfo');
    },

    async register({dispatch, commit}, {email, password, name, money}) {
      try {
        await createUserWithEmailAndPassword(authFirebase, email, password);
        const uid = await dispatch('getUid');

        await fetch(`${firebaseUrlUsers}${uid}.json`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email, name, money,
          })
        });
        localStorage.setItem('token', uid)
      } catch (e) {
        commit('changeError', e);
        throw e;
      }
    },

    async getUser({dispatch, commit}) {
      const uid = await dispatch('getUid');
      const res = await fetch(firebaseUrlUsers + uid + '.json');
      const result = await res.json();
      await commit('updateUser', result);
    },

    async changeName({dispatch, commit, getters}, userName) {
      const uid = await dispatch('getUid');
      await fetch(`${firebaseUrlUsers}${uid}.json`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...getters.user, name: userName
        })
      });
      commit('updateName', userName)
    }
  }
}
