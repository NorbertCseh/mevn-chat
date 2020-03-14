<template>
  <section v-if="$store.state.isAuthenticated" @submit="sendRoomData">
    <div class="field">
      <label class="label">Room name</label>
      <div class="control">
        <input class="input" type="text" v-model="name" />
      </div>
    </div>

    <div class="field">
      <label class="label">Room avatar URL</label>
      <div class="control">
        <input class="input" type="url" v-model="avatar" />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-dark" @click="sendRoomData">Submit</button>
      </div>
      <div class="control">
        <button class="button is-danger">Clear</button>
      </div>
    </div>
    <div>
      {{ error }}
    </div>
  </section>
</template>

<script>
import Axios from 'axios'
//import router from 'vue-router'

export default {
  name: 'CreateRoom',
  data: () => {
    return {
      name: '',
      avatar: '',
      error: null,
      res: null
    }
  },
  methods: {
    sendRoomData() {
      Axios.post('/api/room/create-room', {
        name: this.name,
        avatar: this.avatar
      })
        .then(res => {
          this.res = res.data.msg
          this.$router.push({ path: `/room/${res.data._id}` })
        })
        .catch(err => (this.error = err.response.data))
    }
  }
}
</script>

<style></style>
