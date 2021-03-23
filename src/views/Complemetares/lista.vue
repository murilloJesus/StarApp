<template>
    <ion-list v-if=" page === 'complementares' ">
        <ion-item @click="initFichaMedica()">
            <ion-label>
                <h2>
                  Ficha Médica
                </h2>
            </ion-label>
        </ion-item>
        <ion-item  @click="initFichaComplementar()">
            <ion-label>
              <h2>
                Ficha Complementar
              </h2>
            </ion-label>
        </ion-item>
    </ion-list>
</template>

<script lang="ts">
import { add } from 'ionicons/icons'
import { modalController } from '@ionic/vue'
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import fichaMedica from './fichaMedica.vue'
import fichaComplementar from './fichaComplementar.vue';


export default defineComponent({
    name: 'Complementares',
    props: ['page'],
    data() {
        return {
            fichas: {
              medica: {},
              complmentar : {}
            }
        }
    },
    created() {
        this.load();
    },
    setup: (): any => {
        return {
            add
        }
    },
    methods: {
        ...mapActions('fichas', ['loadMedica']),
        ...mapActions('fichas', ['loadComplementar']),
        async load(){
          this.fichas.medica = await this.loadMedica();
          this.fichas.complementar = await this.loadComplementar();
        },
        async initFichaMedica() {
            this.modal = await modalController
                .create({
                component: fichaMedica,
                cssClass: 'my-custom-class',
                componentProps: {
                        ficha: this.fichas.medica,
                        closeMe: this.closeModal
                    },
                })
            return this.modal.present();
        },
        async initFichaComplementar() {
            this.modal = await modalController
                .create({
                component: fichaComplementar,
                cssClass: 'my-custom-class',
                componentProps: {
                        ficha: this.fichas.complementar,
                        closeMe: this.closeModal
                    },
                })
            return this.modal.present();
        },
        closeModal() {
            this.modal.dismiss();
            this.loadDocs();
        },
    },
})
</script>

<style>
.my-custom-class {
  --width: 50000px;
}
</style>