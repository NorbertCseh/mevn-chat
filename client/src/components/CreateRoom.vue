<template>
  <form>
    <v-text-field label="Handle" tpye="text" v-model="handle"></v-text-field>
    <v-text-field label="Name" tpye="text" v-model="name"></v-text-field>
    <v-text-field
      label="Password"
      type="password"
      v-model="password"
    ></v-text-field>

    <v-text-field label="Avatar URL" type="URL" v-model="avatar"></v-text-field>

    <v-btn class="mr-4" @click="sendRegisrerData()">submit</v-btn>
    <v-btn>clear</v-btn>
  </form>
</template>

<script>
import Axios from 'axios'
export default {
  data: () => {
    return {
      name: '',
      password: '',
      avatar: ''
    }
  },
  methods: {
    sendRoomData() {
      Axios.get('')
    }
  }
}
</script>

<style></style>
