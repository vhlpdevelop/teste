<template>
  <v-container fluid class="pa-5">
    <v-row no-gutters justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card>
            <v-card-title>Informações do Pedido</v-card-title>
            <v-card-subtitle
              >Produto pedido em
              {{ new Date(object.created).toLocaleString() }}</v-card-subtitle
            >
            <v-row class="pa-5">
              <div v-for="(object, y) in object.items" :key="y">
                <v-col cols="12" md="12">
                  <v-avatar tile class="elevation-10 mb-12" size="128">
                    <v-img :src="object.picture_url"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="12" md="12">
                  <div style="font-size: small">{{ object.description }}</div>
                </v-col>
                <v-col cols="12" md="12">
                  <div class="grey--text">Produto</div>
                  {{ object.title }}
                </v-col>
                <v-col cols="12" md="12">
                  <div class="grey--text">Quantidade</div>
                  {{ object.quantity }}
                </v-col>
                <v-col cols="12" md="12">
                  <div class="grey--text">Valor</div>
                  R${{ object.unit_price }}
                </v-col>
                <v-col cols="12" md="12">
                  <div class="grey--text">Tamanho</div>
                  {{ object.category_id }}
                </v-col>
                <v-spacer></v-spacer>
              </div>
            </v-row>
          </v-card>
        </v-card>
      </v-col>
      <v-col
        class="pa-3"
        :cols="12"
        md="4"
        sm="12"
        style="background-color: lightgray"
      >
        <p class="headline">Localização do produto</p>
        <div v-if="object.envio">
          <p>ID de rastreio = {{ object.id_rastreamento }}</p>
          <p class="overline">
            Produtos podem variar a entrega dependendo da quantidade
          </p>
          <v-simple-table style="width: 500px">
            <template v-slot:default>
              <tbody>
                <div v-for="(item, i) in getCorreio" :key="i">
                  <tr>
                    <td class="pl-2 pr-5">
                      <div class="grey--text">
                      Data e Hora
                      </div>
                    </td>
                    <td class=" d-flex justify-end">
                      <v-container>
                        <b>{{ item.data }} {{ item.hora }}</b>
                      </v-container>
                    </td>
                  </tr>
                  <tr>
                    <td class="pl-2 pr-5">
                       <div class="grey--text">
                         Descrição
                       </div>   
                      </td>
                    <td class=" d-flex justify-end">
                      <v-container>
                        <b class="flex-nowrap">{{ item.status }}</b>
                      </v-container>
                    </td>
                  </tr>
                  <div>
                    <tr v-if="item.local !== undefined">
                      <td class="pl-2 pr-5">
                         <div class="grey--text">
                           Local
                         </div>
                         </td>
                      <td class=" d-flex justify-end">
                        <v-container>
                          <b class="flex-nowrap">{{ item.local }}</b>
                        </v-container>
                      </td>
                    </tr>
                  </div>
                  <div v-if="item.origem !== undefined">
                    <tr>
                      <td class="pl-2 pr-5">
                         <div class="grey--text">
                           Origem
                         </div>
                         </td>

                      <td class=" d-flex justify-end">
                        <v-container>
                          <b class="flex-nowrap">{{ item.origem }}</b>
                        </v-container>
                      </td>
                    </tr>
                    <tr>
                      <td class="pl-2 pr-5">
                         <div class="grey--text">
                           Destino
                         </div>
                         </td>

                      <td class=" d-flex justify-end">
                        <v-container>
                          <b class="flex-nowrap">{{ item.destino }}</b>
                        </v-container>
                      </td>
                    </tr>
                  </div>

                  <div
                    v-if="getCorreio[i + 1] === undefined"
                    style="text-align: center; vertical-align: middle"
                  >
                    <v-icon> mdi-map-marker-check </v-icon>
                    <p class="green--text">Objeto entregue</p>
                  </div>
                  <div
                    v-else
                    style="text-align: center; vertical-align: middle"
                  >
                    <v-icon color="yellow lighten-1"> mdi-chevron-double-down </v-icon>
                  </div>
                </div>
              </tbody>
            </template>
          </v-simple-table>
        </div>
        <div v-else>
          <p class="overline">
            Estamos ainda empacotando seu produto, aguarde. Logo iremos
            informa-lo quando o produto sair.
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["object"],
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapGetters(["getCorreio", "getCorreioRender"]),
  },
  methods: {
    ...mapActions(["fetchCorreio"]),
  },
  created() {
    //Checar se o existe um object
    if (this.object !== undefined) {
      if (this.object.envio)
        this.fetchCorreio(this.object.id_rastreamento).then(() => {
          //console.log("Foi?");
        });
    } else {
      //console.log("alo");
      this.$router.push({
        name: "history",
      });
    }
  },
};
</script>