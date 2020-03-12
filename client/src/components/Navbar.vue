<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        data-target="navMenu"
        aria-label="menu"
        aria-expanded="false"
        @click="hamburger"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" id="navMenu">
      <div class="navbar-start">
        <div class="navbar-item">
          <router-link to="/" class="navbar-item button is-primary">Home</router-link>
        </div>

        <!-- <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">More</a>

          <div class="navbar-dropdown">
            <a class="navbar-item">About</a>
            <a class="navbar-item">Jobs</a>
            <a class="navbar-item">Contact</a>
            <hr class="navbar-divider" />
            <a class="navbar-item">Report an issue</a>
          </div>
        </div>-->
      </div>
      <div class="navbar-end">
        <div class="buttons">
          <div class="navbar-item">
            <router-link
              to="/create-room"
              class="navbar-item button is-primary"
              v-show="$store.state.isAuthenticated"
            >Create room</router-link>

            <router-link
              to="/dashboard"
              class="navbar-item button is-primary"
              v-show="$store.state.isAuthenticated"
            >Dashboard</router-link>

            <router-link
              to="/register"
              class="button is-primary"
              v-show="!$store.state.isAuthenticated"
            >
              <strong>Sign up</strong>
            </router-link>
            <router-link
              to="/login"
              class="button is-light"
              v-show="!$store.state.isAuthenticated"
            >Log in</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => {
    return {};
  },
  methods: {
    hamburger() {
      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
      );
      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle("is-active");
          $target.classList.toggle("is-active");
        });
      }
    }
  }
};
</script>

<style>
</style>