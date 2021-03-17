<template>
  <v-app>
    <v-sheet
      v-if="!ready"
      :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
      class="px-3 pt-3 pb-3"
    >
      <v-skeleton-loader class="mx-auto" type="card, article, table-row-divider, table-tfoot"></v-skeleton-loader>
    </v-sheet>
    <v-container v-if="ready">
      <div>
        <v-toolbar class="grey white--text">
          <v-layout align-center justify-center>
            <v-toolbar-title>
              <h3><i>Detalhes Gerais</i></h3>
            </v-toolbar-title>
          </v-layout>
        </v-toolbar>
      </div>

      <v-container fluid grid-list-xl>
      <v-layout row wrap>
        <v-flex d-flex lg3 sm6 xs12>
        <widget icon="domain" :title="ProjetoQtd" subTitle= 'Quantidade de projetos' tooltip="Quantidade de projetos que estão em produção atualmente" color="#00b297"/>
      </v-flex>
      <v-flex d-flex lg3 sm6 xs12>
        <widget icon="money_off" :title="Lucro" subTitle= 'Ganho em média' supTitle="" tooltip="Após realizar um orçamento, o lucro irá mostrar essa nova medida" color="#dc3545"/>
      </v-flex>
      <v-flex d-flex lg3 sm6 xs12>
        <widget icon="computer" :title="QtdUser" subTitle= 'Quantidade de usuários' supTitle="" tooltip="Quantidade de usuários inseridos" color="#0866C6"/>
      </v-flex>
      <v-flex d-flex lg3 sm6 xs12>
        <widget icon="watch_later" title="0 H" subTitle= 'Tempo médio' supTitle="Horas e Minutos"  tooltip="Resultado gerado no orçamento" color="#1D2939"/>
      </v-flex>
      <v-flex d-flex lg4 sm6 xs12>
        <siteviewStatistic/>
      </v-flex>
      <v-flex d-flex lg4 sm6 xs12>
        <locationstatistic/>
      </v-flex>
      <v-flex d-flex lg4 sm6 xs12>
        <totalstatistic/>
      </v-flex>
      </v-layout>
      </v-container>
    </v-container>
  </v-app>
</template>

<script>
import widget from '../Resources/Widget'
import { mapState, mapActions, mapGetters } from "vuex";
import locationstatistic from '../Resources/LocationStatistic'
import siteviewStatistic from '../Resources/SiteViewStatistic'
import totalstatistic from '../Resources/TotalEarningsStatistic'
export default {
  components: {
    widget, locationstatistic,totalstatistic, siteviewStatistic
  },
  inject: ["theme"],
  data: () => ({
    ready: false,
    empresa: '',
    ProjetoQtd: '0',
    ProjetoIF: '',
    AndProj: '0',
    QtdUser: '',
    Lucro: '0',
  }),
  computed: mapGetters(["getPerfil","getRespostaQtdUser", "getProfile", "getEmpresa", "getRespostaResource", "getMsgResource", "getProjetosQtd", "getQtdUsers", "getLucro"]),
  methods: {
    ...mapActions(["fetchProjetoQTD", "fetchAndamentoProj", "fetchUsersQTD", "fetchLucro"]),
  },
  mounted() {
    this.empresa = this.getEmpresa;
    this.ready = true;
  },
  created(){
    this.fetchProjetoQTD().then((response) => {
      if (this.getRespostaResource) {
        this.ProjetoQtd = JSON.stringify(this.getProjetosQtd);
      }
    });
    this.fetchUsersQTD().then((response) => {
      if (this.getRespostaQtdUser) {
        this.QtdUser = JSON.stringify(this.getQtdUsers);
      }
    });
  }
};
</script>
<style scoped>

</style>