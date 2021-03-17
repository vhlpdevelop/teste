/* eslint-disable spaced-comment */
// TESTE DO VUEX LOGIN JS

import axios from "axios";

//const url = 'https://lobby-contador.herokuapp.com/auth/'
const url = "http://localhost:3000/product/";
let products = window.localStorage.getItem("products");
//console.log(products)
const state = {
  products: products ?  products  : "",
  respostaProduct: false,
};

const getters = {
  getRespostaProduct: (state) => state.respostaProduct,
  getProduct: (state) => state.products,
};

const actions = {
  async fetchProduct({ commit }, itemData) {
   
      try {
        await axios
          .get(url + "fetchProduct", itemData)
          .then(function(response) {
              //console.log(response)
            commit("setProducts", response.data)
            commit("setRespostaProduct", response.data.ok)
          });
      } catch (err) {
        commit("setProducts", '');
        commit("setRespostaProduct", false)
        console.log("erro:", err);
      }
    
  },
};

const mutations = {
  setProducts: (state, response) => {
    window.localStorage.setItem(
        "products",
        response
    );
    //console.log(response)
    state.products = response;
  },
  setRespostaProduct: (state, response) => (state.respostaProduct = response),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
