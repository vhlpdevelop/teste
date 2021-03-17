<template>
  <v-card class="card">
    <v-card-title>Projetos</v-card-title>
      <v-card-subtitle class="subtitle-2"><p class="grey--text">Quantidade trabalhada</p> </v-card-subtitle>
    <v-card-text class="pa-2">
      <pie-chart :data="projeto" legend="right" :donut="true"></pie-chart>
      <v-divider class="mx-4"></v-divider>
      <p class="grey--text">Todos os projetos que estão arquivados serão mostrados acima, inclusive aqueles finalizados.</p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    projeto: {}
  }),
   methods: {
         ...mapActions(["fetchProjetosIF"])
       },
       computed:
        mapGetters(["getProjetosIF", "getRespostaResource"]),
       mounted() {
         this.fetchProjetosIF().then(response =>{
           if(this.getRespostaResource){
             this.projeto = {
               'Projetos Finalizados' : JSON.stringify(this.getProjetosIF.finalizado),
               'Projetos Inacabados' : JSON.stringify(this.getProjetosIF.acabado)
             }
           }
         })
       }
}
</script>

<style>
  .card {
    border-radius: 3px;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.21);
    background-color: transparent;
  }
</style>
