<template>
  <IonApp>
    <IonSplitPane content-id="main-content">
      <ion-menu content-id="main-content" swipeGesture="false" type="overlay">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>
              {{user.tipo}}
            </ion-list-header>
            <ion-note style="margin-bottom: 0px;" >
              <p>
                {{user.nome}}
              </p>
            </ion-note>
            <ion-menu-toggle auto-hide="false">
              <ion-item @click="presentActionSheet()" v-if="user.tipo === 'Responsável' " lines="none" detail="false" class="hydrated">
                <ion-icon slot="start" :ios="atSharp" :md="atOutline"></ion-icon>
                <ion-label>
                    <p>{{user.selAluno.nome}}</p>
                    <small>{{user.selAluno.turma}}</small>
                </ion-label>
              </ion-item>
            </ion-menu-toggle>
            <ion-menu-toggle auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>

        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </IonSplitPane>
  </IonApp>
</template>

<script >
import { actionSheetController, IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import { computed, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  logOut, logOutOutline, 
  atOutline, atSharp,  
  homeOutline, homeSharp, 
  bookOutline, bookSharp, 
  bookmarkOutline, bookmarkSharp, 
  newspaperOutline, newspaperSharp, 
  mailOutline, mailSharp, 
  personOutline, personSharp, 
  trashOutline, trashSharp, 
  warningOutline, warningSharp,
  walletOutline, walletSharp,
  } from 'ionicons/icons';
import { mapGetters,  mapActions } from 'vuex';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  components: {
    IonApp, 
    IonContent, 
    IonIcon, 
    IonItem, 
    IonLabel, 
    IonList, 
    IonListHeader, 
    IonMenu, 
    IonMenuToggle, 
    IonNote, 
    IonRouterOutlet, 
    IonSplitPane
  },
  setup() {

    const router = useRouter()
    const store = useStore();

    const selectedIndex = computed(() => {
      const route = useRoute();

      const pages = {
        Home: 0,
        Mensagem: 1,
        verMensagem: 1,
        Cadastro: 2,
        Boletim: 3,
        Diario: 4
      }

      return pages[route.name]
    })



    const appPages = computed(() => {
      const ret =  [
          {
            title: 'Home',
            url: '/home',
            iosIcon: homeOutline,
            mdIcon: homeSharp
          },
          {
            title: 'Mensagens',
            url: '/mensagem',
            iosIcon: mailOutline,
            mdIcon: mailSharp
          },
          {
            title: 'Cadastro',
            url: '/cadastro',
            iosIcon: personOutline,
            mdIcon: personSharp
          },
          {
            title: 'Boletim',
            url: '/boletim',
            iosIcon: newspaperOutline,
            mdIcon: newspaperSharp
          },
          {
            title: 'Diario de Classe',
            url: '/diario',
            iosIcon: bookOutline,
            mdIcon: bookSharp
          }
        ];

        if(store.getters['home/user'].tipo === 'Responsável'){
          ret.push({
            title: 'Financeiro',
            url: '/financeiro',
            iosIcon: walletOutline,
            mdIcon: walletSharp
          })
        }

        ret.push({
            title: 'Sair',
            url: '/logout',
            iosIcon: logOutOutline,
            mdIcon: logOut
          })

          return ret
      
    })
    
    const path = window.location.pathname.split('folder/')[1];

    if (path !== undefined) {
      selectedIndex.value = appPages.value.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    async function presentActionSheet() {

      const buttons = this.user.lisAlunos.map((el) => {
                        return  {
                              text: el.nome,
                              handler: () => {
                                  this.setAluno(el.id).then(() => {
                                    router.push('/home')
                                  })
                              },
                          }
                      })

      const actionSheet = await actionSheetController
            .create({
              header: 'Selecione um aluno',
              buttons: buttons
            });
            return actionSheet.present();
    }

    return { 
      presentActionSheet,
      selectedIndex,
      appPages, 
      bookOutline, 
      bookSharp, 
      bookmarkOutline, 
      bookmarkSharp, 
      newspaperOutline, 
      newspaperSharp, 
      mailOutline, 
      mailSharp, 
      personOutline, 
      personSharp, 
      trashOutline, 
      trashSharp, 
      warningOutline, 
      warningSharp,
      atOutline,
      atSharp,
      walletOutline,
      walletSharp
    }
  },
  computed: {
    ...mapGetters("home", ["user"])
  },
  methods: {
    ...mapActions("home", ["setAluno"])
  }
});
</script>

<style>

.toolbar-background {
    background: var(--ion-color-palete-primary);
   
}

ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-palete-secundary-shade);
}

ion-menu.md ion-item.selected ion-icon {
    color: var(--ion-color-palete-secundary);
}

ion-menu.md ion-item.selected {
    --background: rgba(var(--ion-color-palete-secundary-rgb), 0.14);
}

.item.sc-ion-label-md-h, .item .sc-ion-label-md-h {
    color: var(--ion-color-palete-secundary);
}

.alert-button.sc-ion-alert-md {
    color: var(--ion-color-palete-secundary);
}

.alert-radio-inner.sc-ion-alert-md {
    background-color: var(--ion-color-palete-secundary);
}

[aria-checked="true"].sc-ion-alert-md .alert-radio-icon.sc-ion-alert-md {
    border-color: var(--ion-color-palete-secundary);
}
.item-has-focus.label-stacked.sc-ion-label-md-h:not(.ion-color),
.item-has-focus .label-stacked.sc-ion-label-md-h:not(.ion-color),
.item-has-focus.label-floating.sc-ion-label-md-h:not(.ion-color),
.item-has-focus .label-floating.sc-ion-label-md-h:not(.ion-color) {
 color:var(--ion-color-palete-primary)
}

.spinner-lines.sc-ion-loading-md, .spinner-lines-small.sc-ion-loading-md, .spinner-bubbles.sc-ion-loading-md, .spinner-circles.sc-ion-loading-md, .spinner-crescent.sc-ion-loading-md, .spinner-dots.sc-ion-loading-md {
    color: var(--ion-color-palete-primary);
}

.right {
  text-align: right;
}

.left{
  text-align: left;
}
  :root {
    --ion-color-palete-white: #fff;
    --ion-color-palete-white-rgb: 147,194,114;
    --ion-color-palete-white-contrast: rgb(0, 0, 0);
    --ion-color-palete-white-contrast-rgb: 0,0,0;
    --ion-color-palete-white-shade: #81ab64;
    --ion-color-palete-white-tint: #9ec880;
  }

  .ion-color-palete-white {
    --ion-color-base: var(--ion-color-palete-white);
    --ion-color-base-rgb: var(--ion-color-palete-white-rgb);
    --ion-color-contrast: var(--ion-color-palete-white-contrast);
    --ion-color-contrast-rgb: var(--ion-color-palete-white-contrast-rgb);
    --ion-color-shade: var(--ion-color-palete-white-shade);
    --ion-color-tint: var(--ion-color-palete-white-tint);
  }

  :root {
    --ion-color-palete-primary: #93c272;
    --ion-color-palete-primary-rgb: 147,194,114;
    --ion-color-palete-primary-contrast: rgb(255, 255, 255);
    --ion-color-palete-primary-contrast-rgb: 0,0,0;
    --ion-color-palete-primary-shade: #81ab64;
    --ion-color-palete-primary-tint: #9ec880;
  }

  .ion-color-palete-primary {
    --ion-color-base: var(--ion-color-palete-primary);
    --ion-color-base-rgb: var(--ion-color-palete-primary-rgb);
    --ion-color-contrast: var(--ion-color-palete-primary-contrast);
    --ion-color-contrast-rgb: var(--ion-color-palete-primary-contrast-rgb);
    --ion-color-shade: var(--ion-color-palete-primary-shade);
    --ion-color-tint: var(--ion-color-palete-primary-tint);
  }

  :root {
  --ion-color-palete-secundary: #536d3e;
  --ion-color-palete-secundary-op25: #536d3e25;
  --ion-color-palete-secundary-op50: #536d3e50;
  --ion-color-palete-secundary-op75: #536d3e75;
  --ion-color-palete-secundary-rgb: 83,109,62;
  --ion-color-palete-secundary-contrast: #ffffff;
  --ion-color-palete-secundary-contrast-rgb: 255,255,255;
  --ion-color-palete-secundary-shade: #496037;
  --ion-color-palete-secundary-tint: #647c51;
}

.ion-color-palete-secundary {
  --ion-color-base: var(--ion-color-palete-secundary);
  --ion-color-base-rgb: var(--ion-color-palete-secundary-rgb);
  --ion-color-contrast: var(--ion-color-palete-secundary-contrast);
  --ion-color-contrast-rgb: var(--ion-color-palete-secundary-contrast-rgb);
  --ion-color-shade: var(--ion-color-palete-secundary-shade);
  --ion-color-tint: var(--ion-color-palete-secundary-tint);
}

:root {
  --ion-color-palete-success: #7293c2;
  --ion-color-palete-success-rgb: 114,147,194;
  --ion-color-palete-success-contrast: #000000;
  --ion-color-palete-success-contrast-rgb: 0,0,0;
  --ion-color-palete-success-shade: #6481ab;
  --ion-color-palete-success-tint: #809ec8;
}

.ion-color-palete-success {
  --ion-color-base: var(--ion-color-palete-success);
  --ion-color-base-rgb: var(--ion-color-palete-success-rgb);
  --ion-color-contrast: var(--ion-color-palete-success-contrast);
  --ion-color-contrast-rgb: var(--ion-color-palete-success-contrast-rgb);
  --ion-color-shade: var(--ion-color-palete-success-shade);
  --ion-color-tint: var(--ion-color-palete-success-tint);
}

:root {
  --ion-color-palete-danger: #c27293;
  --ion-color-palete-danger-rgb: 194,114,147;
  --ion-color-palete-danger-contrast: #000000;
  --ion-color-palete-danger-contrast-rgb: 0,0,0;
  --ion-color-palete-danger-shade: #ab6481;
  --ion-color-palete-danger-tint: #c8809e;
}

.ion-color-palete-danger {
  --ion-color-base: var(--ion-color-palete-danger);
  --ion-color-base-rgb: var(--ion-color-palete-danger-rgb);
  --ion-color-contrast: var(--ion-color-palete-danger-contrast);
  --ion-color-contrast-rgb: var(--ion-color-palete-danger-contrast-rgb);
  --ion-color-shade: var(--ion-color-palete-danger-shade);
  --ion-color-tint: var(--ion-color-palete-danger-tint);
}

:root {
  --ion-color-palete-warning: #cec939;
  --ion-color-palete-warning-rgb: 161,114,194;
  --ion-color-palete-warning-contrast: #000000;
  --ion-color-palete-warning-contrast-rgb: 0,0,0;
  --ion-color-palete-warning-shade: #756e11;
  --ion-color-palete-warning-tint: #c8c380;
}

.ion-color-palete-warning {
  --ion-color-base: var(--ion-color-palete-warning);
  --ion-color-base-rgb: var(--ion-color-palete-warning-rgb);
  --ion-color-contrast: var(--ion-color-palete-warning-contrast);
  --ion-color-contrast-rgb: var(--ion-color-palete-warning-contrast-rgb);
  --ion-color-shade: var(--ion-color-palete-warning-shade);
  --ion-color-tint: var(--ion-color-palete-warning-tint);
}


:root {
  --ion-color-palete-contrast: #599872;
  --ion-color-palete-contrast-rgb: 161,114,194;
  --ion-color-palete-contrast-contrast: #ffffff;
  --ion-color-palete-contrast-contrast-rgb: 0,0,0;
  --ion-color-palete-contrast-shade: #487d63;
  --ion-color-palete-contrast-tint: #5d937c;
}

.ion-color-palete-contrast {
  --ion-color-base: var(--ion-color-palete-contrast);
  --ion-color-base-rgb: var(--ion-color-palete-contrast-rgb);
  --ion-color-contrast: var(--ion-color-palete-contrast-contrast);
  --ion-color-contrast-rgb: var(--ion-color-palete-contrast-contrast-rgb);
  --ion-color-shade: var(--ion-color-palete-contrast-shade);
  --ion-color-tint: var(--ion-color-palete-contrast-tint);
}

:root {
  --ion-color-palete-message: #c27272;
  --ion-color-palete-message-rgb: 161,114,194;
  --ion-color-palete-message-contrast: #ffffff;
  --ion-color-palete-message-contrast-rgb: 0,0,0;
  --ion-color-palete-message-shade: #ab6464;
  --ion-color-palete-message-tint: #c88080;
}

.ion-color-palete-message {
  --ion-color-base: var(--ion-color-palete-message);
  --ion-color-base-rgb: var(--ion-color-palete-message-rgb);
  --ion-color-message: var(--ion-color-palete-message-contrast);
  --ion-color-message-rgb: var(--ion-color-palete-message-contrast-rgb);
  --ion-color-shade: var(--ion-color-palete-message-shade);
  --ion-color-tint: var(--ion-color-palete-message-tint);
}

  :root {
    --ion-color-palete-green: #5fc416;
    --ion-color-palete-green-rgb: 147,194,114;
    --ion-color-palete-green-contrast: rgb(255, 255, 255);
    --ion-color-palete-green-contrast-rgb: 0,0,0;
    --ion-color-palete-green-shade: #56ab19;
    --ion-color-palete-green-tint: #67cb1f;
  }

  .ion-color-palete-green {
    --ion-color-base: var(--ion-color-palete-green);
    --ion-color-base-rgb: var(--ion-color-palete-green-rgb);
    --ion-color-contrast: var(--ion-color-palete-green-contrast);
    --ion-color-contrast-rgb: var(--ion-color-palete-green-contrast-rgb);
    --ion-color-shade: var(--ion-color-palete-green-shade);
    --ion-color-tint: var(--ion-color-palete-green-tint);
  }
</style>