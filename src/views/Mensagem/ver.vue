<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="palete-primary">
        <ion-buttons slot="start">
          <ion-button @click="back()" color="palete-secundary">
            <ion-icon :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title color="palete-white"> {{messages.nome}}</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-list>
        <texto :texto="txt.texto" v-for="(txt, index) in messages.texto" :key=index />
        <div style="height: 120px"></div>
      </ion-list>
      <div class="responder">
        <ion-item>
          <ion-textarea placeholder="Responder... " v-model="texto"></ion-textarea>
        </ion-item>
        <ion-button expand="full" @click="enviarResposta" color="palete-primary">Enviar</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script >
import { IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonItem, IonTextarea, IonButton, alertController } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { mapActions } from 'vuex';
import { arrowBack } from 'ionicons/icons';
import texto from './texto'

// import { store } from '@/store';

export default {
  name: 'Ver Mensagem',
  data() {
    return {
      texto: ""
    }
  },
  setup() {
    const router = useRouter();
    const messages = []
    return {
      messages,
      router,
      arrowBack
    };
  },
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonTextarea,
    IonButton,
    texto
  },
  async created(){
    await this.ver(this.$route.params.id).then( (res) => {
        this.messages = res.data
      } )
  },
  methods: {
    ...mapActions("mensagem", ["responder"]),
    ...mapActions("mensagem", ["ver"]),
    async enviarResposta(){
      const form = {
        id: this.messages.texto[this.messages.texto.length-1].id,
        texto: this.texto,
        txtoriginal: this.messages.texto[this.messages.texto.length-1].texto
      }
      
      await this.responder(form).then(() => {
        this.router.push(`/mensagem`)
      }).catch(async (err) => {
        const errorAlert = await alertController
            .create({
              header: 'Erro',
              subHeader: 'Falha na Responder',
              message: err,
              buttons: ['OK'],
            });
        await errorAlert.present()
      })
    },
    back(){
      this.router.go(-1)
    }
  }
}
</script>

<style scoped>
.responder {
    background-color: white;
    position: fixed;
    bottom: 0px;
    left: 0px;
}
</style>