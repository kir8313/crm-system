import {firebaseUrlRecord} from "@/utils/firebaseUrl";

export default {
  actions: {
    async sendAmount({dispatch, commit}, {id, typeMoney, amount, description, date}) {
      try {
        const uid = await dispatch('getUid');
        await fetch(firebaseUrlRecord + uid + '.json', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({id, typeMoney, amount, description, date})
        })
      } catch (e) {
        commit('changeError', e);
        throw e;
      }
    },
    async getAmounts({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid');
        const res = await fetch(firebaseUrlRecord + uid + '.json');
        const amounts = await res.json();
        if (amounts) {
          return Object.keys(amounts).map(key => ({...amounts[key], amountId: key}));
        } else {
          return amounts
        }
      } catch (e) {
        commit('changeError', e);
        throw e;
      }
    },

    async getAmountById({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUid');
        const res = await fetch(firebaseUrlRecord + uid + '.json');
        const amounts = await res.json();
        if (amounts) {
          const amount = Object.keys(amounts).map(key => ({...amounts[key], amountId: key})).find(item => item.amountId === id)
          return {...amount};
        } else {
          return amounts
        }
      } catch (e) {
        commit('changeError', e);
        throw e;
      }
    },


  }
}