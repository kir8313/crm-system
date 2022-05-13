import {firebaseUrlUsers} from "@/utils/firebaseUrl";

export default {
  state: {
    info: {},
  },
  actions: {
    async getInfo({dispatch, commit}) {
      const uid = await dispatch('getUid');
      const response = await fetch(firebaseUrlUsers + uid + '.json');
      const result = await response.json();
      commit('setInfo', result)
    },

    async updateInfo({dispatch, commit, getters}, money) {
      const uid = await dispatch('getUid');
      const newUserInfo = {...getters.info, money};
      await fetch(firebaseUrlUsers + uid +'.json', {
        method: "PUT",
        body: JSON.stringify(newUserInfo)
      });
      commit('setInfo', newUserInfo);
    },
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
      localStorage.removeItem('token')
    }
  },
  getters: {
    info(state) {
      return state.info;
    }
  }
}