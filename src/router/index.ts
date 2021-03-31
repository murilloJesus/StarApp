import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '.././views/Home.vue'
import Login from '.././views/Login.vue'
//MENSAGEM
import Mensagem from '.././views/Mensagem/index.vue'
import verMensagem from '.././views/Mensagem/ver.vue'
//CADASTRO
import Cadastro from '.././views/Cadastro/index.vue'
//BOLETIM
import ListaBoletim from '.././views/boletim/lista.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/mensagem',
    name: 'mensagem',
    component: Mensagem
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: Cadastro,
  },
  {
    path: '/mensagem/ver/:id',
    name: 'ver mensagem',
    component: verMensagem
  },
  {
    path: '/boletim',
    name: 'Lista Boletins',
    component: ListaBoletim
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
