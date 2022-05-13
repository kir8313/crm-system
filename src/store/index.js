import {createStore} from 'vuex';
import auth from "./auth";
import info from "./info";
import category from "./category";
import record from "./record";
import {authFirebase} from "@/utils/firebase.config";

export default createStore({
  state: {
    error: null,
    isOpen: true,
  },
  getters: {
    error(state){
      return state.error
    },
    isOpen(state) {
      return state.isOpen;
    }
  },
  mutations: {
    changeError(state, error) {
      state.error = error;
    },
    resetError(state) {
      state.error = null;
    },
    changeIsOpen(state) {
      state.isOpen = !state.isOpen;
    }
  },
  actions: {
    async getCurrency() {
      const res = await fetch(`https://webservice.1prime.ru/pttable?host=1prime.ru&encoding=utf-8&template=prime_fxcur_jsonp&time=${Date.now()}`);
      return await  res.json();
    },

    async getUid() {
      const user = authFirebase.currentUser
      return user ? user.uid : localStorage.getItem('token') ? localStorage.getItem('token') :  null;
    },
  },
  modules: {
    auth, info, category, record
  }
})
