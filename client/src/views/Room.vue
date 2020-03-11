<template>
  <div class="container">Room view: {{ room }}</div>
</template>

<script>
import Axios from 'axios'
export default {
  data() {
    return {
      room: null
    }
  },
  methods: {
    loadRoom() {
      Axios.get(`http://localhost:3000/api/room/${this.$route.params.room_id}`)
        .then(res => {
          this.room = res.data
        })
        .catch(err => console.log(err))
    }
  },
  mounted() {
    this.loadRoom()
  }
}
</script>

<style></style>
