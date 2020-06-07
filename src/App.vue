<template>
  <v-app>
    <Navbar />
    <v-content class="mx-4 mb-4 mt-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>
