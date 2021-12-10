<template>
  <ion-page>
    <ion-header :translucent="true" >
      <ion-toolbar color="palete-danger">
        <ion-buttons slot="start">
          <ion-menu-button color="palete-white"></ion-menu-button>
        </ion-buttons>
        <ion-title color="palete-white"> Boletim </ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-list v-if="lista">
            <ion-item v-for="(item, index) in lista" :key="index" @click="openBoletim(item.id, item.nome)">
                <ion-label>
                    <h2>
                      {{item.nome}}
                    </h2>
                    <p>{{item.ano_letino}}</p>
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
import  boletim from './boletim.vue'

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
      ...mapActions('boletim', ['load']),
      async openBoletim(id: any, name: string) {
            this.modal = await modalController
                .create({
                component: boletim,
                cssClass: 'my-custom-class',
                componentProps: {
                        id: id,
                        name: name,
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
        color: var(--ion-color-palete-danger-shade);
    }
</style>