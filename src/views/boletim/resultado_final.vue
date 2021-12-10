<template>
      <ion-card @click="openBoletim(boletim.id)" v-if="boletim">
        <ion-card-header>
          <ion-card-title color="palete-danger">Boletim</ion-card-title>
        <ion-card-subtitle color="palete-white">{{boletim.turma}}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content >
          <ion-grid fixed>
            <ion-row v-for="(item, index) in boletim.materias" :key="index">
              <ion-col size="8" >{{index}}</ion-col>
              <ion-col size="4" color="palete-danger" v-html="item.media_final"></ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
</template>
<script>

import {
    IonGrid,
    IonRow,
    IonCol,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCardContent,
    IonCard,
    modalController
} from '@ionic/vue'

import {  ref } from 'vue'
import  boletim from './boletim.vue'
import { mapActions } from 'vuex'
import { useStore } from 'vuex'


export default {
    components: {
        IonGrid,
        IonRow,
        IonCol,
        IonCardTitle,
        IonCardSubtitle,
        IonCardHeader,
        IonCardContent,
        IonCard       
    },
    data() {
        return {
            modal: {}
        }
    },
  props: ['closeMe'],
    setup(){

        const boletim = ref(false)

        const store = useStore()

        store.dispatch('boletim/resultadoFinal').then((res) => {
             boletim.value = res.data[0]
        })

    return {
        boletim
    }
  },
  methods: {
  ...mapActions("boletim", ["resultadoFinal"]),
      async openBoletim(id) {
            this.modal = await modalController
                .create({
                component: boletim,
                cssClass: 'my-custom-class',
                componentProps: {
                        id: id,
                        closeMe: this.closeModal
                    },
                })
            return this.modal.present();
      },
        closeModal(){
            this.modal.dismiss();
        }
  },
}
</script>
<style>

</style>