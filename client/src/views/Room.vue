<template>
  <div>
    <section v-if="err">
      {{ err }}
    </section>
    <section class="section" v-if="room">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5">
              <strong>{{ room.name }}</strong>
            </p>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <div class="level-item">
            <button class="button is-primary">Edit room (Not working)</button>
          </div>
          <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Add user by name"
                  v-model="newUser"
                />
              </p>
              <p class="control">
                <button class="button" @click="addUser(newUser)">Add</button>
              </p>
            </div>
          </div>
        </div>
      </nav>
    </section>
    {{ res }}
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'Chat',
  data() {
    return {
      room: null,
      newUser: '',
      members: [],
      res: '',
      err: ''
    }
  },
  methods: {
    loadRoom() {
      Axios.get(`/api/room/${this.$route.params.room_id}`, {
        headers: {
          Authorization: localStorage.getItem('jwtToken')
        }
      })
        .then(res => {
          this.room = res.data
        })
        .catch(err => {
          this.err = err.response.data
        })
    },
    addUser(newUser) {
      Axios.put(
        `/api/room/add-member/${this.room._id}`,
        { name: newUser },
        {
          headers: {
            Authorization: localStorage.getItem('jwtToken')
          }
        }
      )
        .then(res => {
          this.res = res.data
          console.log(res)
        })
        .catch(err => (this.err = err.response.data))
    }
  },
  mounted() {
    this.loadRoom()
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font: 13px Helvetica, Arial;
}
form {
  background: #000;
  padding: 3px;
  position: fixed;
  bottom: 0;
  width: 100%;
}
form input {
  border: 0;
  padding: 10px;
  width: 90%;
  margin-right: 0.5%;
}
form button {
  width: 9%;
  background: rgb(130, 224, 255);
  border: none;
  padding: 10px;
}
#messages {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
#messages li {
  padding: 5px 10px;
}
#messages li:nth-child(odd) {
  background: #eee;
}
#messages {
  margin-bottom: 40px;
}
</style>
