import { createStore } from "vuex";

export default createStore({
  state: {
    content: null,
    isLoading: false,
  },
  mutations: {
    setContent(state, newContent) {
      state.content = newContent;
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    updateContent({ commit }, newContent) {
      commit("setContent", newContent);
    },
  },
});