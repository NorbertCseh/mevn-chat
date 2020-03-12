<template>
  <section>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="email" v-model="email" />
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" v-model="password" />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-dark" @click="sendLoginData">Submit</button>
      </div>
      <div class="control">
        <button class="button is-danger">Clear</button>
      </div>
    </div>
  </section>
</template>

<script>
import Axios from "axios";
import store from "../store/index";

export default {
  name: "Login",
  components: {},
  data: () => {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    sendLoginData() {
      Axios.post("http://localhost:3000/api/user/login", {
        email: this.email,
        password: this.password
      })
        .then(res => {
          store.commit({
            type: "loggedin",
            token: res.data.token
          });
          console.log(store.state.isAuthenticated);
          console.log(store.state.user);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
