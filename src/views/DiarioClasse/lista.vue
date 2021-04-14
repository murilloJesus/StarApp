<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title> {{nomeTab}} </ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-list v-if="lista">
            <ion-item v-for="(item, index) in lista" :key="index" @click="openDiario(item.id)">
                <ion-label>
                    <p>{{item.nome_turmas}}</p>
                    <small>{{item.nome_disc}}</small><br>
                    <small>{{item.dia_semana}}</small>
                </ion-label>
            </ion-item>
        </ion-list>
        <skeleton-text v-if="!lista">

        </skeleton-text>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, modalController  } from '@ionic/vue';
import  skeletonText  from './../common/skeletonText.vue'
import  diario from './diario.vue'

import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

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
  },
  created() {
        this.load().then((res: any) => {
          this.lista = res.data
        })        
    },
    methods: {
      ...mapActions('diarioClasse', ['load']),
      async openDiario(id: any) {
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


<style>
.my-custom-class {
  --width: 50000px;
}
</style>