<template>
    <div v-if=" page === 'resume' ">
        <ion-button class="data-picker" expand="full" color="palete-contrast" @click="changeDate()">{{mesName}}
            {{dataSel.ano}}</ion-button>
        <skeleton-text v-if="!lista" size="3"></skeleton-text>

        <ion-grid v-else>
            <ion-row>
                <ion-col size="12">
                    <ion-card>
                        <ion-card-header class="pago" @click="showPagos = !showPagos">
                            <ion-card-title color="palete-primary">
                                $
                                <b class="valor_financeiro">
                                    {{currency(valorPagos, false)}}
                                </b>
                            </ion-card-title>
                        </ion-card-header>
                        <ion-list v-show="showPagos">
                            <ion-item v-for="(item, index) in pagos" :key="index">
                                <ion-label @click="presentActionSheet(item)">
                                    <p>{{item.nome}}</p>
                                    <h4>{{currency(item.preco)}}</h4>
                                    <small>{{item.data_databr}} - Pagamento: {{item.data_data_pagamento_de}}</small>
                                </ion-label>
                            </ion-item>
                        </ion-list>
                        <ion-card-content class="debito">
                            <ion-card-title color="danger">
                                $
                                <b class="valor_financeiro">
                                    {{currency(valorNaoPagos, false)}}
                                </b>
                            </ion-card-title>
                        </ion-card-content>
                        <ion-list>
                            <ion-item v-for="(item, index) in naoPagos" :key="index">
                                <ion-label @click="presentActionSheet(item)">
                                    <p>{{item.nome}}</p>
                                    <h4>{{currency(item.preco)}}</h4>
                                    <small>{{item.data_databr}}</small>
                                </ion-label>
                            </ion-item>
                        </ion-list>
                    </ion-card>
                </ion-col>
            </ion-row>
        </ion-grid>
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
        cash
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
                mesesName: ['', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto',
                    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
                ],
                mesOpt: [{
                        text: 'Janeiro',
                        value: 1,
                    },
                    {
                        text: 'Fevereiro',
                        value: 2,
                    },
                    {
                        text: 'Março',
                        value: 3,
                    },
                    {
                        text: 'Abril',
                        value: 4,
                    },
                    {
                        text: 'Maio',
                        value: 5,
                    },
                    {
                        text: 'Junho',
                        value: 6,
                    },
                    {
                        text: 'Julho',
                        value: 7,
                    },
                    {
                        text: 'Agosto',
                        value: 8,
                    },
                    {
                        text: 'Setembro',
                        value: 9,
                    },
                    {
                        text: 'Outubro',
                        value: 10,
                    },
                    {
                        text: 'Novembro',
                        value: 11,
                    },
                    {
                        text: 'Dezembro',
                        value: 12,
                    },
                ],
                anoOpt: [],
                dataSel: {
                    ano: new Date().getFullYear(),
                    mes: new Date().getMonth() + 1
                },
                showPagos: false,
                lista: false,
                modal: {}
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
                    this.lista = res.data
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
                            name: 'mes',
                            options: this.mesOpt,
                            selectedIndex : this.dataSel.mes - 1
                        },
                        {
                            name: 'ano',
                            options: this.anoOpt,
                            selectedIndex: this.anoOpt.findIndex((el: any) => el.value == this.dataSel.ano)
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
                                this.dataSel.mes = value.mes.value
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
            }
        },
        computed: {
            mesName(): any {
                return this.mesesName[this.dataSel.mes]
            },
            naoPagos(): any {
                return this.lista.filter((el: any) => {
                    return el.preco_pago ? false : true
                })
            },
            pagos(): any {
                return this.lista.filter((el: any) => {
                    return el.preco_pago ? true : false
                })
            },
            valorPagos(): any {
                if (!this.pagos.length) return 0
                return this.pagos
                    .map((el: any) => Number(el.preco_pago))
                    .reduce((total: number, el: any) => total + el)
            },
            valorNaoPagos(): any {
                if (!this.naoPagos.length) return 0
                return this.naoPagos
                    .map((el: any) => Number(el.preco))
                    .reduce((total: number, el: any) => total + el)
            }
        }
    })
</script>

<style scoped>
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
        color: var(--ion-color-palete-green);
        
    }

    .picker-opt.picker-opt-selected{
        color: var(--ion-color-palete-secundary)
    }

    .picker-button.sc-ion-picker-md{
        color: var(--ion-color-palete-secundary)
    }
</style>