<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="palete-message">
        <ion-buttons slot="start">
          <ion-button @click="back()" color="palete-white">
            <ion-icon :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title color="palete-white"> {{messages.nome}}</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content ref="content" :fullscreen="true">
      <ion-list>
        <texto :msg="msg" v-for="(msg, index) in messages.texto" :key=index />
        <div style="height: 120px"></div>
      </ion-list>
      <skeleton-text v-if="!messages"></skeleton-text>
    </ion-content>
    <div class="responder">
      <ion-item>
        <ion-textarea placeholder="Responder... " v-model="texto"></ion-textarea>
      </ion-item>
      <ion-button expand="full" @click="enviarResposta" color="palete-message">Enviar</ion-button>
    </div>
  </ion-page>
</template>

<script >
import { IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonItem, IonTextarea, IonButton, IonList, alertController } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { mapActions } from 'vuex';
import { arrowBack } from 'ionicons/icons';
import texto from './texto'
import skeletonText from './../common/skeletonText.vue';
import { ref } from 'vue';

export default {
  name: 'Ver Mensagem',
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
    IonList,
    texto,
    skeletonText
  },
  data() {
    return {
      texto: ""
    }
  },
  setup() {
    const router = useRouter();
    const messages = ref(false)
    const content = ref(null)

    return {
      messages,
      router,
      arrowBack,
      content,
    };
  },
  async created(){
    await this.getMessages()
    this.content.$el.scrollToBottom(300)

  },
  methods: {
    ...mapActions("mensagem", ["responder"]),
    ...mapActions("mensagem", ["ver"]),
    async getMessages(){
      await this.ver(this.$route.params.id).then( (res) => {
          this.messages = res.data
        } );

        // setTimeout(this.getMessages, 18000)
    },
    async enviarResposta(){
      const form = {
        id: this.messages.texto[this.messages.texto.length-1].id,
        texto: this.texto,
        txtoriginal: this.messages.texto[this.messages.texto.length-1].texto
      }
      
      await this.responder(form).then(() => {
        this.getMessages();
        this.texto = ""
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