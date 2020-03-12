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
    loggedin(token) {
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      //Set isAuthenticated to true in the store
      //deocec value should be the user, save it in the store

      const decoded = jwt(token)
      this.user = decoded
      this.isAuthenticated = !this.isAuthenticated
    }
  },
  actions: {},
  modules: {}
})
