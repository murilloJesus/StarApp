<template>
    <ion-grid fixed>
        <ion-row>
          <ion-col size="6">
              <ion-card color="palete-message"  @click="router.push('/mensagem')">
              <ion-card-content text-center>
                  <ion-icon color="palete-white" size="large" :icon="mailSharp"></ion-icon>
                  <h3 >Mensagem</h3>
              </ion-card-content>
              </ion-card>
          </ion-col>
          <ion-col size="6">
              <ion-card color="palete-success"  @click="router.push('/cadastro')">
              <ion-card-content text-center>
                  <ion-icon color="palete-white" size="large" :icon="personSharp"></ion-icon>
                  <h3 >Cadastro</h3>
              </ion-card-content>
              </ion-card>
          </ion-col>
          <ion-col size="6">
              <ion-card color="palete-warning"  @click="router.push('/diario')">
              <ion-card-content text-center>
                  <ion-icon color="palete-white" size="large" :icon="bookSharp"></ion-icon>
                  <h3 >Diario de Classe</h3>
              </ion-card-content>
              </ion-card>
          </ion-col>
          <ion-col size="6">
              <ion-card color="palete-danger"  @click="router.push('/boletim')">
              <ion-card-content text-center>
                  <ion-icon color="palete-white" size="large" :icon="newspaperSharp"></ion-icon>
                  <h3 >Boletim</h3>
              </ion-card-content>
              </ion-card>
          </ion-col>
          <ion-col size="6" v-if="user.tipo === 'Responsável'">
              <ion-card color="palete-contrast"  @click="router.push('/financeiro')">
                <ion-card-content text-center>
                    <ion-icon color="palete-white" size="large" :icon="walletSharp"></ion-icon>
                    <h3 >Financeiro</h3>
                </ion-card-content>
              </ion-card>
          </ion-col>
      </ion-row>
</ion-grid>
</template>

<script>

  import {
    bookSharp,
    newspaperSharp,
    mailSharp,
    personSharp,
    walletSharp
  } from 'ionicons/icons';

  import {
    useRouter
  } from 'vue-router';

  import { 
    IonIcon,
    IonCard,
    IonCardContent,
    IonCol,
    IonRow,
    IonGrid,

  } from '@ionic/vue';
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';


export default {
    components: {
      IonIcon,
      IonCard,
      IonCardContent,
      IonCol,
      IonRow,
      IonGrid,
    
    },
    data() {
      return {
        bookSharp,
        newspaperSharp,
        mailSharp,
        personSharp,
        walletSharp
      }
    },
    setup() {
      const router = useRouter();
      const store = useStore();

      const user = computed(() => {
        return store.getters['home/user']
      })

      return {
        router,
        user
      };
    },
}
</script>

<style scoped>
  ion-card{
    border: 1px solid var(--ion-color-palete-secundary);
    height: 100px; 
    width: 90%;
    margin: auto;
  }

  ion-grid {
    height: 480px;
  }

  ion-row {
    margin: 10px 0px;
  }

  h3 {
    color: var(--ion-color-palete-white);
  }
</style>