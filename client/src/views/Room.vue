<template>
  <section class="section" v-if="room">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>{{room.name}}</strong>
          </p>
        </div>
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="text" placeholder="Add user by name" v-model="newUser" />
            </p>
            <p class="control">
              <button class="button" @click="addUser(newUser)">Add</button>
            </p>
          </div>
        </div>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <p class="level-item">
          <strong>All</strong>
        </p>
        <p class="level-item">
          <a>Published</a>
        </p>
        <p class="level-item">
          <a>Drafts</a>
        </p>
        <p class="level-item">
          <a>Deleted</a>
        </p>
        <p class="level-item">
          <a class="button is-success">New</a>
        </p>
      </div>
    </nav>
    {{room.members}}
  </section>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      room: null,
      newUser: ""
    };
  },
  methods: {
    loadRoom() {
      Axios.get(
        `http://localhost:3000/api/room/${this.$route.params.room_id}`,
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken")
          }
        }
      )
        .then(res => {
          this.room = res.data;
        })
        .catch(err => console.log(err));
    },
    addUser(newUser) {
      Axios.put(
        `http://localhost:3000/api/room/add-member/${this.room._id}`,
        { name: newUser },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken")
          }
        }
      )
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.loadRoom();
  }
};
</script>

<style></style>
