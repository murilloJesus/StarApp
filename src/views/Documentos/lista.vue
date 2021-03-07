<template>
    <ion-list v-if=" page === 'documentos' && lista ">
        <ion-item @click="presentActionSheet(index)" v-for="(item, index) in lista" :key=index>
            <ion-label>
                <a target="_blank" :href="`http://starescola.com.br/escola/web/fotos/${item.foto}`">{{item.nome}}</a>
            </ion-label>
        </ion-item>
    </ion-list>
    <skeleton-text v-if="!lista"></skeleton-text>
    <ion-fab v-if=" page === 'documentos' && lista " vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="fotografar()">
        <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
    </ion-fab>
</template>

<script lang="ts">
import { add } from 'ionicons/icons'
import { modalController } from '@ionic/vue'
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import { usePhotoGallery, Photo } from '@/composables/usePhotoGallery';
import skeletonText from './../common/skeletonText.vue';
import enviarDocumento from './enviarDocumento.vue';


export default defineComponent({
    name: 'Documentos',
    props: ['page'],
    components: {
        skeletonText
    },
    data() {
        return {
            lista: false,
        }
    },
    created() {
        this.loadDocs();
    },
    setup: (): any => {
        const { photos, takePhoto } = usePhotoGallery();

        return {
            add,
            takePhoto,
            photos
        }
    },
    methods: {
        ...mapActions('documentos', ['load']),
        async loadDocs() {
            await this.load().then((res: any) => {
                this.lista = res.data
            })
        },
        fotografar() {
            this.takePhoto().then((based64: string) => {
                this.initEnviarDoc(this.photos, based64)
            })
        },
        async initEnviarDoc(photo: Photo, based64: string) {
            this.modal = await modalController
                .create({
                component: enviarDocumento,
                cssClass: 'my-custom-class',
                componentProps: {
                        photo: photo,
                        based64: based64,
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