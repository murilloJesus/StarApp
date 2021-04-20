<template>
  <ion-page>
    <ion-header :translucent="true" >
      <ion-toolbar color="palete-primary">
        <ion-buttons slot="start">
          <ion-menu-button color="palete-secundary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen="true">
       <ion-slides pager="true" :options="slideOpts">
        <ion-slide>
          <acesso-rapido></acesso-rapido>
        </ion-slide>
        <ion-slide>
          <resultado-final v-if="usuario.id" :id="usuario.id" />
        </ion-slide>
      </ion-slides>
        
      <div id="container" style="top: 55%">
        
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
  } from '@ionic/vue';

  import {
    mapActions
  } from 'vuex';
  
  
  import resultadoFinal from './Boletim/resultado_final.vue'
  import AcessoRapido from './acessoRapido.vue';

  export default {
    name: 'Folder',
    components: {
      IonButtons,
      IonContent,
      IonHeader,
      IonMenuButton,
      IonPage,
      IonTitle,
      IonToolbar,
      resultadoFinal,
      AcessoRapido
    },
    data() {
      return {
        usuario: {}
      }
    },
    methods: {
      
      // ...mapActions("auth", ["signOut"]),
      ...mapActions("home", ["loadHome"]),
      async handleSignOut() {
        await this.signOut().then(() => {
          this.router.push("/login");
        });
      },
      async loadHomeData() {
        await this.loadHome().then((res: any) => {
          this.usuario = res.data;
        });
      },
      ionViewWillEnter() {
        this.loadHomeData();
      }
    }
  }
</script>

<style>
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
    color: #8c8c8c;
    margin: 0;
  }

  #container a {
    text-decoration: none;
  }

  .swiper-pagination-bullet {
    background: #536d3e;
  }

  .swiper-pagination {
      position: fixed;
  }

</style>