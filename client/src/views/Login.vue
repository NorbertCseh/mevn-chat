<template>
  <form>
    <v-text-field label="email" tpye="email" v-model="email"></v-text-field>
    <v-text-field
      label="password"
      type="password"
      v-model="password"
    ></v-text-field>

    <v-btn class="mr-4" @click="sendLoginData()">submit</v-btn>
    <v-btn>clear</v-btn>
  </form>
</template>

<script>
import Axios from 'axios'
import jwt from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'

export default {
  data: () => ({
    email: '',
    password: '',
    isAuthenticated: false
  }),
  methods: {
    sendLoginData() {
      Axios.post('http://localhost:3000/api/user/login', {
        email: this.email,
        password: this.password
      })
        .then(res => {
          const { token } = res.data
          localStorage.setItem('jwtToken', token)
          setAuthToken(token)
          //Set isAuthenticated to true in the store
          //deocec value should be the user, save it in the store

          const decoded = jwt(token)
          // After decode we should get the user data and add it to the store
          console.log(decoded)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style></style>
