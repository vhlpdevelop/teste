<template>
  <div>
    <v-container>
      <div class="row">
        <div class="col-md-3 col-sm-3 col-xs-12">
          <v-card outlined>
            <v-card-title>Linha de Chinelos</v-card-title>
            <v-divider></v-divider>
            <template>
              <v-treeview
                :items="items"
                :selected-color="'#fff'"
                activatable
                open-on-click
                dense
                return-object
                v-model="selectedTree"
                @update:active="searchInTable"
              ></v-treeview>
            </template>
            <v-divider></v-divider>
          </v-card>
        </div>
        <div class="col-md-9 col-sm-9 col-xs-12">
          <v-row dense>
            <v-col cols="12" sm="8" class="pl-6 pt-6">
              <small>Mostrando 1-12 produtos</small>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                class="pa-0"
                v-model="select"
                :items="options"
                style="margin-bottom: -20px"
                outlined
                dense
                @input="changeTable"
              ></v-select>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-container fluid class="text-center">
            <v-data-iterator
              class="col-md-10 col-sm-6 col-xs-12"
              :items="getProduct.obj"
              items-per-page.sync="12"
              :search="search"
              :sort-by="sortBy.toLowerCase()"
              hide-default-footer
            >
              <template v-slot:default="props">
                <v-row>
                  <v-col :key="item.id" v-for="item in props.items">
                    <v-hover v-slot:default="{ hover }">
                      <v-card
                        class="mx-auto"
                        color="grey lighten-4"
                        max-width="600"
                        min-width="200"
                      >
                        <v-img
                          class="white--text align-end"
                          :aspect-ratio="16 / 9"
                          
                          height="200px"
                          :src="item.image[0]"
                        >
                          <v-card-title>{{ item.linha }} </v-card-title>
                          <v-expand-transition>
                            <div
                              v-if="hover"
                              class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 white--text"
                              style="height: 100%"
                            >
                              <v-btn
                                v-if="hover"
                                @click="moveToProduct(item)"
                                class=""
                                outlined
                                >Visualizar
                              </v-btn>
                            </div>
                          </v-expand-transition>
                        </v-img>
                        <v-card-text class="text--primary">
                          <div>
                            <a href="/product" style="text-decoration: none">
                              {{ item.produto }}
                            </a>
                          </div>
                          <div>R${{ item.preco }}</div>
                        </v-card-text>
                      </v-card>
                    </v-hover>
                  </v-col>
                </v-row>
              </template>
              <template v-slot:footer>
                <v-row class="mt-2" align="center" justify="center">
                  <span class="grey--text">Mostrando</span>
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        dark
                        text
                        color="primary"
                        class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        {{ itemsPerPage }}
                        <v-icon>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(number, index) in itemsPerPageArray"
                        :key="index"
                        @click="updateItemsPerPage(number)"
                      >
                        <v-list-item-title>{{ number }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>

                  <v-spacer></v-spacer>

                  <span class="mr-4 grey--text">
                    Página {{ page }} de {{ numberOfPages }}
                  </span>
                  <v-btn
                    fab
                    dark
                    color="blue darken-3"
                    class="mr-1"
                    @click="formerPage"
                  >
                    <v-icon>mdi-chevron-left</v-icon>
                  </v-btn>
                  <v-btn
                    fab
                    dark
                    color="blue darken-3"
                    class="ml-1"
                    @click="nextPage"
                  >
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-row>
              </template>
            </v-data-iterator>
          </v-container>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  props: ["object"],
  data: () => ({
    select: "Novos",
    selectedTree: [],
    options: ["Novos", "Populares", "Todos"],
    itemsPerPageArray: [12, 10, 5],
    search: "",
    itemsPerPage: 12,
    sortBy: "",
    keys: [
      "Name",
      "Calories",
      "Fat",
      "Carbs",
      "Protein",
      "Sodium",
      "Calcium",
      "Iron",
    ],
    filter: {},
    page: 1,
    items: [
      {
        name: "Natureza",
        children: [
          { name: "Mostrar", id:"natureza" },
        ],
      },
      {
        name: "Cutia",
        children: [
          { name: "Mostrar", id:"cutia" },
        ],
      },
    ],
  }),
  created(){
    if(this.object != null){
        this.search = this.object
      }
    this.fetchProduct().then(()=>{
     // console.log("Buscando....")
      if(this.getProduct !== undefined){
        //console.log("Pronto")
      }
    })
  },
  computed: {
    ...mapGetters(["getProduct", "getRespostaProduct"]),
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
  },
  methods: {
    ...mapActions(["fetchProduct"]),
    changeTable(){
      if(this.select === "Novos")
        this.search = 'novo';
      if(this.select === 'Populares')
        this.search = 'popular'
      if(this.select === 'Todos')
        this.search = undefined

   
    },
    searchInTable(e) {
      this.search = e[0].id
    },
    moveToProduct(product) {
      //console.log(product)
      this.$router.push({
        name:'product',
        params: {
          object: product,
          id: product._id
        },
      });
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },
};
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
</style>
