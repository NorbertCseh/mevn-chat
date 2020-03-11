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
          <v-btn text :to="`/room/${room.id}`">Open</v-btn>
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
      rooms: [
        {
          id: 1,
          name: 'TheRoom',
          avatar:
            'https://i.dailymail.co.uk/i/newpix/2018/03/30/10/4AAFE2A700000578-5561811-image-a-23_1522402383496.jpg',
          createdBy: 'Me'
        },
        {
          id: 2,
          name: 'TheRoom2',
          avatar:
            'https://i.dailymail.co.uk/i/newpix/2018/03/30/10/4AAFE2A700000578-5561811-image-a-23_1522402383496.jpg',
          createdBy: 'Me 2'
        },
        {
          id: 3,
          name: 'TheRoom3',
          avatar:
            'https://i.dailymail.co.uk/i/newpix/2018/03/30/10/4AAFE2A700000578-5561811-image-a-23_1522402383496.jpg',
          createdBy: 'Me 3'
        },
        {
          id: 4,
          name: 'TheRoom4',
          avatar:
            'https://i.dailymail.co.uk/i/newpix/2018/03/30/10/4AAFE2A700000578-5561811-image-a-23_1522402383496.jpg',
          createdBy: 'Me 4'
        }
      ]
    }
  },

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
  },
  mounted() {
    //this.loadRooms();
  }
}
</script>

<style></style>
