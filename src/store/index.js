import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uid: null,
    phoneNumber: null,
    displayName: null,
    studentID: null,
    order: null
  },
  mutations: {
    setUser(state, user) {
      state.uid = user.uid
      state.phoneNumber = user.phoneNumber
      state.displayName = user.displayName
      state.studentID = user.studentID
    },
    setOrder(state, order) {
      console.log({order})
      state.order = order
    }
  },
  getters: {
    uid(state) {
      return state.uid
    }
  }
})