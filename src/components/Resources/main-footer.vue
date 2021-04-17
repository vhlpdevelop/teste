<template>
  <v-footer dark padless>
    <v-card
      flat
      tile
      class="footer-bar white--text text-center"
      width="100%"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon.icon"
          class="mx-4 white--text"
          icon
          :href="icon.destiny"
        >
          <v-icon size="24px">
            {{ icon.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0 font-weight-light">
        Corre Cutia! todos os direitos reservados.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        <v-row no-gutters>
          <v-col cols="12">
            <div>
              <router-link
                to="/termosecondicoes"
                tag="span"
                style="cursor: pointer"
                >Termos e Condições de Uso</router-link
              >
            </div>
            <div>
              <router-link
                to="/politicadeprivacidade"
                tag="span"
                style="cursor: pointer"
                >Política de Privacidade</router-link
              >
            </div>
            <div>
              <router-link
                to="/politicadedevolucao"
                tag="span"
                style="cursor: pointer"
                >Política de Troca e Devolução</router-link
              >
            </div>
          </v-col>

          <v-col cols="12">
            <div class="pa-2">
              &copy; {{ new Date().getFullYear() }} —
              <strong>Corre Cutia!</strong>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    icons: [
      {
        icon: "mdi-instagram",
        destiny: "https://www.instagram.com/correcutia.oficial/",
      },
      {
        icon: "mdi-facebook",
        destiny: "https://www.facebook.com/correcutia.oficial/",
      },
      {
        icon: "mdi-phone",
        destiny: "tel: 67998355896",
      },
    ],
    methods: {
      goFace() {
        this.$router.push("/");
      },
      goInsta() {
        this.$router.push("/homepageEmpresa");
      },
      goHome() {
        this.$router.push("");
      },
    },
  }),
};
</script>
<style scoped>
.footer-bar{
  background-image: linear-gradient(to right, rgba(207, 153, 95)5% , rgba(219, 173, 106) 90%, rgba(207, 153, 95));
}
</style>