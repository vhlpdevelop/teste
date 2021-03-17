<template>
  <div id="app">
    <v-app>
      <v-dialog
        v-model="dialogAtt"
        persistent
        max-width="600px"
        min-width="360px"
      >
        <div>
          <v-row>
            <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
              <v-btn x-large icon color="red" @click="closeDialog()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <div>
          <v-tabs
            v-model="tab"
            show-arrows
            background-color="deep-purple accent-4"
            icons-and-text
            dark
            grow
          >
            <v-tabs-slider color="purple darken-4"></v-tabs-slider>
            <v-tab v-for="i in tabs" :key="i.name">
              <v-icon large>{{ i.icon }}</v-icon>
              <div class="caption py-1">{{ i.name }}</div>
            </v-tab>
            <v-tab-item>
              <v-card v-if="!logged" class="px-4">
                <v-card-text>
                  <v-form ref="loginForm" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="loginEmail"
                          :rules="loginEmailRules"
                          label="E-mail"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="loginPassword"
                          
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Password"
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-col class="d-flex" cols="12" sm="6" xsm="12">
                        <div v-show="this.msg.ok"> 
                        <span class="red--text">{{this.msg.msg}}</span>
                        </div>
                      </v-col>
                      

                      <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                        <v-btn
                          x-large
                          block
                          :disabled="!valid"
                          color="success"
                          @click="login"
                          :loading="loader"
                        >
                          Entrar
                        </v-btn>
                      </v-col>
                      <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                        <v-btn x-large icon color="red">
                          <v-icon>mdi-google</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
              <v-card v-if="logged">
                <h1>Você entrou!</h1>
                <span>Para mais informações, entre nas configurações da conta</span>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card class="px-4" v-if="!concludedRegister">
                <v-card-text>
                  <v-form
                    ref="registerForm"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-row>
                      <v-col cols="12" md="12" class="text-center">
                        <span>Dados da Conta</span>
                        <v-divider></v-divider>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="user.firstName"
                          :rules="[rules.required]"
                          label="Nome"
                          maxlength="20"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="user.lastName"
                          :rules="[rules.required]"
                          label="Sobrenome"
                          maxlength="20"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="user.email"
                          :rules="emailRules"
                          label="E-mail"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="user.telefone"
                          :rules="[rules.required]"
                          label="Telefone"
                          required
                        ></v-text-field>
                      </v-col>
                      
                      <v-col cols="12" md="12" class="text-center">
                        <span>Informações de Entrega</span>
                        <v-divider></v-divider>
                      </v-col>
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
                      <v-col cols="12" md="12"> </v-col>
                      <v-col cols="12" md="12" class="text-center">
                        <span>Credenciais</span>
                        <v-divider></v-divider>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="user.password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Sua senha"
                          hint="Minimo de 6 caracteres!"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6" sm="6">
                        <v-text-field
                          block
                          v-model="verify"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, passwordMatch]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Confirme senha"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col
                        class="d-flex ml-auto"
                        cols="12"
                        md="4"
                        sm="3"
                        xsm="12"
                      >
                        <v-btn
                          x-large
                          block
                          :disabled="!valid"
                          color="success"
                          @click="validate"
                          :loading="loader"
                          >Criar conta</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
              <v-card v-if="concludedRegister" class="px-4">
                <v-card-text>
                  <span>Cadastro conclúido com sucesso!</span>
                  <p><span>Agora verifique seu email para entrar!</span></p>
                  <v-row>
                    <v-col cols="12" class="text-center">
                      <v-icon>mdi-success</v-icon>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </div>
        <v-snackbar v-model="snackErro" color="error">
          <v-layout justify-space-around align-center>{{ snackMsg }}</v-layout>
        </v-snackbar>
      </v-dialog>
    </v-app>
  </div>
</template>
<script>
import { EventBus } from "../Dashboard/EventBus";
import axios from "axios";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  props:["msg"],
  computed: {
    ...mapGetters(["getMessageUser", "getRespostaUser", "getMessageLogin", "getAuth"]),
    passwordMatch() {
      return () => this.user.password === this.verify || "As senhas não são iguais";
    },
  },
  methods: {
    ...mapActions(["registrarUser", "FazerLogin"]),
    closeDialog() {
      if(this.getAuth){
        this.$emit("close-dialog-Login");
      }else{
        this.$emit("close-dialog");
      }
    },
    async closeDialogLogin() {
      await setTimeout(()=>{
        this.$emit("close-dialog-Login");
      }, 3000);
    },
    validateEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    login(){
      let object = {
        login: this.loginEmail,
        pss: this.loginPassword
      }
      this.loader = true
      this.FazerLogin(object).then( response => {
        if(this.getAuth){
          this.loader=false
          this.logged = true
          this.closeDialogLogin()
        }else{
          
          this.loader = false
          this.snackMsg = this.getMessageLogin
          this.snackErro = true
        }
      });
    },
    validate() {
      this.validateEmail(this.user.email);
      this.loader = true;
      this.registrarUser(this.user).then((response) => {
        console.log(this.getRespostaUser)
        if (this.getRespostaUser) {
          this.concludedRegister = true
          this.snackErro = false;
          this.loader = false;
        } else {
          this.concludedRegister = false
          this.loader = false;
          this.snackErro = true
          this.snackMsg = this.getMessageUser;
        }
      });
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
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
      var cep = valor.replace(/\D/g, "");

      //Verifica se campo cep possui valor informado.
      if (cep != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {
          //Cria um elemento javascript.
          var script = document.createElement("script");
          this.user.endereco.rua = "";
          this.user.endereco.bairro = "";
          this.user.endereco.estado = "";
          this.user.endereco.cidade = "";
          //Sincroniza com o callback.
          var object;
          var instance = axios.create();
            delete instance.defaults.headers.common['Authorization'];
          await instance
            .get("https://viacep.com.br/ws/" + cep + "/json/")
            .then(function (response) {
              console.log(response);
              object = response.data;
            })
            .catch((error) => {
              console.log("Procura por CEP ocorreu erro");
              console.log(error);
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
  data: () => ({
    dialogAtt: true,
    concludedRegister: false,
    tab: 0,
    loader: false,
    tabs: [
      { name: "Entrar", icon: "mdi-account" },
      { name: "Nova conta", icon: "mdi-account-outline" },
    ],
    valid: true,
    email: "",
    password: "",
    verify: "",
    logged: false,
    snackErro: false,
    snackMsg: "",
    loginPassword: "",
    loginEmail: "",
    user: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      telefone: "",
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
    loginEmailRules: [
      (v) => !!v || "Campo necessário",
      (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
    ],
    emailRules: [
      (v) => !!v || "Campo necessário",
      (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
    ],

    show1: false,
    rules: {
      required: (value) => !!value || "Campo necessário",
      min: (v) => (v && v.length >= 6) || "Minimo 6 caracteres",
      minCep: (v) =>
        (v && v.length >= 8 && v.length < 9) || "Minimo 8 caracteres",
      minEstado: (v) =>
        (v && v.length >= 2 && v.length < 3) || "Minimo 2 caracteres",
    },
  }),
};
</script>
<style>
</style>