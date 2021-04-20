<template>
  <IonApp>
    <IonSplitPane content-id="main-content">
      <ion-menu content-id="main-content" swipeGesture="false" type="overlay">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>Cadastro</ion-list-header>
            <ion-note><small >{{nome}}</small></ion-note>
  
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

<script lang="ts">
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { logOut, logOutOutline, homeOutline, homeSharp, bookOutline, bookSharp, bookmarkOutline, bookmarkSharp, newspaperOutline, newspaperSharp, mailOutline, mailSharp, personOutline, personSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import { mapGetters } from 'vuex';

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
    IonSplitPane,
  },
  setup() {
    const selectedIndex = ref(0);
    const appPages = [
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
      },
      {
        title: 'Sair',
        url: '/logout',
        iosIcon: logOutOutline,
        mdIcon: logOut
      }
    ];
    
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      selectedIndex.value = appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    
    const route = useRoute();
    
    return { 
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
      isSelected: (url: string) => url === route.path ? 'selected' : ''
    }
  },
  computed: {
    ...mapGetters("home", ["nome"])
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
    --ion-color-palete-primary-contrast: rgb(0, 0, 0);
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
  --ion-color-palete-warning: #c2c172;
  --ion-color-palete-warning-rgb: 161,114,194;
  --ion-color-palete-warning-contrast: #000000;
  --ion-color-palete-warning-contrast-rgb: 0,0,0;
  --ion-color-palete-warning-shade: #aba664;
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
  --ion-color-palete-constrast: #a172c2;
  --ion-color-palete-constrast-rgb: 161,114,194;
  --ion-color-palete-constrast-contrast: #ffffff;
  --ion-color-palete-constrast-contrast-rgb: 0,0,0;
  --ion-color-palete-constrast-shade: #8e64ab;
  --ion-color-palete-constrast-tint: #aa80c8;
}

.ion-color-palete-constrast {
  --ion-color-base: var(--ion-color-palete-warning);
  --ion-color-base-rgb: var(--ion-color-palete-warning-rgb);
  --ion-color-contrast: var(--ion-color-palete-warning-contrast);
  --ion-color-contrast-rgb: var(--ion-color-palete-warning-contrast-rgb);
  --ion-color-shade: var(--ion-color-palete-warning-shade);
  --ion-color-tint: var(--ion-color-palete-warning-tint);
}
</style>