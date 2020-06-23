<template>
  <v-data-table :headers="headers" :items="posts" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Yazılar</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Yazı Oluştur</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ dialogTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.name" label="Başlık"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">İptal</v-btn>
              <v-btn color="blue darken-1" text @click="save">Kaydet</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>Yazı yok</template>
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";
import { holochain as holochainConfig } from "../../bin/config";

export default {
  name: "Posts",
  data: () => ({
    dialog: false,
    headers: [
      { text: "ID", value: "id" },
      { text: "Kullanıcı ID", value: "userID" },
      { text: "Adı", value: "name" },
    ],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      mail: ""
    },
    defaultItem: {
      id: "",
      name: "",
      mail: ""
    },
    posts: []
  }),

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.posts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.posts.indexOf(item);
      confirm("Yazıyı silmek istediğinize emin misiniz?") &&
        this.posts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.$store.dispatch("userAdd", { name: "Bayram ALAÇAM" }).then(id => {
        // Yazı güncelle
        if (this.editedIndex > -1) {
          Object.assign(this.posts[this.editedIndex], this.editedItem);
        } else {
          this.editedItem.id = id;
          // Yazı Ekle
          this.posts.push(this.editedItem);
        }
        this.close();
      });
    }

  },
  computed: {
    dialogTitle() {
      return this.editedIndex === -1
        ? "Yazı Oluştur"
        : "Yazı Güncelle";
    }
  }
};
</script>
