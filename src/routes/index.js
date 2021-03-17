import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/successpayment/:id',
      name: 'successpayment',
      component: () => import ('../components/Checkout/successpayment'),
      props:true
    },
    {
      path: '/*',
      component: () => import ('../components/Resources/pageNotfound'),
    },
    {
      path: '/verifyEmail/:id',
      name: 'verifyEmail',
      component: () => import ('../components/Account/verifyEmail'),
      props:true
    },
    {
      path:'/', 
      name: 'correcutia',
      props:true,
      component: () => import('../components/HomePage/homepage'), //PAGINA INICIAL
      children: [
        {
          path: '/aboutUs',
          name: 'aboutus',
          component: () => import('../components/HomePage/aboutUs'),
        },
        {
          path: '/contact',
          name: 'contact',
          component: () => import('../components/HomePage/contactPage')
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('../components/HomePage/InfoPage'),
        },
        {
          path: '/shop',
          name: 'shop',
          component:()=> import('../components/Shop/painelShop')
        },
        {
          path: '/cart',
          name: 'cart',
          component:()=> import('../components/Shop/cart')
        },
        {
        path: '/product/:object/?/:id',
        name: 'product',
        props:true,
        component:()=> import('../components/Shop/product')
        },
        {
          path: '/settings',
          name: 'settings',
          props:true,
          component: () => import('../components/Account/settings')
        },
        {
          path: '/history',
          name: 'history',
          component: ()=> import('../components/Account/history'),
        },
        {
          path: '/history/locationItem',
          name: 'locationItem',
          component: ()=> import('../components/Account/productLocal'),
          props:true
        },
        {
          path: '/checkout',
          name: 'checkout',
          component: () => import ('../components/Checkout/procedToCheckout')
        },

      ],
    },
  ]
})
