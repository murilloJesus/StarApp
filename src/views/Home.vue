<template>
  <ion-page>
    <ion-header :translucent="true" >
      <ion-toolbar color="palete-primary">
        <ion-buttons slot="start">
          <ion-menu-button color="palete-white"></ion-menu-button>
        </ion-buttons>
        <ion-title color="palete-white"> Home </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen="true">
       <ion-slides pager="true">
        <ion-slide>
          <acesso-rapido></acesso-rapido>
        </ion-slide>
        <ion-slide >
            <resultado-final v-if="user.id" />
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
    IonToolbar,
    IonSlide,
    IonSlides
  } from '@ionic/vue';

  import {
    mapActions
  } from 'vuex';
  
  
  import resultadoFinal from './Boletim/resultado_final.vue'
  import AcessoRapido from './acessoRapido.vue';
  import { mapGetters } from 'vuex';

  import { Ref, ref } from '@vue/runtime-core';

  export default {
    name: 'Folder',
    setup(){

        const nots: Ref<any[]> = ref([])

        const tokenI = ref("")

        return {
          nots,
          tokenI
        }
    },
    components: {
      IonButtons,
      IonContent,
      IonHeader,
      IonMenuButton,
      IonPage,
      IonTitle,
      IonToolbar,
      IonSlide,
      IonSlides,
      resultadoFinal,
      AcessoRapido
    },
    computed: {
      ...mapGetters("home", ["user"])
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