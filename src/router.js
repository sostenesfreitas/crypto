import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({

  routes: [
    { path: '/', component: load('Index') }, // Default
    { path: '/currency/:coin', component: load('lendig') },
    { path: '/tutorial', component: load('tutorial') },
    { path: '/teste', component: load('teste') },
    { path: '/sobre', component: load('sobre') },
    { path: '*', component: load('Error404') }
     // Not found
  ]
})
