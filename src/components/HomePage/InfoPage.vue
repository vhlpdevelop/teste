<template>
  <div>
    <v-carousel hide-delimiters class="hidden-sm-and-down">
      <v-carousel-item v-for="(item, i) in images.sliderMD" :key="i"
        >
        <v-img :src="item" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="text-shadow display-2 yellow--text pl-5 pr-5 hidden-sm-only">
              {{images.texts[i]}}
            </div>
            <br /> 
          </v-row>
        </v-img>
        
      </v-carousel-item>
    </v-carousel>
    <v-carousel hide-delimiters class="hidden-md-and-up">
      <v-carousel-item v-for="(item, i) in images.sliderSM" :key="i"
        >
        <v-img :src="item" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="text-shadow display-2 yellow--text pl-5 pr-5 hidden-sm-only">
              <strong>{{images.texts[i]}}</strong>
            </div>
            <br /> 
          </v-row>
        </v-img>
        
      </v-carousel-item>
    </v-carousel>
    <div class="pl-4 pr-4 row">
      <div class="col-md-6 col-sm-6 col-xs-12">
        <v-card>
          <v-img
            :src="images.sliderSM.slider2"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="400px"
          >
            <h1 class="text-center font-size">Mais vendidos</h1>
            <div class="text-center">
              <v-btn href="/shop" class="white--text" outlined
                >Compre Agora</v-btn
              >
            </div>

            <!--            <v-expand-transition>-->
            <!--              <div-->
            <!--                v-if="hover"-->
            <!--                class="d-flex transition-fast-in-fast-out orange darken-2 v-card&#45;&#45;reveal display-3 white&#45;&#45;text"-->
            <!--                style="height: 100%;"-->
            <!--              >-->

            <!--                <h3>Top Picks</h3><br/>-->
            <!--                <h3>sdfs</h3>-->
            <!--              </div>-->
            <!--            </v-expand-transition>-->
          </v-img>
        </v-card>
        <!--        </v-hover>-->
      </div>
      <div class="col-md-6 col-sm-6 col-xs-12">
        <v-card>
          <v-img
            :src="images.sliderSM.slider3"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="400px"
          >
            <h1 class="text-center font-size">Lançamento</h1>
            <div class="text-center">
              <v-btn href="/shop" class="white--text" outlined
                >Compre agora</v-btn
              >
            </div>
          </v-img>
        </v-card>
      </div>
    </div>

    <v-container>
      <v-row no-gutters>
        <v-col :cols="12">
          <v-card-text class="" tile outlined>
            <v-card-title class="subheading">Promoção da semana</v-card-title>
            <v-divider></v-divider>
            <div class="row">
              <div class="col-12 col-md-4 col-sm-6 col-xs-6 text-center">
                <v-hover v-slot:default="{ hover }" open-delay="200">
                  <v-card :elevation="hover ? 16 : 2">
                    <v-img
                      class="white--text align-end"
                      height="300px"
                      :src="images.deals.deal2"
                    >
                      <v-card-title>Linha Cutia </v-card-title>
                    </v-img>

                    <v-card-text class="text--primary text-center">
                      <div>Diversos tipos de modelos!</div>
                      <div>Peça já</div>
                    </v-card-text>

                    <div class="text-center">
                      <v-btn @click="movetoShop('cutia')" class="ma-2" outlined color="info">
                        Quero!
                      </v-btn>
                    </div>
                  </v-card>
                </v-hover>
              </div>
              <div class="col-12 col-md-4 col-sm-6 col-xs-6 text-center">
                <v-hover v-slot:default="{ hover }" open-delay="200">
                  <v-card :elevation="hover ? 16 : 2">
                    <v-img
                      class="white--text align-end"
                      height="300px"
                      :src="images.deals.deal3"
                    >
                      <v-card-title>Linha Natureza </v-card-title>
                    </v-img>

                    <v-card-text class="text--primary text-center">
                      <div>Chinelos da Natureza</div>
                      <div>Diversos animais!</div>
                    </v-card-text>

                    <div class="text-center">
                      <v-btn @click="movetoShop('natureza')" class="ma-2" outlined color="info">
                        Quero!
                      </v-btn>
                    </div>
                  </v-card>
                </v-hover>
              </div>
              <div class="col-12 col-md-4 col-sm-6 col-xs-6 text-center">
                <v-hover v-slot:default="{ hover }" open-delay="200">
                  <v-card :elevation="hover ? 16 : 2">
                    <v-img
                      class="white--text align-end"
                      height="300px"
                      :src="images.deals.deal4"
                    >
                      <v-card-title>Desconto </v-card-title>
                    </v-img>

                    <v-card-text class="text--primary text-center">
                      <div>Pegue 2 e ganhe 10% de desconto na compra!</div>
                      
                    </v-card-text>

                    <div class="text-center">
                      <v-btn href="/shop" class="ma-2" outlined color="info">
                        Quero!
                      </v-btn>
                    </div>
                  </v-card>
                </v-hover>
              </div>
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
    <v-card style="background-color: rgba(219, 206, 106)">
      <v-container>
        <v-row no-gutters>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-truck</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">ENTREGAS COM</h3>
                <p class="font-weight-thin">SEDEX/PAC</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-headset</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">(67) 99835-5896</h3>
                <p class="font-weight-thin">24/7 Suporte técnico</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: {
        texts: {
          slider4 : "Novidades da Semana",
          slider3 :"Diversos Tipos para você",
          slider2 :"Seu jeito preferido",
          slider1 :"Chinelo para todos os dias"
        },
        sliderMD: {
          slider4: require("../../assets/img/home/slider4.jpg"),
          slider3: require("../../assets/img/home/slider3.jpg"),
          slider2: require("../../assets/img/home/slider2.jpg"),
          slider1: require("../../assets/img/home/slider1.jpg"),
        },
        sliderSM: {
          slider4: require("../../assets/img/home/slider4SM.jpg"),
          slider3: require("../../assets/img/home/slider3SM.jpg"),
          slider2: require("../../assets/img/home/slider2SM.jpg"),
          slider1: require("../../assets/img/home/slider1SM.jpg"),
        },
        deals: {
          deal4: require("../../assets/img/home/deal4.jpg"),
          deal3: require("../../assets/img/home/deal3.jpg"),
          deal2: require("../../assets/img/home/deal2.jpg"),
          deal1: require("../../assets/img/home/deal1.jpg"),
        },
      },
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
      ],
      activeBtn: 1,
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    };
  },
  methods:{
    movetoShop(id){ //ir para loja e mostrar direto os chinelos com o id
    console.log("Aqui")
      this.$router.push({
        name:'shop',
        params: {
          object: id,
        }})
    },
  }
};
</script>
<style>
.text-shadow{
  text-shadow: 2px 2px #000000;
}
.v-window__container--is-active {
    height: 100% !important;
}
#example-custom-transition .fade-enter-active,
#example-custom-transition .fade-leave-active,
#example-custom-transition .fade-leave-to {
  transition: 0.3s ease-out;
  position: absolute;
  top: 0;
  left: 0;
}
#example-custom-transition .fade-enter,
#example-custom-transition .fade-leave,
#example-custom-transition .fade-leave-to {
  opacity: 0;
}

</style>