<template>
  <div class="users">
    <v-col cols="12" sm="6" md="3">
      <v-text-field label="İsim"></v-text-field>
      <v-btn @click="hello()">Hello</v-btn>
    </v-col>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { holochain as holochainConfig } from "../../bin/config";

export default {
  name: "Users",
  methods: {
    hello() {
      // console.log("HELLO!");
      if (this.holochainConnected) {
        console.log({ holo: this.holochainConnection });

        const ax = this.holochainConnection(
          holochainConfig.INSTANCE_NAME,
          holochainConfig.ZOOM_NAME,
          "hello_holo"
        )({ args: {} })
          .then(data => console.log({ data }))
          .catch(err => console.log({ err }));
      } else {
        console.log("Holochain bağlantısı yok!");
      }
    }
  },
  computed: {
    ...mapGetters(["holochainConnected", "holochainConnection"])
  }
};
</script>
