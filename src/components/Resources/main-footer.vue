<template>
  <v-footer
    dark
    padless
    
  >
    <v-card
      flat
      tile
      class="indigo lighten-1 white--text text-center"
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
        Corre Cutia! todos os direitos reservados
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
       &copy; {{ new Date().getFullYear() }} — <strong>Corre Cutia!</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
      icons: [{
          icon: 'mdi-instagram',
          destiny: 'https://www.instagram.com/correcutia.oficial/'
      },
      {
          icon: 'mdi-facebook',
          destiny: 'https://www.facebook.com/correcutia.oficial/'
      },
      {
          icon: 'mdi-phone',
          destiny: 'tel: 67998355896'
      }
      ],
      methods:{
          goFace(){
              this.$router.push("/");
          },
          goInsta(){
              this.$router.push("/homepageEmpresa");
          },
          goHome(){
              this.$router.push("");
          }
      }
    }),
  }
</script>