<template>
  <section v-if="$store.state.isAuthenticated">
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
  </section>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'CreateRoom',
  data: () => {
    return {
      name: '',
      avatar: '',
      error: null
    }
  },
  methods: {
    sendRoomData() {
      Axios.post('/api/room/', {
        name: this.name,
        avatar: this.avatar
      })
        .then(res => {
          res.status(201).json(res)
          history.push(`/${res.data._id}`)
        })
        .catch(err => (this.error = err))
    }
  }
}
</script>

<style></style>
