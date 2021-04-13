/* eslint-disable spaced-comment */

import axios from "axios";

const url = 'https://api-correcutia.herokuapp.com/mercadopago/'
//const url = "http://localhost:3000/mercadopago/";
const state = {
  sessionID: "",
  status: "",
  plan: "",
  freteSedex: "",
  fretePac: "",
  freteCheck: false,
  paymentCheck: false,
  paymentData: '',
};

const getters = {
  getSessionID: (state) => state.sessionID,
  getStatus: (state) => state.status,
  getPlan: (state) => state.plan,
  getFreteSedex: (state) => state.freteSedex,
  getFretePac: (state) => state.fretePac,
  getFreteCheck: (state) => state.freteCheck,
  getPaymentCheck: (state) => state.paymentCheck,
  getPaymentData: (state) => state.paymentData
};

const actions = {
  async changeFrete({commit}){
    commit('SetFreteCheck', false)
  },
  async verifyTokenSuccess({commit}, itemData){
    if(itemData !== null){
      //console.log(itemData)
      try{
        await axios.get('http://localhost:3000/payments/successpayment/'+`Bearer ${itemData}`).then(function (response) {
          commit('SetPaymentCheck', response.data.ok);
          commit('SetPaymentData', response.data.email)
        })
      }catch(e){
        console.log(e)
        commit('setMessageUser', "Erro ao enviar verificação");
        commit('setRespostaUser', false)
      }
    }
  },
  async fetchFrete({commit}, itemData){
    try{
      await axios.post(url + "fetchFreteSedex", itemData).then( function(response){
        commit("SetFreteSedex", response.data.valor)
        commit("SetFreteCheck", response.data.ok)
      }, (error)=>{ //Caso de erro
        commit("SetFreteSedex", '0')
        commit("SetFreteCheck", false)
      });
    }catch(e){
      console.log(e.message)
      commit("SetFrete", '0')
    }
    try{
      await axios.post(url + "fetchFretePac", itemData).then( function(response){
        commit("SetFretePac", response.data.valor)
        commit("SetFreteCheck", response.data.ok)
      }, (error)=>{ //Caso de erro
        commit("SetFretePac", '0')
        commit("SetFreteCheck", false)
      });
    }catch(e){
      console.log(e.message)
      commit("SetFrete", '0')
    }
  },
  async fetchPlan({commit}, itemData){
    let object = {
      id: itemData
    }
    try{
      await axios.post(url + "fetchPlan", object).then( function(response){
        //console.log("Flag 1")
        //console.log(response.data)
        commit("SetPlan", response.data)
        commit("SetStatus", true)
      }, (error)=>{ //Caso de erro
        //console.log("Flag 2")
        commit("SetPlan", '')
        commit("SetStatus", false)
      });
    }catch(e){
      console.log(e.message)
      commit("SetPlan", '')
      commit("SetStatus", false)
    }
  },
  async checkOutPlan({commit}, itemData){
    try{
      await axios.post(url + "fetchProduct", itemData,{
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
      }, 
      }).then( function(response){
        commit("SetPlan", response.data)
        commit("SetStatus", true)
      }, (error)=>{ //Caso de erro
        commit("SetPlan", '')
        commit("SetStatus", false)
      });
    }catch(e){
      console.log(e)
      commit("SetPlan", '')
      commit("SetStatus", false)
    }
  },
  async getPagSession({ commit }) {
    try {
      await axios.post(url + "fetchSession").then(function(response) {
        //console.log(response.data)
        if(response.data.ok){
            commit("SetSession", response.data.session_id);
            commit("SetStatus", response.data.ok)
        }
      });
    } catch (err) {
      commit("respostaLogin", false);
      commit("messageLogin", "Erro ao enviar");
      console.log("erro:", err);
    }
  },
};

const mutations = {
  SetSession: (state, sessionID) => (state.sessionID = sessionID),
  SetPaymentCheck: (state, paymentCheck) => (state.paymentCheck = paymentCheck),
  SetPaymentData: (state, paymentData) => (state.paymentData = paymentData),
  SetStatus: (state, status) => (state.status = status),
  SetPlan: (state, plan) => (state.plan = plan),
  SetFreteSedex: (state, frete) => (state.freteSedex = frete),
  SetFretePac: (state, frete) => (state.fretePac = frete),
  SetFreteCheck: (state, freteCheck) => (state.freteCheck = freteCheck)
};

export default {
  state,
  getters,
  actions,
  mutations,
};
