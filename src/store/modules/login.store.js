/* eslint-disable spaced-comment */
// TESTE DO VUEX LOGIN JS

import axios from "axios";

const url = 'https://api-correcutia.herokuapp.com/auth/'
//const url = "http://localhost:3000/auth/";
let session = window.localStorage.getItem("session");
if(session !== "") axios.defaults.headers.common["Authorization"] = session;
//console.log(session)
const state = {
  session: session ?  session  : "",
  authLogin: false,
  messageLogin: "",
  checkToken: false,
};

const getters = {
  getAuth: (state) => state.authLogin,
  getSession: (state) => state.session,
  getMessageLogin: (state) => state.messageLogin,
  getCheckToken: (state) => state.checkToken
};

const actions = {
  async alterarSenha({ commit }, itemData) {
    if (itemData !== null || itemData !== "") {
      try {
        await axios
          .post(url + "alterarSenha", itemData)
          .then(function(response) {
            let object = {
              ok: response.data.ok,
              msg: response.data.msg,
            };
            if (response.data.ok) {
              commit("respostaLogin", object);
            } else {
              commit("respostaLogin", object);
            }
          });
      } catch (err) {
        commit("respostaLogin", {
          ok: false,
          msg: "Não foi possivel realizar esta Tarefa",
        });
        //console.log("erro:", err);
      }
    }
  },
  async pedidoAlterarSenha({ commit }, itemData) {
    if (itemData !== null || itemData !== "") {
      try {
        await axios
          .post(url + "pedidoAlterarSenha", itemData)
          .then(function(response) {
            let object = {
              ok: response.data.ok,
              msg: response.data.msg,
            };
            if (response.data.ok) {
              commit("respostaLogin", object);
            } else {
              commit("respostaLogin", object);
            }
          });
      } catch (err) {
        commit("respostaLogin", {
          ok: false,
          msg: "Não foi possivel realizar esta Tarefa",
        });
        //console.log("erro:", err);
      }
    }
  },
  async checkToken({commit}){ //IMPORTANTE
    let itemData={
      session: state.session
    }
    await axios
      .post(url + "checkToken", itemData)
      .then(function(response) {
        //console.log(response.data)
        commit("setCheckToken", response.data.ok)
        commit("setAuthLogin", response.data.ok)
        if(response.data.ok)
          axios.defaults.headers.common["Authorization"] = state.session;
      }).catch(function(error){
        //console.log(error)
        commit("setCheckToken", false)
      })
        
      
  },
  async LogOut({ commit }) {
    commit("setAuthLogin", false);
    commit("setSession", '');
    window.localStorage.setItem(
      "session",
      ''
    );
  },
  async FazerLogin({ commit }, itemData) {
    let dataToSend = {
      email: itemData.login,
      pss: itemData.pss,
    };
    await axios
      .post(url + "login", dataToSend)
      .then(function(response) {
        //console.log(response);
        if (response.data.success === true) {
          axios.defaults.headers.common["Authorization"] = JSON.stringify( `Bearer ${response.data.token}`);
          commit("setAuthLogin", response.data.success);
          commit("setSession", JSON.stringify(`Bearer ${response.data.token}`));
          commit("messageLogin", response.data.msg);
          window.localStorage.setItem(
            "session",
            JSON.stringify(`Bearer ${response.data.token}`)
          );
          //console.log(JSON.stringify( `Bearer ${response.data.token}`))
        } else {
          commit("messageLogin", response.data.msg);
          commit("setAuthLogin", response.data.success);
        }
      })
      .catch(function(error) {
        console.log(error, error.message);
        commit("messageLogin", error);
      });
  }, 
};

const mutations = {
  setAuthLogin: (state, response) => {
    state.authLogin = response;
  },
  setCheckToken: (state, response) => (state.checkToken = response),
  respostaLogin: (state, respostaLogin) =>
    (state.respostaLogin = respostaLogin),
  messageLogin: (state, messageLogin) => (state.messageLogin = messageLogin),
  setSession: (state, session) => {
    state.session = session;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
