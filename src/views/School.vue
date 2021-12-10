<template>
  <ion-page>
    <ion-content :fullscreen="true">
        <ion-item v-for="item in lista" :key="item.id">
            <ion-label for="">{{item.nome}}</ion-label>
            <ion-img :src="item.source"></ion-img>    
        </ion-item>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonImg, IonItem, IonLabel } from '@ionic/vue'
import { useRouter } from 'vue-router'
import { mapActions, useStore } from 'vuex';

export default {
    components: {
        IonPage,
        IonContent,
        IonImg,
        IonItem,
        IonLabel
    },
    async setup(){
        const router = useRouter();
        const store = useStore();

        return {
            router,
            lista: await store.dispatch('auth/getSchoolList')
        }
    },
    methods: {
        ...mapActions("school", ["set"]),
    }
}
</script>
