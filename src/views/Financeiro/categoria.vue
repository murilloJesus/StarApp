<template>
    <div v-if=" page === 'categorias' ">
        <ion-button class="data-picker" expand="full" color="palete-contrast" @click="changeDate()">
            {{dataSel.ano}}</ion-button>
        <skeleton-text v-if="!lista" size="3"></skeleton-text>

        <ion-card v-for="(cat, index) in lista" :key="index">
            <ion-card-header @click="cat.isVisible = !cat.isVisible">
                <ion-card-subtitle>{{cat.nome}}</ion-card-subtitle>
                <ion-icon size="large" class="toogle" color="palete-contrast" v-if="cat.isVisible" :icon="closeCircle"></ion-icon>
                <ion-icon size="large" class="toogle" color="palete-contrast" v-else :icon="addCircle"></ion-icon>
            </ion-card-header>

            <ion-card-content v-if="cat.isVisible">
                <ion-item v-for="(item, index) in cat.data" :key="index">
                    <ion-label @click="presentActionSheet(item)">
                        <p>{{item.nome}}</p>
                        <h4 :class="item.preco_pago ? 'conta-paga' : 'conta-nao-paga'">
                            {{currency(item.preco)}} 
                        </h4>
                        <small :class="item.preco_pago ? 'conta-paga' : 'conta-nao-paga-black'">{{item.data_databr}} 
                            <template v-if="item.preco_pago">
                                - Pagamento: {{item.data_data_pagamento_de}}
                            </template> 
                        </small>
                        <ion-icon v-if="item.preco_pago" size="small" class="toogle" color="palete-primary" :icon="checkmark"></ion-icon> 
                    </ion-label>
                </ion-item>
            </ion-card-content>
        </ion-card>
    </div>
</template>

<script lang="ts">
    import {
        actionSheetController,
        modalController,
        pickerController
    } from '@ionic/vue';

    import {
        close,
        eye,
        cash,
        closeCircle,
        addCircle,
        checkmark,
    } from 'ionicons/icons';

    import {
        defineComponent
    } from 'vue';

    import {
        mapActions
    } from 'vuex';

    import skeletonText from './../common/skeletonText.vue'

    import Conta from './conta.vue'

    export default defineComponent({
        name: 'Resumo',
        props: ['page'],
        components: {
            skeletonText
        },
        data() {
            return {
                anoOpt: [],
                dataSel: {
                    ano: new Date().getFullYear(),
                },
                lista: false,
                modal: {},
                closeCircle,
                addCircle,
                checkmark
            }
        },
        created() {
            this.loadContas()
            this.loadAnos()
        },
        methods: {
            ...mapActions('contas', ['load']),
            ...mapActions('contas', ['anos']),
            async loadContas() {
                await this.load(this.dataSel).then((res: any) => {
                    this.setCategorias(res.data)
                })
            },
            async loadAnos() {
                await this.anos().then((res: any) => {
                    this.anoOpt = res.data
                })
            },
            async presentActionSheet(item: any) {
                const actionSheet = await actionSheetController
                    .create({
                        header: 'Ações',
                        buttons: [{
                                text: 'Ver',
                                icon: eye,
                                handler: () => {
                                    this.openConta(item);
                                },
                            },
                            {
                                text: 'Pagar',
                                icon: cash,
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
            async openConta(item: any) {
                this.modal = await modalController
                    .create({
                        component: Conta,
                        cssClass: 'my-custom-class',
                        componentProps: {
                            item: item,
                            closeMe: this.closeModal
                        },
                    })
                return this.modal.present();
            },
            async changeDate() {

                const picker = await pickerController.create({
                    columns: [{
                            name: 'ano',
                            options: this.anoOpt,
                            selectedIndex: this.anoOpt.findIndex((el: any) => el.value == this
                                .dataSel.ano)
                        }

                    ],
                    buttons: [{
                            text: "Cancelar",
                            role: "cancel",
                        },
                        {
                            text: "Confirmar",
                            role: "confirm",
                            handler: (value) => {
                                this.dataSel.ano = value.ano.value
                                this.loadContas()
                            },
                        },
                    ],
                    cssClass: 'my-custom-picker'
                })

                await picker.present();
            },
            closeModal() {
                this.modal.dismiss()
            },
            currency(valor: any, cypher = true) {
                if (!cypher) return (valor / 100).toLocaleString('pt-br', {
                    minimumFractionDigits: 2
                });
                return (valor / 100).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL'
                });
            },
            setCategorias(data: Array<any>){

                const  cats: any = []

                data.forEach(el => {
                    const index = cats.findIndex((ele: any) => ele.id === el.categorias)
                    if(index != -1){
                        cats[index].data.push(el)
                    }else{
                        cats.push({
                            id: el.categorias,
                            nome: el.nome_categoria,
                            isVisible: false,
                            data: [el]
                        })
                    }
                })
                this.lista = cats
            }
        }
    })
</script>

<style>
    .my-custom-class {
        --width: 50000px;
    }

    .valor_financeiro {
        float: right;
        color: #aaa
    }

    .data-picker {
        margin-top: 5px;
    }

    .pago {
        background-color: #eee;
    }

    .debito {
        padding-top: 20px !important;
        border-top: 1px solid #ccc;
    }

    .my-custom-picker {
        color: var(--ion-color-palete-secundary);

    }

    .picker-opt.picker-opt-selected {
        color: var(--ion-color-palete-secundary)
    }

    .picker-button.sc-ion-picker-md {
        color: var(--ion-color-palete-secundary)
    }

    .toogle {
        position: absolute;
        top: 5px;
        right: 5px;
    }
    .conta-paga {
        color: var(--ion-color-palete-secundary)
    }
    .conta-nao-paga {
        color: var(--ion-color-danger)
    }
    .conta-nao-paga-black {
        color: black
    }
</style>