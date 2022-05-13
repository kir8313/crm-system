import {firebaseUrlCategory} from "@/utils/firebaseUrl";

export default {
  state: {
    categories: [],
  },
  getters: {
    categories(state) {
      return state.categories;
    }
  },
  mutations: {
    setCategories(state, newCategories) {
      state.categories = newCategories;
    },
    updateCategories(state, newCategory) {
      state.categories.push(newCategory);
    },
    changeCategory(state, {id, title, limit}) {
      const categoryIdx = state.categories.findIndex(item => item.id === id);
      state.categories[categoryIdx] = {id, title, limit};
    }
  },
  actions: {
    async sendCategory({dispatch, commit, getters}, {title, limit}) {
      try {
        await dispatch('getCategories');

        const uid = await dispatch('getUid');
        await fetch(`${firebaseUrlCategory}${uid}.json`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({title, limit})
        });
        commit('updateCategories', { id: Date.now(), title, limit})
        localStorage.setItem('categories', JSON.stringify(getters.categories));
      } catch (e) {
        commit('changeError', e)
        throw e
      }
    },

    async getCategories({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid');
        const response = await fetch(`${firebaseUrlCategory}${uid}.json`);
        const categories = await response.json();
        if (categories !== null) {
          const newCategories = Object.keys(categories).map(key => ({...categories[key], id: key}))
          commit('setCategories', newCategories);
          localStorage.setItem('categories', JSON.stringify(newCategories))
        } else {
          console.log('categories = null')}
      } catch (e) {}
    },

    async getCategoryById({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUid');
        const response = await fetch(`${firebaseUrlCategory}${uid}/${id}.json`);
        const category = await response.json();
        if (category !== null) {
          return {...category, id}
        } else {
          console.log('this category = null')}
      } catch (e) {}
    },

    async changeCategory({dispatch, commit, getters}, {title, limit, id}) {
      try {
        const uid = await dispatch('getUid');
        await fetch(`${firebaseUrlCategory}${uid}/${id}.json`, {
          method: 'PUT',
          body: JSON.stringify({title, limit})
        });
        commit('changeCategory', { id, title, limit})
        localStorage.setItem('categories', JSON.stringify(getters.categories));
      } catch (e) {
        commit('changeError', e)
        throw e
      }
    },
  }
}