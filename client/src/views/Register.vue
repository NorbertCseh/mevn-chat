<template>
  <form>
    <v-text-field label="Email" tpye="email" v-model="email"></v-text-field>
    <v-text-field
      label="Password"
      type="password"
      v-model="password"
    ></v-text-field>
    <v-text-field
      label="Display Name"
      type="text"
      v-model="displayName"
    ></v-text-field>
    <v-text-field label="Avatar URL" type="URL" v-model="avatar"></v-text-field>

    <v-btn class="mr-4" @click="sendRegisrerData()">submit</v-btn>
    <v-btn>clear</v-btn>
  </form>
</template>

<script>
import Axios from 'axios'
export default {
  data: () => ({
    email: '',
    password: '',
    displayName: '',
    avatar: ''
  }),
  methods: {
    sendRegisrerData() {
      Axios.post('http://localhost:3000/api/user/register', {
        email: this.email,
        password: this.password,
        displayName: this.displayName,
        avataar: this.avatar
      })
        .then(res => {
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
