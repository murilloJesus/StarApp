import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '.././views/Home.vue'
import Login from '.././views/Login.vue'
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
  {
    path: '/diario',
    name: 'Diarios de Classe',
    component: ListaDiarioClasse
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
