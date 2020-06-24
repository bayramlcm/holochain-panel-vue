<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :loading="loading"
    :sort-desc="[true, false]"
    :sort-by="['createdAt', 'name']"
    loading-text="Kullanıcılar yükleniyor... Lütfen bekleyin"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Kullanıcılar</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Kullanıcı Oluştur</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ dialogTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.name" label="Adı Soyadı"></v-text-field>
                    <v-text-field v-model="editedItem.mail" label="E-Posta"></v-text-field>
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
    <!-- Oluşturma Tarihi -->
    <template v-slot:item.createdAt="{ item }">{{dateConvert(item.createdAt)}}</template>
    <!-- İşlemler -->
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>Kullanıcı yok</template>
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";
import { dateConvert } from "../../bin/atom";

export default {
  name: "Users",
  // Uygulama açılırken başla
  mounted() {
    this.$store.dispatch("userGetAll").then(data => {
      this.users = data;
      this.loading = false;
    });
  },
  data: () => ({
    dialog: false,
    loading: true,
    headers: [
      { text: "ID", value: "id" },
      { text: "Adı", value: "name" },
      { text: "E-Posta", value: "mail" },
      { text: "Oluşturma Tarihi", value: "createdAt" },
      {
        text: "İşlemler",
        value: "actions",
        sortable: false
      }
    ],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      mail: "",
      createdAt: ""
    },
    defaultItem: {
      id: "",
      name: "",
      mail: "",
      createdAt: ""
    },
    users: []
  }),

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    dateConvert,
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.users.indexOf(item);
      confirm("Kullanıcıyı silmek istediğinize emin misiniz?") &&
        this.users.splice(index, 1);
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      // Kullanıcı güncelle
      if (this.editedIndex > -1) {
        this.$store
          .dispatch("userUpdate", {
            id: this.editedItem.id,
            user: {
              name: this.editedItem.name,
              mail: this.editedItem.mail
            }
          })
          .then(user => {
            console.log({ user });
            Object.assign(this.users[this.editedIndex], user);
            this.close();
          });
      } else {
        // Kullanıcı Ekle
        this.$store
          .dispatch("userAdd", {
            user: {
              name: this.editedItem.name,
              mail: this.editedItem.mail
            }
          })
          .then(user => {
            this.users.push(user);
            this.close();
          });
      }
    }
  },
  computed: {
    ...mapGetters(["holochainConnected", "holochainConnection"]),
    dialogTitle() {
      return this.editedIndex === -1
        ? "Kullanıcı Oluştur"
        : "Kullanıcı Güncelle";
    }
  }
};
</script>
