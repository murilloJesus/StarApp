<template>
        <ion-header>
            <ion-toolbar color="palete-primary">
                <ion-title slot="start" color="palete-white">
                <h5>
                    Enviar Documento
                </h5>
                </ion-title>
                <ion-icon @click="closeMe" slot="end" size="large" name="close" color="palete-secundary" />
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">   
            <ion-list>
                <ion-item-divider>
                    <ion-label>
                    Dados Gerais
                    </ion-label>
                </ion-item-divider>

                <ion-item>
                    <ion-label position="floating">Nome</ion-label>
                    <ion-input @ionChange="nome= $event.target.value" :value="nome"></ion-input>
                </ion-item>

                <ion-item>
                </ion-item>

                <ion-item >
                    <ion-img id="myimage" ref="imagem" size="large" vertical="center" :src="photo.webviewPath"></ion-img>
                </ion-item>

                <ion-item>
                </ion-item>
                <ion-button v-on:click="enviar()" slot="end" expand="full" fill="outline" color="palete-primary">
                    Enviar
                </ion-button>
            </ion-list>
        </ion-content>
</template>

<script>
import { alertController, loadingController } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
    name: 'Enviar Documento',
    props: ['photo', 'based64', 'closeMe'],
    data() {
        return {
            nome: '',
            img: ''
        }
    },
    setup(){
        const imagem = ref(null);

        return {
            imagem,
        }
    },
    methods: {
        ...mapActions('documentos', ['save']),
        async enviar(){

            if(this.nome === ''){
                const alert = await alertController
                    .create({
                        message: 'Você precisa identificar o nome do documento antes de enviar!',
                        buttons: ['OK'],
                    });

                return alert.present();
            }

            const form = {
                nome : this.nome,
                imagem :  this.based64
            }

             const loading = await loadingController
                    .create({
                        spinner: 'dots',
                        message: 'Aguarde. Enviando...',
                        cssClass: 'ion-color-palete-primary',
                        showBackdrop: true,
                        
                    });

                await loading.present();

            this.save(form).then(() => {
                loading.dismiss()
                this.closeMe();
            })
        }
    }
})
</script>