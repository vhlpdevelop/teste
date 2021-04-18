<template>
  <v-container fluid class="pa-5">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card>
            <v-card-title>Informações de entrega</v-card-title>
            <v-row class="pa-5">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="user.endereco.cep"
                  id="cep"
                  name="cep"
                  :rules="[rules.required, rules.minCep]"
                  color="purple"
                  label="CEP"
                  type="number"
                  v-on:blur="pesquisacep(user.endereco.cep)"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  id="rua"
                  name="rua"
                  v-model="user.endereco.rua"
                  :rules="[rules.required]"
                  color="purple"
                  label="Endereço"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  id="bairro"
                  name="bairro"
                  v-model="user.endereco.bairro"
                  :rules="[rules.required]"
                  color="purple"
                  label="Bairro"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  id="cidade"
                  name="cidade"
                  v-model="user.endereco.cidade"
                  :rules="[rules.required]"
                  color="purple"
                  label="Cidade"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  id="complemento"
                  name="complemento"
                  v-model="user.endereco.complemento"
                  :rules="[rules.required]"
                  color="purple"
                  label="Complemento"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="user.endereco.num"
                  :rules="[rules.required]"
                  color="purple"
                  label="Número"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  id="uf"
                  name="uf"
                  v-model="user.endereco.estado"
                  :rules="[rules.required, rules.minEstado]"
                  color="purple"
                  label="Estado"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-btn :loading="loadingFrete" @click="calcularFrete()"
                  >Calcular Frete</v-btn
                >
              </v-col>

              <v-spacer></v-spacer>
            </v-row>
          </v-card>
        </v-card>
      </v-col>
      <v-col
        class="pa-5"
        :cols="12"
        md="3"
        sm="12"
        style="background-color: lightgray"
      >
        <p class="headline">Informações finais</p>
        <p class="overline">
          Selecione o tipo de entrega desejada, lembrando que o produto pode
          chegar de 7 até 15 dias
        </p>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td class="text-right" style="width: 50px">
                  <v-radio-group v-model="frete" column @change="updateTotal()">
                    <v-radio label="Sedex" color="green" :value="1"></v-radio>
                    <div>
                      <strong>R$ {{ getFreteSedex.valor }} - {{getFreteSedex.prazo}} dias</strong>
                    </div>
                    <v-radio label="Pac" color="blue" :value="2"></v-radio>
                    <div>
                      <strong>R$ {{ getFretePac.valor }} - {{getFretePac.prazo}} dias</strong>
                    </div>
                  </v-radio-group>
                </td>
              </tr>
              <tr v-show="checkDesconto">
                <td>Total sem Desconto</td>
                <td class="text-right" style="width: 50px">
                  <b
                    ><s
                      >R${{
                        (parseFloat(total) + parseFloat(desconto)).toFixed(2)
                      }}</s
                    ></b
                  >
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
            :disabled="!getFreteCheck"
            @click="payment()"
            class="primary white--text mt-5"
            outlined
            >Finalizar compra</v-btn
          >
        </div>
      </v-col>
      <div class="text-center pt-5">
        <v-img
          src="https://imgmp.mlstatic.com/org-img/MLB/MP/BANNERS/PSJ/575x40_banner_psj_3x.jpg"
          alt="Mercado Pago - Meios de pagamento"
          title="Mercado Pago - Meios de pagamento"
          height="40"
        >
        </v-img>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    loading: false,
    loadingFrete: false,
    snackAlert: false,
    total: 0,
    frete: 1,
    desconto: 0,
    checkDesconto: false,
    freteSedex: 0,
    fretePac: 0,
    user: {
      endereco: {
        rua: "",
        num: "",
        cep: "",
        complemento: "",
        bairro: "",
        estado: "",
        cidade: "",
      },
    },
    rules: {
      required: (value) => !!value || "Campo necessário",
      min: (v) => (v && v.length >= 6) || "Minimo 6 caracteres",
      minCep: (v) =>
        (v && v.length >= 8 && v.length < 9) || "Minimo 8 caracteres",
      minEstado: (v) =>
        (v && v.length >= 2 && v.length < 3) || "Minimo 2 caracteres",
    },
  }),
  mounted() {
    let mercadopago = document.createElement("script");
    mercadopago.setAttribute("id", "mercadopago");
    mercadopago.setAttribute(
      "src",
      "https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"
    );
    document.head.appendChild(mercadopago);
  },
  computed: {
    ...mapGetters([
      "getRespostaUser",
      "getUser",
      "getStatus",
      "getPlan",
      "getCart",
      "getFreteSedex",
      "getFretePac",
      "getFreteCheck",
    ]),
  },
  methods: {
    ...mapActions([
      "getProfile",
      "checkOutPlan",
      "updateProfile",
      "fetchFrete",
      "changeFrete",
    ]),
    calcularFrete() {
      this.loadingFrete = true;
      this.fetchFrete(this.user.endereco).then(() => {
        //console.log(this.getFrete);
        this.loadingFrete = false;
        this.updateTotal();
      });
    },
    updateTotal() {
      let valor = 0;
      if (this.frete === 1) {
        //SEDEX
        valor = parseFloat(parseFloat(this.getFreteSedex.valor).toFixed(2));
      }
      if (this.frete === 2) {
        //PAC
        valor = parseFloat(parseFloat(this.getFretePac.valor).toFixed(2));
      }
      this.total = 0;
      this.desconto = 0;
      for (let i = 0; i < this.getCart.length; i++) {
        if (this.getCart[i].qtd > 1) {
          this.checkDesconto = true;
        }
        this.total += this.getCart[i].preco * this.getCart[i].qtd;
      }
      if (this.checkDesconto || this.getCart.length > 1) {
        this.checkDesconto = true;
        this.desconto = this.total * 0.1;
        this.desconto = this.desconto.toFixed(2);
        this.total = this.total - this.total * 0.1;
      }
      if (valor !== 0) {
        this.total = parseFloat(parseFloat(this.total).toFixed(2)) + parseFloat(parseFloat(valor).toFixed(2));
      }
      this.total = parseFloat(this.total).toFixed(2);
    },
    payment() {
      this.loading = true;
      this.snackAlert = false;
      let tipo = "";
      let valor = 0;
      if (this.frete > 0 && this.frete < 3) {
        if (this.frete === 1) {
          tipo = "Sedex";
          valor = this.getFreteSedex.valor;
        }

        if (this.frete === 2) {
          tipo = "Pac";
          valor = this.getFretePac.valor;
        }
      }
      //console.log(this.getUser);
      let object = {
        cart: this.getCart,
        user: {
          id: this.getUser._id,
          firstName: this.getUser.firstName,
          lastName: this.getUser.lastName,
          email: this.getUser.email,
          telefone: this.getUser.telefone,
        },
        frete: {
          tipo: tipo,
          valor: valor,
        },
        endereco: this.user.endereco,
      };
      console.log(object);
      this.checkOutPlan(object).then((response) => {
        if (this.getStatus) {
          this.loading = false;
          //console.log(this.getPlan);
          window.location.href = this.getPlan.url;
        } else {
          this.loading = false;
          this.snackAlert = true;
        }
      });
    },

    limpa_formulário_cep() {
      //Limpa valores do formulário de cep.
      this.user.endereco.rua = "";
      this.user.endereco.bairro = "";
      this.user.endereco.estado = "";
      this.user.endereco.cidade = "";
    },
    async pesquisacep(valor) {
      //Nova variável "cep" somente com dígitos.
      this.changeFrete().then(() => {
        this.frete = 0;
      });
      var cep = valor.replace(/\D/g, "");

      //Verifica se campo cep possui valor informado.
      if (cep != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {
          //Cria um elemento javascript.
          this.user.endereco.rua = "";
          this.user.endereco.bairro = "";
          this.user.endereco.estado = "";
          this.user.endereco.cidade = "";
          //Sincroniza com o callback.
          var object;
          var instance = axios.create();
          delete instance.defaults.headers.common["Authorization"];
          await instance
            .get("https://viacep.com.br/ws/" + cep + "/json/")
            .then(function (response) {
              //console.log(response);
              object = response.data;
            })
            .catch((error) => {
              console.log("Procura por CEP ocorreu erro");
              //console.log(error);
            });
          this.user.endereco.rua = object.logradouro;
          this.user.endereco.bairro = object.bairro;
          this.user.endereco.estado = object.uf;
          this.user.endereco.cidade = object.localidade;
        } //end if.
        else {
          //cep é inválido.
          this.limpa_formulário_cep();
          alert("Formato de CEP inválido.");
        }
      } //end if.
      else {
        //cep sem valor, limpa formulário.
        this.limpa_formulário_cep();
      }
    },
  },
  created() {
    //Checar se o token é valido
    this.getProfile().then(() => {
      if (this.getRespostaUser) {
        this.user.firstName = this.getUser.firstName;
        this.user.lastName = this.getUser.lastName;
        this.user.telefone = this.getUser.telefone;
        this.user.email = this.getUser.email;
        this.user.endereco.rua = this.getUser.endereco.rua;
        this.user.endereco.num = this.getUser.endereco.num;
        this.user.endereco.cep = this.getUser.endereco.cep;
        this.user.endereco.complemento = this.getUser.endereco.complemento;
        this.user.endereco.bairro = this.getUser.endereco.bairro;
        this.user.endereco.estado = this.getUser.endereco.estado;
        this.user.endereco.cidade = this.getUser.endereco.cidade;
        this.updateTotal();
      } else {
        //TRATAR ISSO!
        //console.log("ERROR");
      }
    });
  },
};
</script>