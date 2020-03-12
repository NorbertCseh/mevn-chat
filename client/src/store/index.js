import Vue from 'vue'
import Vuex from 'vuex'
import setAuthToken from '../utils/setAuthToken'
import jwt from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    user: null
  },
  mutations: {
    loggedin(state, token) {
      localStorage.setItem('jwtToken', token.token)
      setAuthToken(token.token)
      //Set isAuthenticated to true in the store
      //deocec value should be the user, save it in the store

      const decoded = jwt(token.token)
      state.user = decoded
      state.isAuthenticated = !this.isAuthenticated
    }
  },
  actions: {},
  modules: {}
})
