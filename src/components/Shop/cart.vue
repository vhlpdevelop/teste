<template>
  <div>
    <v-container>
      <p class="display-3 font-weight-light text-center pa-4">Meu carrinho</p>
      <v-row>
        <v-col :cols="12" md="9" sm="12">
          <v-simple-table class="hidden-sm-and-down">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">ITEM</th>
                  <th class="text-center">PREÇO</th>
                  <th class="text-center">QUANTIDADE</th>
                  <th class="text-center">VALOR</th>
                  <th class="text-center"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in items" :key="i">
                  <td>
                    <v-list-item :key="i">
                      <v-list-item-avatar>
                        <v-img :src="item.image[0]"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>{{
                          item.produto
                        }}</v-list-item-title>
                        <v-list-item-subtitle>
                          Tamanho: {{ item.num }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </td>
                  <td>R${{ item.preco }}</td>
                  <td>
                    <v-text-field
                      class="pt-10"
                      label="Outlined"
                      style="width: 80px"
                      single-line
                      outlined
                      :rules="[rules.counter]"
                      v-model="item.qtd"
                      type="number"
                      @change="addOnCart(item)"
                    ></v-text-field>
                  </td>
                  <td>R${{ (item.preco * item.qtd).toFixed(2) }}</td>
                  <td>
                    <v-btn icon x-small @click="cartRemove(item)">
                      <v-icon color="red lighten-1">mdi-cancel</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-layout v-resize="onResize" column style="padding-top: 56px">
            <v-data-table
              :headers="headers"
              disable-sort
              disable-pagination
              disable-filtering
              :items="items"
              class="hidden-md-and-up"
            >
              <template v-slot:item="props">
                <tr v-if="isMobile">
                  <td>
                    <v-avatar>
                      <v-img :src="props.item.image[0]"></v-img>
                    </v-avatar>
                  </td>
                  <td class="text-center pa-5">
                    <div>
                      <span style="color: grey">Produto</span><br />
                      {{ props.item.produto }}
                    </div>
                    <div>
                      <br /><span style="color: grey">Valor</span><br />R${{
                        props.item.preco
                      }}
                    </div>
                  </td>
                  <td class="text-center pa-5">
                    <div>
                      <span style="color: grey">Tamanho</span><br />
                      {{ props.item.num }}
                    </div>
                    <div>
                      <br /><span style="color: grey">Total</span><br />R${{
                        (props.item.preco * props.item.qtd).toFixed(2)
                      }}
                    </div>
                  </td>
                  <td class="flex-item">
                    <v-text-field
                      class=""
                      label="Outlined"
                      style="width: 40px"
                      single-line
                      outlined
                      :rules="[rules.counter]"
                      v-model="props.item.qtd"
                      type="number"
                      @change="addOnCart(props.item)"
                    ></v-text-field>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-layout>
        </v-col>
        <v-col :cols="12" md="3" sm="12" style="background-color: lightgray">
          <p class="headline">Resumo de pedidos</p>
          <p class="overline">
            Valor calculado ainda não está incluso no frete, continue para o
            pagamento para obter o valor do frete.
          </p>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr v-show="checkDesconto">
                  <td>Total sem Desconto</td>
                  <td class="text-right" style="width: 50px">
                    <b><s>R${{ (parseFloat(total)+parseFloat(desconto)).toFixed(2) }}</s></b>
                  </td>
                </tr>
                <tr v-show="checkDesconto">
                  <td class="green--text">Desconto</td>
                  <td class="text-right">
                    <b>R${{ desconto }}</b>
                  </td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td class="text-right" style="width: 50px">
                    <b>R${{ total }}</b>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="text-center">
            <v-btn
              @click="ToCheckout()"
              class="primary white--text mt-5"
              outlined
              >Ir para o pagamento</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-overlay
      :z-index="zIndex"
      :value="overlay"
      color="black"
      class="text-center"
    >
      <span>Opa! seu carrinho está vazio!</span>
      <v-row>
        <v-col>
          <p>Coloque pelo menos 1 produto para</p>
          <p>realizar o checkout!!</p>
        </v-col>
      </v-row>
    </v-overlay>
  </div>
</template>
<script>
import { SecondEventBus } from "../HomePage/SecondEventBus";
import { EventBus } from "../HomePage/EventBus";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    overlay: false,
    zIndex: 0,
    isMobile: false,
    desconto: 0,
    checkDesconto: false,
    headers: [
      {
        text: "Item",
        align: "left",
        value: "produto",
      },
      {
        text: "tamanho",
        value: "num",
      },
      {
        text: "quantidade",
        value: "qtd",
      },
      {
        text: "valor",
        value: "preco",
      },
    ],
    rules: {
      required: (value) => !!value || "Required.",
      counter: (value) => value >= 1 || "mínimo é 1",
    },
    items: [],
    total: 0,
    selected: [],
  }),
  computed: mapGetters(["getCart", "getCartSize", "getAuth"]),
  created() {
    if (this.getCart.length === 0) {
      this.overlay = true;
    } else {
      this.items = this.getCart;
      console.log(this.items);
      this.updateTotal();
    }
  },
  methods: {
    ...mapActions(["addCart", "DeleteItem"]),
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.items.slice();
    },
    addOnCart(item) {
      this.addCart(item);
      this.checkDesconto = false
      this.updateTotal();
    },
    updateTotal() {
      this.total = 0;
      this.desconto = 0;
      for (let i = 0; i < this.getCart.length; i++) {
        if (this.getCart[i].qtd > 1) {
          this.checkDesconto = true;
        }
        this.total += this.getCart[i].preco * this.getCart[i].qtd;
      }
      if(this.checkDesconto || this.getCart.length > 1){
        this.checkDesconto = true
        this.desconto = this.total * 0.1;
        this.desconto = this.desconto.toFixed(2)
        this.total = this.total - (this.total * 0.1)
      }
      this.total = this.total.toFixed(2);
    },
    ToCheckout() {
      if (!this.getAuth) {
        EventBus.$emit("CheckLogged"); //Emite para ver se está logado
      } else {
        this.$router.push({
          name: "checkout",
        });
      }
    },
    cartRemove(item) {
      //Função remover item do cart
      this.DeleteItem(item).then((response) => {
        this.checkDesconto = false
        this.updateTotal();
      });
    },
  },
};
</script>
<style>
.mobile {
  color: #333;
}

@media screen and (max-width: 768px) {
  .mobile table.v-table tr {
    max-width: 100%;
    position: relative;
    display: block;
  }

  .mobile table.v-table tr:nth-child(odd) {
    border-left: 6px solid deeppink;
  }

  .mobile table.v-table tr:nth-child(even) {
    border-left: 6px solid cyan;
  }

  .mobile table.v-table tr td {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    height: auto;
    padding: 10px;
  }

  .mobile table.v-table tr td ul li:before {
    content: attr(data-label);
    padding-right: 0.5em;
    text-align: left;
    display: block;
    color: #999;
  }
  .v-datatable__actions__select {
    width: 50%;
    margin: 0px;
    justify-content: flex-start;
  }
  .mobile .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
    background: transparent;
  }
}
.flex-content {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.flex-item {
  padding: 5px;
  width: 50%;
  height: 40px;
  font-weight: bold;
}
</style>