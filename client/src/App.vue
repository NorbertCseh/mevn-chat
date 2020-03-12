<template>
  <div>
    <Navbar />
    <div class="container is-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "App",

  components: { Navbar },
  props: {},
  data: () => ({}),
  created() {}
};
</script>
