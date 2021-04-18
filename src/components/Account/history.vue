<template>
  <v-container fluid class="text-center">
    <v-card outlined tile>
      <v-card-title>Histórico de compras</v-card-title>
      <v-data-iterator
        class="col-md-12 col-sm-6 col-xs-12 pa-5"
        :items="getHistorico"
        :items-per-page.sync="itemsPerPage"
        :search="search"
        sort-by="created"
        :sort-desc="true"
        
      >
        <template v-slot:default="props">
          <v-row>
            <v-col md="4" cols="12" :key="i" v-for="(item, i) in props.items">
              <v-hover v-slot:default="{ hover }" open-delay="200">
                <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                  <v-card-title
                    >Pedido em
                    {{
                      new Date(item.created)
                        .toLocaleString()
                    }}
                    <v-spacer></v-spacer>
                    <div v-if="item.envio">
                            <v-icon small color="green">mdi-alpha-e-circle-outline</v-icon>
                        </div>
                        <div v-else>
                            <v-icon small color="red">mdi-alpha-e-circle-outline</v-icon>
                        </div>
                  </v-card-title>
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
                        >Ver localização
                      </v-btn>
                    </div>
                  </v-expand-transition>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-card>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    itemsPerPageArray: [12, 10, 5],
    search: "",
    itemsPerPage: 12,
    sortBy: "",
    page: 1,
  }),
  computed: {
    ...mapGetters(["getHistorico", "getHistoricoRender"]),
    numberOfPages() {
      return Math.ceil(this.getHistorico.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
  },
  methods: {
    ...mapActions(["fetchHistorico"]),
    moveToProduct(e) {
      //console.log(e);
      
      this.$router.push({
        name:'locationItem',
        params: {
          object: e,
        },
      });
      
    },
    searchInTable(e) {
      this.search = e[0].id;
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
    async checkFetchHistorico(){
      await this.fetchHistorico().then(() => {
      //console.log(this.getHistorico);
      //console.log(this.getHistoricoRender)
    });
    },
  },
  created() {
    this.checkFetchHistorico();
  },
};
</script>
<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
</style>