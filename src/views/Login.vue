<template>
  <ion-page>
    <ion-content :fullscreen="true">
        <div class="background" style="background-image: url('assets/img/background001.jpg');">
        <form @submit.prevent="handleLogin" style="height: 90%; display: flex; align-items: center; justify-content: center;">
            <ion-card>
                <ion-card-content>
                    <ion-item>
                        <ion-label position="floating">ID Escolar</ion-label>
                        <ion-input v-model="form.id" id=id></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">Login</ion-label>
                        <ion-input v-model="form.login" id=login></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">Senha</ion-label>
                        <ion-input type=password v-model="form.senha" id=senha></ion-input>
                    </ion-item>
                    <div style="padding-top: 20px">
                        <ion-button expand=full type="submit" color="palete-secundary" shape="round">
                            Entrar
                            <ion-icon :icon="logIn"></ion-icon>
                        </ion-button>
                    </div>
                </ion-card-content>
            </ion-card>
        </form>
        </div>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="css">
.background {
    height: 100%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-size: auto;
    background-origin: padding-box;
    background-clip: border-box;
}
</style>

<script>
import { IonPage,  
         IonContent,
         IonCard, IonCardContent,
         IonItem, IonLabel, IonInput, IonIcon, alertController } from '@ionic/vue';

import { logIn } from 'ionicons/icons';

import { mapActions, mapGetters } from "vuex"
import { useRouter } from 'vue-router';

export default  {
  name: 'Login',
  components: { IonPage, IonContent,
         IonCard, IonCardContent,
         IonItem, IonLabel, IonInput, IonIcon },
  setup() {
    const router = useRouter();

    return {
      router,
      logIn
    };
  },
  data() {
    return {
      form: {
        id: "",
        login: "",
        senha: ""
      }
    };
  },
  computed: {
    ...mapGetters("auth", [
      "authenticating",
      "authenticationError",
      "authenticationErrorCode"
    ])
  },
  methods: {
    ...mapActions("auth", ["signIn"]),
    async handleLogin() {
      await this.signIn(this.form).then(() => {
        this.form.id = ""
        this.form.login = ""
        this.form.senha = ""
        this.router.push("/home")
      }).catch(async (err) => {
        const errorAlert = await alertController
            .create({
              header: 'Erro',
              subHeader: 'Falha na Autenticação',
              message: err,
              buttons: ['OK'],
            });
        await errorAlert.present()
      })
    }
  }   
}
</script>