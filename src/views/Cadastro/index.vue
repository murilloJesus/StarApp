<template>
  <ion-page>
    <ion-header :translucent="true" >
      <ion-toolbar color="palete-success">
        <ion-buttons slot="start">
          <ion-menu-button color="palete-white"></ion-menu-button>
        </ion-buttons>
        <ion-title color="palete-white">{{ nomeTab }}</ion-title>
      </ion-toolbar>
    </ion-header>

    
    <ion-content :fullscreen="true">
          <cadastro-aluno v-if="pages.indexOf('aluno') != -1" :page="page"></cadastro-aluno>
          <lista-responsaveis v-if="pages.indexOf('listaResponsaveis') != -1" :page="page"></lista-responsaveis>
          <documentos v-if="pages.indexOf('documentos') != -1" :page="page"></documentos>
          <complementares v-if="pages.indexOf('complementares') != -1" :page="page"></complementares>
    </ion-content>

    <ion-tabs @ionTabsWillChange="beforeTabChange"  @ionTabsDidChange="afterTabChange">
      <ion-tab-bar slot="bottom" color="palete-success">

        <ion-tab-button @click="addPage('|aluno')" >
          <ion-icon color="palete-white" :icon="personCircle"></ion-icon>
          <ion-label color="palete-white" >Aluno</ion-label>
        </ion-tab-button>

        <ion-tab-button @click="addPage('|listaResponsaveis')">
          <ion-icon color="palete-white"  :icon="list"></ion-icon>
          <ion-label color="palete-white" >Responsáveis</ion-label>
        </ion-tab-button>

        <ion-tab-button @click="addPage('|documentos')">
          <ion-icon color="palete-white"  :icon="document"></ion-icon>
          <ion-label color="palete-white" >Documentos</ion-label>
        </ion-tab-button>

        <ion-tab-button @click="addPage('|complementares')">
          <ion-icon color="palete-white"  :icon="medical"></ion-icon>
          <ion-label color="palete-white" >Fichas</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
<script>

import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import cadastroAluno from './aluno.vue'
import listaResponsaveis from './../Responsaveis/lista.vue';
import documentos from './../Documentos/lista.vue';
import complementares from './../Complemetares/lista.vue';
import { list, personCircle, document, medical } from 'ionicons/icons';
// import { useRouter } from 'vue-router';
// import { mapActions } from 'vuex';

export default {
    name: 'Cadastro',
    data() {
      return {
        pages: 'aluno'
      }
    },
    components: {
        //ion
        IonButtons,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        //vue comp
        cadastroAluno,
        listaResponsaveis,
        documentos,
        complementares
    },
    setup() {
      return { 
          list,
          personCircle,
          document,
          medical
        }
  },
  methods: {
    addPage(str) {
      this.pages = this.pages+str;
    }
  },
  computed: {
    pagesArray(){
      return this.pages.split('|');
    },
    page() {
      return this.pagesArray[this.pagesArray.length - 1]
    },
    nomeTab() {
      const paginas = {
        listaResponsaveis : 'Responsaveis',
        aluno : 'Cadastro',
        documentos :  'Documentos',
        complementares: 'Fichas Médicas'
      }
      return paginas[this.page]
    }
  }
}
</script>