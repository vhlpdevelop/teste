import Vue from 'vue'
import Vuex from 'vuex'
import storeLogin from './modules/login.store'
import storeCart from './modules/cart.store'
import storeUser from './modules/user.store'
import storeProduct from './modules/product.store'
import storeHistorico from './modules/historico.store'


import storePayment from './modules/payment.store'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        // store/modules files
        storeLogin,
        storeProduct,
        storeUser,
        storePayment,
        storeCart,
        storeHistorico
    }

})
