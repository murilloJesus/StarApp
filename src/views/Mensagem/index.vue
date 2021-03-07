<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title> Mensagens </ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Mensagens</ion-title>
        </ion-toolbar>
      </ion-header>
        <ion-list v-if="lista">
            <ion-item @click="presentActionSheet(index)" v-for="(item, index) in lista" :key=index>
                <ion-label>
                    <p>{{item.nome}}</p>
                    <h4>{{item.titulo}}</h4>
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
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, actionSheetController  } from '@ionic/vue';
import { close, eye } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { mapActions } from 'vuex';
import  skeletonText  from './../common/skeletonText.vue'

export default {
  name: 'Mensagens',
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
  data() {
    return {
      lista: false
    }
  },
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
  methods: {
    ...mapActions("mensagem", ["load"]),
    async loadMensagem() {
      await this.load().then((res: any) => {
        this.lista = res.data;
      });
    },
    ionViewWillEnter() {
      this.loadMensagem();
    },
    async presentActionSheet(index: number) {
      const actionSheet = await actionSheetController
        .create({
          header: 'Ações',
          buttons: [
            {
              text: 'Ver',
              icon: eye,
              handler: () => {
                this.router.push(`/mensagem/ver/${index}`);
              },
            },
            {
              text: 'Cancelar',
              icon: close,
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked')
              },
            },
          ],
        });
      return actionSheet.present();
    }
  }
}
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #4e4e4e;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>