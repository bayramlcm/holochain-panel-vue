<template>
  <v-snackbar
    :color="notificationGet.color"
    v-model="snackbar"
    top
    right
    :timeout="notificationGet.timeout"
  >
    <v-icon>mdi-notification-important</v-icon>
    {{notificationGet.text}}
    <v-btn dark text @click="snackbar = true">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Notification",
  computed: {
    ...mapGetters(["notificationGet"]),
    snackbar: {
      get() {
        return this.$store.getters.notificationGet.display;
      },
      set() {
        return this.$store.commit("notificationSet", {
          display: false
        });
      }
    }
  }
};
</script>