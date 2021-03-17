<template>
  <v-card class="card">
    <v-container fluid>
      <v-card-title>Andamento dos Projetos</v-card-title>
      <v-card-text>
        <line-chart
          :data="data"
          xtitle="Tempo"
          ytitle=""
          :dataset="{ borderWidth: 3 }"
        />
        <v-divider class="mx-3"></v-divider>
        <p class="grey--text">
          Conforme o desenvolvimento dos projetos dentro do mês, o gráfico irá
          mostrar a média produzida. Sempre atualiza a cada orçamento gerado.
        </p>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      data: {
        "2018-05-13": 640,
        "2018-05-14": 200,
        "2018-05-15": 250,
        "2018-05-16": 350,
        "2018-05-17": 200,
        "2018-05-18": 670,
        "2018-05-19": 600,
        "2018-05-20": 800,
      },
    };
  },
};
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
