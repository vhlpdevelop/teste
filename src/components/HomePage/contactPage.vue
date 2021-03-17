<template>
  <v-app>
    <section id="banner">
      <h2><strong>Corre Cutia</strong></h2>

      <ul class="actions">
        <li>
          <v-btn
            id="buttonExp"
            class="align-self-start"
            icon
            fab
            outlined
            @click="$vuetify.goTo('#one')"
          >
            <v-icon class="black--text">mdi-chevron-double-down</v-icon>
          </v-btn>
        </li>
      </ul>
    </section>

    <!-- One -->
    <section id="one" class="wrapper special">
      <div class="inner">
        <header class="major">
          <h2 style="margin-bottom: -10px">Nosso contato</h2>
        </header>
        <header class="major">
          <div style="padding-bottom: 10px">
            <b>correcutiams@gmail.com</b>
          </div>
          <h1>Victor Poli -(67) 99835-5896</h1>
          <h1>Cristiane Poli -(67) 99961-0039</h1>
        </header>
        <div class="features">
          <div class="feature">
            <i class="fa fa-exclamation"></i>
            <h3>Ajuda</h3>
            <p>
              Se você possui dúvidas ou problemas, entre em contato conosco que
              iremos resolver.
            </p>
          </div>
          <div class="feature">
            <i class="fa fa-building"></i>
            <h3>Atacado</h3>
            <p>
              Se você busca comprar quantidade grande dos nossos produtos, entre
              em contato conosco.
            </p>
          </div>
          <div class="feature">
            <i class="fa fa-credit-card"></i>
            <h3>Compras por pix</h3>
            <p>
              Infelizmente nosso site ainda não trabalha com pagamentos por pix,
              mas entrando em contato conosco podemos vender pra você com pix.
            </p>
          </div>
        </div>
      </div>
    </section>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data: () => ({}),
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="css" src="../../assets/css/font-awesome.min.css" >
</style>
<style scoped lang="css" src="../../assets/css/ie9.css" >
</style>
<style scoped lang="css" src="../../assets/css/main.css" >
</style>