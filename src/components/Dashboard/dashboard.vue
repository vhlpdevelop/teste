<template>
  <v-app>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css"
      rel="stylesheet"
    />
    <div>
      <v-toolbar flat class="grey white--text">
        <v-app-bar-nav-icon
          class="white--text"
          @click.stop="drawer = !drawer"
        />

        <v-toolbar-title>
          <router-link to="/homepageEmpresa" tag="span" style="cursor: pointer"
            >{{ empresa }} - {{ perfil }}</router-link
          >
        </v-toolbar-title>
        <v-spacer />
        <v-btn text width="150" class="white--text">Orcamento</v-btn>
        <v-toolbar-items
          v-for="menus in menu"
          :key="menus.title"
          class="hidden-xs-only"
        >
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn width="150" text v-on="on" class="white--text">
                {{ menus.title }}
                <v-icon right>{{ menus.icon }}</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="item in getPerfil"
                v-if="item.title.includes(menus.title)"
                :key="item.title"
                :to="item.path"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-items>
        <v-btn icon class="white--text">
        <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          class="white--text"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account-settings</v-icon>
        </v-btn>
      </template>
      <span>Configurações do usuário</span>
    </v-tooltip>
        </v-btn>
      </v-toolbar>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        width="300"
        class="mx-auto"
      >
        <v-list>
          <v-list-item class="hidden-xs-only">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ empresa }}</v-list-item-title>
          </v-list-item>

          <v-divider />

          <v-list-group
            v-for="menus in subMenu"
            :key="menus.title"
            no-action
            :prepend-icon="menus.icon"
          >
            <template v-slot:activator>
              <v-list-item-title>{{ menus.title }}</v-list-item-title>
            </template>
            <v-list-item
              v-for="item in getPerfil"
              v-if="item.title.includes(menus.title)"
              :key="item.title"
              :to="item.path"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item>
          </v-list-group>

          <v-list-group no-action>
            <template v-slot:activator>
              <v-list-item-title>Orcamento</v-list-item-title>
            </template>
            <v-list-item>
              <v-list-item-title :to="OrcamentoRedirect"
                >Gerar</v-list-item-title
              >
            </v-list-item>
          </v-list-group>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block @click="sair()">Sair</v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </div>

    <v-content class>
      <timerTarefa v-if="showTimer" :object="objeto" />
      <router-view />
      <ContentFooter />
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { EventBus } from "../Dashboard/EventBus";
import timerTarefa from "../Tarefa/painelTarefa";
import ContentFooter from "../Dashboard/ContentFooter";
export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.isLoggedIn ? next() : next("/");
    });
  },
  components: {
    timerTarefa,
    ContentFooter,
  },
  name: "Lob",
  props: ["isLoggedIn"],
  data: () => ({
    showTimer: false,
    objeto: {},
    drawer: null,
    OrcamentoRedirect: "/gerarOrcamento",
    appTitle: "Lob DashBoard",
    perfil: "",
    empresa: "",
    navDrawer: true,
    sidebar: true,
    menu: [
      { title: "Projeto" },
      { title: "Financeiro" },
      { title: "Relatorio" },
    ],
    subMenu: [
      { title: "Usuarios" },
      { title: "Serviço" },
      { title: "Projeto" },
      { title: "Categoria" },
      { title: "Financeiro" },
      { title: "Projetos Finalizados" },
      { title: "Relatorio" },
      { title: "Perfil" },
    ],
  }),

  computed: mapGetters(["getPerfil", "getProfile", "getEmpresa"]),
  methods: {
    ...mapActions(["PerfilBuild", "resetSchema"]),
    actionOpenTimer(e) {
      this.objeto = {
        tarefa: e.tarefa,
        cronometro: e.cronometro,
        nomeProjeto: e.nomeProjeto,
        idProjeto: e.idProjeto,
      };
      this.showTimer = true;
    },
    actionCloseTimer() {
      this.showTimer = false;
    },
    sair() {
      localStorage.removeItem("auth_token");
      this.$router.push({
        name: "Lob",
        params: {
          isLoggedIn: !this.isLoggedIn,
        },
      });
    },
  },
  mounted() {
    this.perfil = this.getProfile;
    this.empresa = this.getEmpresa;
    EventBus.$on("OpenTimer", (e) => {
      this.actionOpenTimer(e);
    });
    EventBus.$on("closeTimer", (e) => {
      this.actionCloseTimer();
    });
  },
};
</script>
