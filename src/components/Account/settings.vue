<template>
  <v-container
    id="user-profile-view"
    fluid
    tag="section"
    class="pa-5"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <materialcard
        class="pa-5"
          color="primary"
          icon="mdi-account-outline"
        >
          <template #title>
            Configurações   
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                >
                  <v-text-field
                    disabled
                    label="Email"
                    v-model="user.email"
                  />
                </v-col>


                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    color="purple"
                    label="Nome"
                    v-model="user.firstName"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    color="purple"
                    label="Sobrenome"
                    v-model="user.lastName"
                  />
                </v-col>
                <v-col cols="12"
                md="12"
                class="text-center">
                <span>Informações de Entrega</span>
                <v-divider></v-divider>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    color="purple"
                    label="Endereço"
                    v-model="user.endereco.rua"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    color="purple"
                    label="Bairro"
                    v-model="user.endereco.bairro"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    color="purple"
                    label="Cidade"
                    v-model="user.endereco.cidade"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    color="purple"
                    label="Número"
                    v-model="user.endereco.num"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    color="purple"
                    label="Estado"
                    v-model="user.endereco.estado"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
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

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    color="purple"
                    label="Complemento"
                    
                    v-model="user.endereco.complemento"
                  />
                </v-col>

                <v-col cols="12" md="12" class="text-center">
                        <span>Credenciais</span>
                        <v-divider></v-divider>
                      </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    color="primary"
                    label="Senha Antiga"
                    type="password"
                    v-model="user.password"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    color="primary"
                    label="Senha Nova"
                    type="password"
                    v-model="user.newPassword"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-checkbox
                    color="primary"
                    label="Concordo em receber as Newsletter"
                    v-model="user.newsletter"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="primary"
                    min-width="150"
                    @click="trySave"
                  >
                   Atualizar
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </materialcard>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackSucesso" color="success">
      <v-layout justify-space-around align-center>Dados alterados</v-layout>
    </v-snackbar>
    <v-snackbar v-model="snackErro" color="error">
      <v-layout justify-space-around align-center>{{getMessageUser}}</v-layout>
    </v-snackbar>
  </v-container>
</template>
<script>
import axios from "axios";
import MaterialCard from '../Resources/MaterialCard'
import { mapState, mapActions, mapGetters } from "vuex";
export default {
    components:{
        materialcard: MaterialCard
    },
  computed: {
    ...mapGetters(["getMessageUser", "getRespostaUser", "getUser"]),
    passwordMatch() {
      return () => this.user.password === this.verify || "As senhas não são iguais";
    },
  },
  methods: {
    ...mapActions(["getProfile", "updateProfile"]),
    trySave(){
      this.updateProfile(this.user).then( () => {
        if(this.getRespostaUser){
          this.snackErro = false
          this.snackSucesso = true
        }else{
          this.snackSucesso = false
          this.snackErro = true
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
    }
  },
  data: () => ({
        rules: {
      required: (value) => !!value || "Campo necessário",
      min: (v) => (v && v.length >= 6) || "Minimo 6 caracteres",
      minCep: (v) =>
        (v && v.length >= 8 && v.length < 9) || "Minimo 8 caracteres",
      minEstado: (v) =>
        (v && v.length >= 2 && v.length < 3) || "Minimo 2 caracteres",
    },
    snackErro: false,
    snackSucesso: false,
    timeout: 5000,
    user: {
      firstName: "",
      lastName: "",
      email: "",
      newsletter: "",
      telefone: "",
      password: "",
      newPassword: "",
      endereco: {
        rua: "",
        num: "",
        cep: "",
        complemento: "",
        bairro: "",
        estado: "",
        cidade: "",
      },
    }
  }),
  created(){ //Checar se o token é valido
    this.getProfile().then( () => {
      if(this.getRespostaUser){
        this.user.firstName = this.getUser.firstName
        this.user.lastName =this.getUser.lastName
        this.user.telefone = this.getUser.telefone
        this.user.email =this.getUser.email
        this.user.endereco.rua =this.getUser.endereco.rua
        this.user.endereco.num =this.getUser.endereco.num
        this.user.endereco.cep =this.getUser.endereco.cep
        this.user.newsletter = this.getUser.newsletter
        this.user.endereco.complemento =this.getUser.endereco.complemento
        this.user.endereco.bairro =this.getUser.endereco.bairro
        this.user.endereco.estado = this.getUser.endereco.estado
        this.user.endereco.cidade = this.getUser.endereco.cidade
      }else{ //TRATAR ISSO!
        console.log("ERROR")
      }
    });
  }
};
</script>