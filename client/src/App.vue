<template>
  <div class="container">
    <button>
      <router-link to="/register">
        Register
      </router-link>
    </button>
    <button>
      <router-link to="/login">
        Login
      </router-link>
    </button>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',

  components: {},
  props: {},
  data: () => ({}),
  created() {}
}
</script>
