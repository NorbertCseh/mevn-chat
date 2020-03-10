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
export default {
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    sendLoginData() {
      Axios.post('http://localhost:3000/api/user/login', {
        email: this.email,
        password: this.password
      })
        .then(res => {
          console.log('sentt')
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style></style>
