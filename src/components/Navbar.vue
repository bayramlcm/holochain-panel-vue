<template>
  <nav>
    <v-navigation-drawer v-model="drawer" app clipped temporary>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-icon size="45">mdi-account-circle</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Bayram ALAÇAM</v-list-item-title>
            <v-list-item-subtitle>Kullanıcı</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list>
        <div v-for="item in links" :key="item.title">
          <v-subheader>Yönetim</v-subheader>
          <v-list-item v-if="item.route" link router :to="item.route">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group v-if="!item.route" no-action value="true">
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="subItem in item.sub"
              :key="subItem.title"
              link
              router
              :to="subItem.route"
            >
              <v-list-item-title v-text="subItem.text"></v-list-item-title>
              <v-list-item-action>
                <v-icon v-text="subItem.icon"></v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dense class="blue white--text">
      <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="uiGetThemeFontColor">Holochain WEB</v-toolbar-title>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  components: {},
  name: "Navbar",
  data: () => ({
    drawer: false,
    links: [
      {
        icon: "mdi-home-outline",
        text: "Anasayfa",
        route: "/"
      }
    ]
  })
};
</script>