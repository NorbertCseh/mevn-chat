<template>
  <div class="container">
    <button @click="loadRooms">Load</button>
    {{ rooms }}
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  data: () => ({
    rooms: JSON
  }),
  methods: {
    loadRooms() {
      Axios.get('http://localhost:3000/api/room/')
        .then(rooms => {
          this.rooms = rooms.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style></style>
