<template>
    <ion-grid fixed>
        <ion-row>
        <ion-col size="6">
            <ion-card color="palete-primary"  @click="router.push('/mensagem')">
            <ion-card-content text-center>
                <ion-icon color="palete-secundary" size="large" :icon="mailSharp"></ion-icon>
                <h3 >Mensagem</h3>
            </ion-card-content>
            </ion-card>
        </ion-col>
        <ion-col size="6">
            <ion-card color="palete-primary"  @click="router.push('/cadastro')">
            <ion-card-content text-center>
                <ion-icon color="palete-secundary" size="large" :icon="personSharp"></ion-icon>
                <h3 >Cadastro</h3>
            </ion-card-content>
            </ion-card>
        </ion-col>
        </ion-row>
        <ion-row>
        <ion-col size="6">
            <ion-card color="palete-primary"  @click="router.push('/boletim')">
            <ion-card-content text-center>
                <ion-icon color="palete-secundary" size="large" :icon="newspaperSharp"></ion-icon>
                <h3 >Boletim</h3>
            </ion-card-content>
            </ion-card>
        </ion-col>
        <ion-col size="6">
            <ion-card color="palete-primary"  @click="router.push('/diario')">
            <ion-card-content text-center>
                <ion-icon color="palete-secundary" size="large" :icon="bookSharp"></ion-icon>
                <h3 >Diario de Classe</h3>
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
    personSharp
  } from 'ionicons/icons';

  import {
    useRouter
  } from 'vue-router';


export default {
    data() {
      return {
        bookSharp,
        newspaperSharp,
        mailSharp,
        personSharp,
      }
    },
    setup() {
      const router = useRouter();
      return {
        router,
      };
    },
}
</script>

<style scoped>
  ion-card{
    border: 1px solid var(--ion-color-palete-secundary);
    height: 120px; 
    width: 120px;
    margin: auto;
  }

  ion-grid {
    height: 480px;
  }

  h3 {
    color: var(--ion-color-palete-white);
  }
</style>