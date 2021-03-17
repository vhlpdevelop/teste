<template>
  <v-app>
    <section id="hero">
        <v-row no-gutters>
          <v-img
            :min-height="'calc(75vh - ' + $vuetify.application.top + 'px)'"
            src="https://i.postimg.cc/FsSN5CzN/Whats-App-Image-2021-01-29-at-07-39-08.jpg"
          >
            <v-theme-provider dark>
              <v-container fill-height>
                <v-row
                  align="center"
                  class="white--text mx-auto"
                  justify="center"
                >
                  <v-col
                    class="white--text text-center"
                    cols="12"
                    tag="h1"
                  >
                    <span
                    :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']"
                      class="font-weight-light"
                    >
                      
                    </span>

                    <br>

                    <span
                      :class="[$vuetify.breakpoint.smAndDown ? 'display-3': 'display-4']"
                      class="font-weight-black"
                    >
                      
                    </span>

                  </v-col>

                  <v-btn
                    class="align-self-start"
                    fab
                    outlined
                    @click="$vuetify.goTo('#about-me')"
                  >
                    <v-icon class="black--text">mdi-chevron-double-down</v-icon>
                  </v-btn>
                </v-row>
              </v-container>
            </v-theme-provider>
          </v-img>
        </v-row>
      </section>

      <section id="about-me">
        <div class="py-12"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">Um pouco sobre nós</h2>

          <v-responsive
            class="mx-auto mb-8"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-responsive
            class="mx-auto title font-weight-light mb-8"
            max-width="720"
          >
          Somos uma Empresa Familiar que busca produzir seus produtos voltados ao conforto, beleza e um significado maior para os chinelos. Nossas artes
          são voltadas aos animais, regiões centro-oeste e valores humanos. 
          </v-responsive>

          <v-avatar
            class="elevation-12 mb-12"
            size="128"
          >
            <v-img src="https://i.postimg.cc/FsSN5CzN/Whats-App-Image-2021-01-29-at-07-39-08.jpg"></v-img>
          </v-avatar>

          <div></div>
        </v-container>

        <div class="py-12"></div>
      </section>

      <section
        id="features"
        class="grey lighten-3"
      >
        <div class="py-12"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">Missão, visão e valores</h2>

          <v-responsive
            class="mx-auto mb-12"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-row>
            <v-col
              v-for="({ icon, title, text }, i) in features"
              :key="i"
              cols="12"
              md="4"
            >
              <v-card
                class="py-12 px-4"
                color="grey lighten-5"
                flat
              >
                <v-theme-provider dark>
                  <div>
                    <v-avatar
                      color="primary"
                      size="88"
                    >
                      <v-icon
                        large
                        v-text="icon"
                      ></v-icon>
                    </v-avatar>
                  </div>
                </v-theme-provider>

                <v-card-title
                  class="justify-center font-weight-black text-uppercase"
                  v-text="title"
                ></v-card-title>

                <v-card-text
                  class="subtitle-1"
                  v-text="text"
                >
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <div class="py-12"></div>
      </section>

      <section id="blog">
        <div class="py-12"></div>

        <v-container>
          <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">Redes sociais</h2>

          <v-responsive
            class="mx-auto mb-12"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-row>
            <v-col
              v-for="({ src, text, title, destiny, buttonText }, i) in articles"
              :key="i"
              cols="12"
              md="4"
            >
              <v-img
                :src="src"
                class="mb-4"
                height="275"
                max-width="100%"
              ></v-img>

              <h3
                class="font-weight-black mb-4 text-uppercase"
                v-text="title"
              ></h3>

              <div
                class="title font-weight-light mb-5"
                v-text="text"
              ></div>

              <v-btn
                class="ml-n4 font-weight-black"
                text
                :href="destiny"
              >
                {{buttonText}}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <div class="py-12"></div>
      </section>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    articles: [
          {
            src: 'https://i.postimg.cc/FsSN5CzN/Whats-App-Image-2021-01-29-at-07-39-08.jpg',
            title: 'Instagram',
            text: 'De uma olhada na nossa empresa que deu inicio a este projeto!',
            buttonText: 'Veja agora',
            destiny: 'https://www.instagram.com/correcutia.oficial/'
          },
          {
            src: 'https://s1.imghub.io/xY2Ka.jpg',
            title: 'Desenvolvedor',
            text: 'Desenvolvedor chefe do software',
            buttonText: 'Instagram',
            destiny: 'https://www.instagram.com/victor.hlp/'
          },
        ],
        features: [
          {
            icon: 'mdi-target',
            title: 'Missão',
            text: 'Queremos ser uma empresa lembrada pela arte do gosto de criar chinelos com design próprio que valorize animais, regiões e '+
            ' valores sociais. Produzimos para expressar que, a arte não é apenas beleza e sim um sentimento'
          },
          {
            icon: 'mdi-eye',
            title: 'Visão',
            text: 'Ser a maior marca de chinelos do Mato Grosso do sul e produzir maior variedade de chinelos da nossa Missão no Brasil.'
          },
          {
            icon: 'mdi-hand-heart',
            title: 'Valores',
            text: 'Nós buscamos excelência em cumprir o compromisso com ética, trânsparencia com clientes, valorização dos animais e ideias humanas e a constante evolução dos nossos pilares.'
          },
        ],
        stats: [
          ['3', 'Arquitetos'],
          ['10+', 'Atualizações'],
          ['+100', 'Usuários'],
        ],
  }),
  mounted() {
    
  },
  //computed: mapGetters(["getAuth"]),
  methods: {
    
  }
};
</script>