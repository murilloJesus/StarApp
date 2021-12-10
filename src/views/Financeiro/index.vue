<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar color="palete-contrast">
                <ion-buttons slot="start">
                    <ion-menu-button color="palete-white"></ion-menu-button>
                </ion-buttons>
                <ion-title color="palete-white">{{ nomeTab }}</ion-title>
            </ion-toolbar>
        </ion-header>


        <ion-content :fullscreen="true">
            <resume v-if="pages.indexOf('resume') != -1" :page="page" />
            <categoria v-if="pages.indexOf('categorias') != -1" :page="page" />
            <lista v-if="pages.indexOf('lista') != -1" :page="page" />
        </ion-content>

        <ion-tabs @ionTabsWillChange="beforeTabChange" @ionTabsDidChange="afterTabChange">
            <ion-tab-bar slot="bottom" color="palete-contrast">

                <ion-tab-button @click="addPage('|resume')">
                    <ion-icon color="palete-white" :icon="clipboard"></ion-icon>
                    <ion-label color="palete-white">Resumo</ion-label>
                </ion-tab-button>

                <ion-tab-button @click="addPage('|categorias')">
                    <ion-icon color="palete-white" :icon="funnel"></ion-icon>
                    <ion-label color="palete-white">Categorias</ion-label>
                </ion-tab-button>

                <ion-tab-button @click="addPage('|lista')">
                    <ion-icon color="palete-white" :icon="list"></ion-icon>
                    <ion-label color="palete-white">Lista</ion-label>
                </ion-tab-button>

            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>
<script>
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
        clipboard,
        funnel,
        list
    } from 'ionicons/icons';
    import Resume from './resume.vue';
    import Categoria from './categoria.vue';
    import Lista from './lista.vue';
    // import { useRouter } from 'vue-router';
    // import { mapActions } from 'vuex';

    export default {
        name: 'Financeiro',
        data() {
            return {
                pages: 'resume'
            }
        },
        components: {
            //ion
            IonButtons,
            IonContent,
            IonHeader,
            IonMenuButton,
            IonPage,
            IonTitle,
            IonToolbar,
            //vue
            Resume,
            Categoria,
            Lista
        },

        setup() {
            return {
                funnel,
                list,
                clipboard
            }
        },
        methods: {
            addPage(str) {
                this.pages = this.pages + str;
            }
        },
        computed: {
            pagesArray() {
                return this.pages.split('|');
            },
            page() {
                return this.pagesArray[this.pagesArray.length - 1]
            },
            nomeTab() {
                const paginas = {
                    resume: 'Financeiro',
                    categorias: 'Categorias',
                    lista: 'Lista',
                }
                return paginas[this.page]
            }
        }
    }
</script>