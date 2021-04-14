<template>
    <ion-list  @click="openBoletim(boletim.id)">
      <ion-card >
        <ion-card-header>
          <ion-card-title>Boletim</ion-card-title>
        <ion-card-subtitle>{{boletim.turma}}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <ion-grid fixed>
            <ion-row v-for="(item, index) in boletim.materias" :key="index">
              <ion-col size="8">{{index}}</ion-col>
              <ion-col size="4" v-html="item.media_final"></ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
    </ion-list>
</template>
<script>

import {
    IonList,
    IonGrid,
    IonRow,
    IonCol,
    modalController
} from '@ionic/vue'

import { BoletimService } from '@/services/boletim.service'
import {  ref } from 'vue'
import  boletim from './boletim.vue'


export default {
    components: {
        IonList,
        IonGrid,
        IonRow,
        IonCol       
    },
    data() {
        return {
            modal: {}
        }
    },
  props: ['id', 'closeMe'],
    setup(props){

        const boletim = ref(false)

        BoletimService.resultadoFinal(props.id).then((res) => {
             boletim.value = res.data[0]
        })

    return {
        boletim
    }
  },
  methods: {
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