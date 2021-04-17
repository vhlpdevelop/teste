<template>
  <v-app>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons"
      rel="stylesheet"
    />

    <v-app-bar class="app-bar" dark fixed app>
      <v-toolbar-title>
        <router-link to="/home" tag="span" style="cursor: pointer"
          ><v-icon>mdi-home</v-icon>Corre cutia</router-link
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn plain text to="/aboutus">
          <span class="mr-2">Sobre nós</span>
        </v-btn>
        <v-btn plain text to="/contact">
          <span class="mr-2">Contato</span>
        </v-btn>
        <v-btn plain text to="/shop">
          <span class="mr-2">Loja</span>
        </v-btn>
        <v-menu>
          <template v-slot:activator="{ on }">
            <v-btn plain v-on="on" class="mr-2" v-show="logged">
              <span class="mr-2">Conta</span>
              <v-icon>mdi-account</v-icon>
            </v-btn>
            <v-btn plain @click="openDialog()" class="mr-2" v-show="!logged">
              <span class="mr-2">Conta</span>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list shaped>
            <v-list-item-group>
              <v-list-item>
                <v-list-item-icon
                  ><v-icon v-text="'mdi-account'"></v-icon
                ></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="'Conta'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click="moveToSettings()">
                <v-list-item-icon
                  ><v-icon v-text="'mdi-cog'"></v-icon
                ></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="'Configurações'"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="moveToHistory()">
                <v-list-item-icon
                  ><v-icon v-text="'mdi-shopping'"></v-icon
                ></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="'Historico'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>

              <v-list-item @click="accountLogOut()">
                <v-list-item-icon>
                  <v-icon v-text="'mdi-logout'"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="'Sair'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
        <v-menu>
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              <v-badge
                :content="getCartSize.toString()"
                value="2"
                color="green"
                overlap
              >
                <v-icon>mdi-cart</v-icon>
              </v-badge>
            </v-btn>
          </template>
          <v-list shaped>
            <v-list-item-group>
              <v-list-item to="/cart" color="primary">
                <v-list-item-icon
                  ><v-icon
                    color="primary"
                    v-text="'mdi-cart-arrow-right'"
                  ></v-icon
                ></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="'Checkout'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </v-list-item-group>
            <v-list nav dense>
              <v-list-item-group>
                <v-list-item v-for="item in getCart" :key="item.id">
                  <v-list-item-avatar>
                    <v-img :src="item.image[0]"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.produto }}</v-list-item-title>
                    <v-list-item-subtitle
                      >Tamanho: {{ item.num }} - Qtd:
                      {{ item.qtd }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon x-small @click="cartEdit(item)">
                      <v-icon color="green lighten-1">mdi-pen</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-btn icon x-small @click="cartRemove(item)">
                      <v-icon color="red lighten-1">mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-list>
        </v-menu>
      </v-toolbar-items>

      <v-menu v-if="$vuetify.breakpoint.smAndDown" class="hidden-md-and-up">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list shaped>
          <v-list-item-group>
            <v-list-item v-for="(item, i) in submenu" :key="i" :to="item.path">
              <v-list-item-icon
                ><v-icon v-text="item.icon"></v-icon
              ></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <v-menu v-if="$vuetify.breakpoint.smAndDown" class="hidden-md-and-up">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon class="mr-2">
            <v-badge
              :content="getCartSize.toString()"
              value="0"
              color="green"
              overlap
            >
              <v-icon>mdi-cart</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-list shaped>
          <v-list-item-group>
            <v-list-item to="/cart" color="primary">
              <v-list-item-icon
                ><v-icon
                  color="primary"
                  v-text="'mdi-cart-arrow-right'"
                ></v-icon
              ></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="'Checkout'"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </v-list-item-group>
          <v-list nav dense>
            <v-list-item-group>
              <v-list-item v-for="item in getCart" :key="item.id">
                <v-list-item-avatar>
                  <v-img :src="item.image[0]"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ item.produto }}</v-list-item-title>
                  <v-list-item-subtitle
                    >Tamanho: {{ item.num }} - Qtd:
                    {{ item.qtd }}</v-list-item-subtitle
                  >
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon x-small @click="cartEdit(item)">
                    <v-icon color="green lighten-1">mdi-pen</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-action>
                  <v-btn icon x-small @click="cartRemove(item)">
                    <v-icon color="red lighten-1">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-list>
      </v-menu>
      <v-menu v-if="$vuetify.breakpoint.smAndDown" class="hidden-md-and-up">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" class="mr-2" v-show="logged">
            <v-icon>mdi-account</v-icon>
          </v-btn>
          <v-btn icon @click="openDialog()" class="mr-2" v-show="!logged">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list shaped>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-icon
                ><v-icon v-text="'mdi-account'"></v-icon
              ></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="'Conta'"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="moveToSettings()">
              <v-list-item-icon
                ><v-icon v-text="'mdi-cog'"></v-icon
              ></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="'Configurações'"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="moveToHistory()">
              <v-list-item-icon
                ><v-icon v-text="'mdi-shopping'"></v-icon
              ></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="'Historico'"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="accountLogOut()">
              <v-list-item-icon>
                <v-icon v-text="'mdi-logout'"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="'Sair'"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <router-view  />
      <div v-show="showDialog" v-if="showDialog">
        <dialogAccount
          :msg="message"
          v-on:close-dialog="closeDialog"
          v-on:close-dialog-Login="closeDialogLogin"
        />
      </div>
    </v-content>

    <mainfooter />
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { EventBus } from "../HomePage/EventBus";
import { SecondEventBus } from "../HomePage/SecondEventBus";
import InfoPage from "../HomePage/InfoPage";
import mainfooter from "../Resources/main-footer";
import dialogAccount from "../Account/account";
export default {
  components: {
    InfoPage,
    mainfooter,
    dialogAccount,
  },
  name: "Lob",
  data: () => ({
    drawer: null,
    appTitle: "Lob Contador",
    showDialog: false,
    navDrawer: true,
    sidebar: true,
    loadAccount: false,
    showAccount: false,
    message: {
      ok: false,
      msg: "Para ir ao checkout você deve entrar/registrar-se primeiro!",
    },
    menu: false,
    logged: false,
    submenu: [
      { title: "Sobre nós", icon: "mdi-information", path: "/aboutus" },
      {
        title: "Contato",
        icon: "mdi-phone",
        path: "/contact",
      },
      {
        title: "Loja",
        icon: "mdi-shopping-search",
        path: "/shop",
      },
    ],
  }),
  computed: mapGetters(["getCart", "getCartSize", "getAuth", "getCheckToken"]),
  methods: {
    ...mapActions(["DeleteItem", "LogOut", "checkToken"]),
    moveToSettings() {
      this.$router.push({
        name: "settings",
      });
    },
    moveToHistory() {
      this.$router.push({
        name: "history",
      });
    },
    accountLogOut() {
      //Realizar logout
      this.LogOut().then((response) => {
        this.logged = false;
      });
    },
    cartEdit(item) {
      //Função editar produto
      this.$router.push({
        name: "product",
        params: {
          object: item,
          id: item._id,
        },
      });
    },
    cartRemove(item) {
      //Função remover item do cart
      this.DeleteItem(item);
    },
    openDialog() {
      //if(this.getSession()){ verifica se o usuário ja está logado!, se não abrir painel de autenticação}
      this.showDialog = true;
    },
    closeDialog: function () {
      this.showDialog = false;
      this.message.ok = false;
    },
    closeDialogLogin: function () {
      this.showDialog = false;

      this.message.ok = false;

      this.closeLogin();
    },
    async closeLogin() {
      await EventBus.$emit("ToCheckOut");
      await (this.logged = true);
    },
    menuItems() {
      return this.menu;
    },
    isMobile() {
      return this.$vuetify.breakpoint.smOnly;
    },
    redirectReg() {
      this.$router.push({
        name: "Registrar",
      });
    },
    redirectEntrar() {
      this.$router.push({
        name: "Entrar",
      });
    },
    async checkinToken(){
      await this.checkToken().then(() => {
      if (this.getCheckToken) {
        this.logged = true;
      }
    });
    }
  },
  mounted() {
    EventBus.$on("CheckLogged", (e) => {
      if (!this.logged) {
        this.message.ok = true;
        this.openDialog();
      }
    });
  },
  created() {
    this.checkinToken()
  },
};
</script>
<style scoped>
.app-bar{
  background-image: linear-gradient(to right, rgba(207, 153, 95)5% , rgba(219, 173, 106) 90%, rgba(207, 153, 95));
}
</style>
