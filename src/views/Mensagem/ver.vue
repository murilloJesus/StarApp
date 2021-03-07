<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="back()" color="primary">
            <ion-icon :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title> Ver Mensagem </ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Mensagens</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-item>
            <ion-label>
                <p>Enviado por: {{msg.nome}}</p>
                <h4>Titulo: {{msg.titulo}}</h4>
                <small>Data:{{msg.dia_semana}}</small>
            </ion-label>
      </ion-item>
      <ion-item>
        <div v-html="msg.texto">
        </div>
      </ion-item>
      <ion-item v-if="!msg.respondido">
         <ion-label position="floating"> Responder </ion-label>
        <ion-textarea placeholder="Responder... " v-model="texto"></ion-textarea>
      </ion-item>
      <ion-button expand="full" @click="enviarResposta" v-if="!msg.respondido">Enviar</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang=ts>
import { IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonLabel, IonItem, IonTextarea, IonButton, alertController } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { mapGetters, mapActions } from 'vuex';
import { arrowBack } from 'ionicons/icons';

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
    return {
      router,
      arrowBack
    };
  },
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    // IonMenuButton,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonItem,
    IonTextarea,
    IonButton
  },
  computed: {
    ...mapGetters("mensagem", ["lista"]),
    msg() {
        return this.lista[Number (this.$route.params.id)]
    }
  },
  methods: {
    ...mapActions("mensagem", ["responder"]),
    async enviarResposta(){
      const form = {
        id: this.msg.id,
        texto: this.texto,
        txtoriginal: this.msg.texto
      }
      
      await this.responder(form).then(() => {
        this.router.push('/mensagem')
      }).catch(async (err: any) => {
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