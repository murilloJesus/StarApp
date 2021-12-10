<template>
  <ion-page>
    <ion-header :translucent="true" >
      <ion-toolbar color="palete-warning">
        <ion-buttons slot="start">
          <ion-menu-button color="palete-white"></ion-menu-button>
        </ion-buttons>
        <ion-title color="palete-white"> Diario de Classe </ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-list v-if="lista">
            <group v-on:openDiario="openDiario" v-for="(item, index) in listaAgrupada" :key="index" :diarios="item" />
        </ion-list>
        <skeleton-text v-if="!lista">

        </skeleton-text>
    </ion-content>
  </ion-page>
</template>

<script >
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, modalController  } from '@ionic/vue';
import  skeletonText  from './../common/skeletonText.vue'
import  diario from './diario.vue'

import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import Group from './group.vue';

export default defineComponent({
  name: 'Lista Boletim',
  data() {
    return {
      lista: false,
      modal: {}
    }
  },
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    skeletonText,
    Group,
  },
  computed:{
    listaAgrupada() {
      return this.lista.reduce((newLista, index) => {

            newLista[index.data] = [...newLista[index.data] || [], index];
            return newLista;
            }, {});
    }
  },
  created() {
        this.load().then((res) => {
          this.lista = res.data
        })        
    },
    methods: {
      ...mapActions('diarioClasse', ['load']),
      async openDiario(id) {
            this.modal = await modalController
                .create({
                component: diario,
                cssClass: 'my-custom-class',
                componentProps: {
                        id: id,
                        closeMe: this.closeModal
                    },
                })
            return this.modal.present();
      },
      closeModal(){
        this.modal.dismiss()
      }
    }
})
</script>


<style scoped>
.my-custom-class {
  --width: 50000px;
}
.item.sc-ion-label-md-h, .item .sc-ion-label-md-h {
        color: var(--ion-color-palete-success-shade);
    }
</style>