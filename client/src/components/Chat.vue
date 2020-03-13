<template></template>

<script>
import * as socketIo from "socket.io-client";
export default {
  data() {
    return {
      socket: socketIo("http://localhost:3000")
    };
  },
  methods: {
    chat() {
      this.socket.on("hello", data => console.log(data));
    }
  },
  mounted() {
    this.chat();
  }
};
</script>

<style>
</style>