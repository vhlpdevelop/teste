<template>
  <section id="about-me" class="backgroundHelper">
    <div v-if="!loader">
      <v-container fill-height>
      <v-layout justify-center align-center>
        <v-flex class="text-center text-xs-center">
          <v-progress-circular
            :size="400"
            class="mt-5"
            
            color="primary"
            indeterminate
          >Carregando...</v-progress-circular>
        </v-flex>
      </v-layout>
      </v-container>
    </div>
    <div v-else>
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="display-2 white--text font-weight-bold mb-3">
          Compra realizada com sucesso!
        </h2>

        <v-responsive class="mx-auto mb-8" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-responsive
          class="mx-auto white--text title font-weight-light mb-8"
          max-width="720"
        >
          Sua compra foi aprovada e já registramos! Enviamos um email no {{email}}
           para você, confirmando seu pedido. Logo você irá receber
          seu pedido, você pode acompanhar o andamento seguindo os passos:
          <p class="primary--text">
            Conta <v-icon>mdi-chevron-double-right</v-icon> Histórico
            <v-icon>mdi-chevron-double-right</v-icon> Selecione a data da compra
            e pronto!
          </p>
          <p class="mx-auto white--text font-weight-light" max-width="720">
            Clique abaixo para voltar a página inicial
          </p>
          <a href="/home">Voltar</a>
        </v-responsive>

        <v-avatar class="elevation-12 mb-12" size="128">
          <v-img
            src="https://i.postimg.cc/FsSN5CzN/Whats-App-Image-2021-01-29-at-07-39-08.jpg"
          ></v-img>
        </v-avatar>

        <div></div>
        <v-responsive
          class="mx-auto white--text font-weight-light mb-8"
          max-width="720"
        >
          Caso de dúvidas, entre em contato conosco
          <p>
            <a href="/contact">Contato</a>
          </p>
        </v-responsive>
      </v-container>

      <div class="py-12"></div>
    </div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["id"],
  data: () => ({
    loader: false,
    loading: false,
    email: '',
  }),
  computed: {
    ...mapGetters(["getPaymentCheck", "getPaymentData"]),
  },
  methods: {
    ...mapActions(["verifyTokenSuccess", "clearCart"]),
  },
  created() {
    this.verifyTokenSuccess(this.id).then((response) => {
      //Ao criar, verificar
      if (this.getPaymentCheck) {
        this.loader = true
        this.email = this.getPaymentData
        this.clearCart();
      } else {
        
        setTimeout(function(){ 
          this.$router.push({
            name: "home",
        }) }.bind(this), 3000);
        
      } 
    });
  },
};
</script>
<style>
.backgroundHelper {
  background-color: #9ccc65;
  
}
</style>