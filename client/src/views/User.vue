<template>
  <div class="container">
    <div v-if="errors">{{ errors }}</div>
    <div v-if="user">User: {{ user }}</div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data() {
    return {
      user: null,
      errors: null
    }
  },
  methods: {
    loadUserData() {
      Axios.get(`/api/room/${this.$route.params.user_id}`)
        .then((req, res) => {
          this.user = res.data
        })
        .catch(err => {
          this.errors = err
        })
    }
  },
  mounted() {
    this.loadUserData()
  }
}
</script>

<style></style>
