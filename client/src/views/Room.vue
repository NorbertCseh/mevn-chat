<template>
  <div class="container">
    Room view
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data() {
    return {
      url: null
    }
  },
  methods: {
    loadRoom() {
      Axios.get(`http://localhost:3000/api/room/${this.$route.params.room_id}`)
        .then((req, res) => {
          console.log(res)
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
