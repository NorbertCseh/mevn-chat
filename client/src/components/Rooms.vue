<template>
  <v-container>
    <div class="container" v-for="room in rooms" :key="room.id">
      <v-card class="mx-auto" max-width="344" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">{{
              room.name
            }}</v-list-item-title>
            <v-list-item-subtitle
              >Created by: {{ room.createdBy }}</v-list-item-subtitle
            >
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="grey">
            <img :src="`${room.avatar}`" alt="cat" />
          </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn text :to="`/room/${room._id}`">Open</v-btn>
          <v-btn text>Join</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import Axios from 'axios'

export default {
  data() {
    return {
      rooms: null
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
          console.log(err)
        })
    }
  },
  mounted() {
    this.loadRooms()
  }
}
</script>

<style></style>
