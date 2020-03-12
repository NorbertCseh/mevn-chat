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

    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" v-model="displayName" />
      </div>
    </div>
    <div class="field">
      <label class="label">Avatar URL</label>
      <div class="control">
        <input class="input" type="url" v-model="avatar" />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-dark" @click="sendRegisrerData">Submit</button>
      </div>
      <div class="control">
        <button class="button is-danger">Clear</button>
      </div>
    </div>
  </section>
</template>

<script>
import Axios from "axios";
export default {
  data: () => ({
    email: "",
    password: "",
    displayName: "",
    avatar: ""
  }),
  methods: {
    sendRegisrerData() {
      Axios.post("http://localhost:3000/api/user/register", {
        email: this.email,
        password: this.password,
        displayName: this.displayName,
        avataar: this.avatar
      })
        .then(res => {
          console.log(res);
          history.push("/dashboard");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
