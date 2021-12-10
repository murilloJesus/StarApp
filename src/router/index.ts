import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '.././views/Home.vue'
import Login from '.././views/Login.vue'
import School from '.././views/School.vue'
import Loading from '.././views/Loading.vue'
//MENSAGEM
import Mensagem from '.././views/Mensagem/index.vue'
import verMensagem from '.././views/Mensagem/ver.vue'
//CADASTRO
import Cadastro from '.././views/Cadastro/index.vue'
//BOLETIM
import ListaBoletim from '.././views/Boletim/lista.vue'
//DIARIO
import ListaDiarioClasse from '.././views/DiarioClasse/lista.vue'
import { UserService } from '@/services/user.service';
//FINANCEIRO
import Financeiro from '.././views/Financeiro/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Loading',
    component: Loading
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/escola',
    name: 'Escola',
    component: School
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/mensagem',
    name: 'Mensagem',
    component: Mensagem
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Cadastro,
  },
  {
    path: '/mensagem/ver/:id',
    name: 'verMensagem',
    component: verMensagem
  },
  {
    path: '/boletim',
    name: 'Boletim',
    component: ListaBoletim
  },
  {
    path: '/diario',
    name: 'Diario',
    component: ListaDiarioClasse
  },
  {
    path: '/financeiro',
    name: 'Financeiro',
    component: Financeiro
  },
  {
    path: '/logout',
    name: 'Sair',
    redirect: () => {
        UserService.removeUser();
        return '/login'
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
