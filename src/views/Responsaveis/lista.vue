<template>
    <ion-list v-if=" page === 'listaResponsaveis' && lista ">
        <ion-item @click="presentActionSheet(index)" v-for="(item, index) in lista" :key=index>
                <ion-label>
                    <p>{{item.nome}}</p>
                    <h4>{{parentesco[item.parentesco]}}</h4>
                    <small>{{tipo[item.tipo]}}</small>
                </ion-label>
            </ion-item>
    </ion-list>
    <skeleton-text v-if="!lista"></skeleton-text>
</template>

<script lang="ts">
import { actionSheetController, modalController } from '@ionic/vue';
import { close, eye, trash } from 'ionicons/icons';
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import skeletonText from './../common/skeletonText.vue'
import Cadastro from './cadastro.vue'

export default defineComponent({
    name: 'Lista Responsaveis',
    props: ['page'],
    components: {
        skeletonText
    },
    data() {
        return {
            lista: false,
            parentesco: ['Pai', 'Mãe', 'Tio', 'Tia', 'Avô', 'Avó', 'Irmão', 'Irmã', 'Outros'],
            tipo: ['Responsável pelo Aluno', 'Responsável Financeiro 1', 'Responsável Financeiro 2', 'Outros'],
            modal: {}
        }
    },
    created() {
        this.loadResponsaveis();
    },
    methods: {
        ...mapActions('responsaveis', ['load']),
        async loadResponsaveis() {
            await this.load().then((res: any) => {
                this.lista = res.data
            })
        },
        async presentActionSheet(index: number) {
            const actionSheet = await actionSheetController
                .create({
                header: 'Ações',
                buttons: [
                    {
                        text: 'Ver',
                        icon: eye,
                        handler: () => {
                            this.openCadastro(index);
                        },
                    },
                    {
                        text: 'Excluir',
                        icon: trash,
                        handler: () => {
                            console.log('Delete clicked')
                        },
                    },
                    {
                        text: 'Cancelar',
                        icon: close,
                        role: 'cancel',
                        handler: () => {
                            console.log('Cancel clicked')
                        },
                    },
                ],
                });
            return actionSheet.present();
        },
        async openCadastro(id: number) {
            this.modal = await modalController
                .create({
                component: Cadastro,
                cssClass: 'my-custom-class',
                componentProps: {
                    id: this.lista[id].id,
                    closeMe: this.closeModal
                    },
                })
            return this.modal.present();
        },
        closeModal() {
            this.modal.dismiss()
        },
    },
})
</script>

<style>
.my-custom-class {
  --width: 50000px;
}
</style>