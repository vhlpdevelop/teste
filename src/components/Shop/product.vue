<template>
  <div>
    <v-container>
      <div class="row">
        <div class="col-md-5 col-sm-5 col-xs-12">
          <v-carousel>
            <v-carousel-item v-for="(img, i) in item.image" :key="i" :src="img">
            </v-carousel-item>
          </v-carousel>
        </div>
        <div class="col-md-7 col-sm-7 col-xs-12">
          <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>
          <div class="pl-6">
            <p class="display-1 mb-0">{{ item.produto }}</p>
            <v-card-actions class="pa-0">
              <p class="headline font-weight-light pt-3">R${{ item.preco }}</p>
              <v-spacer></v-spacer>
            </v-card-actions>
            <p class="subtitle-1 font-weight-thin">
              {{ item.desc }}
            </p>
            <p class="title">Tamanho</p>
            <v-slider
              v-model="item.num"
              :min="1"
              :max="6"
              :tick-labels="ticksLabels"
              step="1"
              thumb-label="always"
              ticks
            ></v-slider>
            <div>
              <p class="title">Quantidade</p>

              <v-text-field
                v-model="item.qtd"
                :rules="[rules.counter]"
                outlined
                single-line
                type="number"
                style="width: 100px"
                :value="1"
                dense
              ></v-text-field>
            </div>
            <div style="float: left">
              <p class="title">Tipo de tira</p>

              <v-combobox
                @change="changeTira()"
                v-model="selected"
                :items="tiras"
                filled
                outlined
                solo
              ></v-combobox>
            </div>
            <div style="float: left">
              <p class="title">Cor da Tira</p>
              <v-combobox
                v-model="selectedCor"
                :items="cores"
                filled
                outlined
                solo
              ></v-combobox>
            </div>
            <v-btn
              @click="addOnCart()"
              class="primary white--text"
              outlined
              tile
              dense
              ><v-icon>mdi-cart</v-icon> Colocar no carrinho</v-btn
            >
          </div>
        </div>
      </div>
    </v-container>
    <v-overlay
      :z-index="zIndex"
      :value="overlay"
      color="black"
      class="text-center"
    >
      <span>Nosso site ainda não está pronto ainda!</span>
      <v-row>
        <v-col>
          <p>Para comprar nosos produtos,</p>
          <p>use nosso contato!</p>
          <p>(67) 998355896</p>
        </v-col>
      </v-row>
    </v-overlay>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  props: ["object"],
  data: () => ({
    rules: {
      required: (value) => !!value || "Required.",
      counter: (value) => value >= 1 || "mínimo é 1",
    },
    overlay: false,
    zIndex: 0,
    tamanho: 0,
    qtd: 1,
    selected: "Tira Tradicional",
    tiras: ["Tira Tradicional", "Tira Slim"],
    selectedCor: "Selecione a cor",
    cores: ["Azul Marinho", "Preto", "Branco"],
    ticksLabels: ["33/34", "35/36", "37/38", "39/40", "41/42", "43/44"],
    breadcrums: [
      {
        text: "Inicio",
        disabled: false,
        href: "/home",
      },
      {
        text: "Loja",
        disabled: false,
        href: "/shop",
      },
    ],
    item: {
      //Exemplo de item
      desc: "",
      preco: "",
      id: "",
      produto: "",
      tira: "",
      cor: "",
      qtd: 1,
      num: "34",
      id_num: "",
      image: [],
    },
  }),
  computed: mapGetters(["getCart"]),
  methods: {
    ...mapActions(["addCart"]),
    changeTira() {
      if (this.selected === "Tira Slim") {
        this.cores = ["Perola", "Preto", "Dourado"];
      } else {
        this.cores = ["Azul Marinho", "Preto", "Branco"];
      }
    },
    addOnCart() {
      if (this.selectedCor !== "Selecione a cor") {
        if (this.item.qtd >= 1) {
          //console.log(this.item.num)
          this.item.id_num = this.item.num;
          this.item.num = this.ticksLabels[this.item.num - 1];
          this.item.cor = this.selectedCor;
          this.item.tira = this.selected;
          this.addCart(this.item).then((response) => {
            //Após colocar no carrinho, mostrar ao usuário
          });
        } else {
        }
      }
    },
  },
  created() {
    if (this.object != null) {
      //console.log(this.object);
      this.item = this.object;
      if (this.object.tira != null) {
        this.selected = this.object.tira;
        this.selectedCor = this.object.cor;
      }
    }
  },
};
</script>
