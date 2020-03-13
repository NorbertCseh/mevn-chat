<template>
  <div>
    <div class="card" v-for="room in rooms" :key="room._id">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="`${room.avatar}`" alt="Placeholder image" />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ room.name }}</p>
            <p class="subtitle is-6">
              PLS populate user data for the id and add it here to display who
              created the room
            </p>
          </div>
        </div>

        <div class="content">
          <router-link :to="`/room/${room._id}`">Enter</router-link>
          <br />
          <time datetime="2016-1-1">{{ room.createdDate }}</time>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  data() {
    return {
      rooms: null,
      errors: ''
    }
  },

  methods: {
    loadRooms() {
      Axios.get('http://localhost:3000/api/room/', {
        headers: {
          Authorization: localStorage.getItem('jwtToken')
        }
      })
        .then(rooms => {
          if (!rooms) {
            this.rooms = 'There are no rooms'
          } else {
            this.rooms = rooms.data
          }
        })
        .catch(err => {
          this.errors = err
        })
    }
  },
  mounted() {
    this.loadRooms()
  }
}
</script>

<style></style>
