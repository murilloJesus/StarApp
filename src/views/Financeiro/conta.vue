<template>
  <ion-header>
    <ion-toolbar color="palete-contrast">
      <ion-title slot="start" color="palete-white">
        <h5>
          Descrição da Conta
        </h5>
      </ion-title>
      <ion-icon @click="closeMe" color="palete-white" slot="end" size="large" name="close" />
    </ion-toolbar>
  </ion-header>
  <div style="height: 100%; overflow-y: scroll">
    <ion-list>
      <ion-item-divider>
        <ion-label>
          Dados Gerais
        </ion-label>
      </ion-item-divider>

      <ion-item>
        <ion-label position="floating">Nome</ion-label>
        <p>{{item.nome}}</p>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Categoria</ion-label>
        <p>{{item.nome_categoria}}</p>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Vencimento</ion-label>
        <p>{{item.data_databr}}</p>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Tipo Pagamento</ion-label>
        <p>{{tiposPagto[item.tipo_pagamentos]}}</p>
      </ion-item>

      <ion-item-divider>
        <ion-label>
          Valor
        </ion-label>
      </ion-item-divider>

      <ion-item>
        <ion-label position="floating">Total</ion-label>
        <p>{{currency(item.preco_cheio)}}</p>
      </ion-item>

      <ion-item v-if="item.desconto">
        <ion-label position="floating">Desconto (%)</ion-label>
        <p>{{Number(item.desconto)}} %</p>
      </ion-item>

      <ion-item v-if="item.desconto_em_reais">
        <ion-label position="floating">Desconto (R$)</ion-label>
        <p>{{currency(item.desconto_em_reais)}}</p>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Final</ion-label>
        <p>{{currency(item.preco)}}</p>
      </ion-item>

      <ion-item-divider>
        <ion-label>
          Pagamento
        </ion-label>
      </ion-item-divider>

      <template v-if="item.preco_pago">

        <ion-item>
          <ion-label position="floating">Data</ion-label>
          <p>{{item.data_data_pagamento_de}}</p>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Valor</ion-label>
          <p>{{currency(item.preco_pago)}}</p>
        </ion-item>

      </template>

      <template v-else>

        <ion-item>
          <p style="color: #eb445a;">Não Pago</p>
        </ion-item>

        <ion-button @click="pagar()" expand="full" fill="outline" color="palete-contrast">Realizar Pagamento</ion-button>

      </template>
    </ion-list>
  </div>
</template>

<script lang="ts">
  import {
    IonHeader,
    IonTitle,
    IonToolbar,
  } from '@ionic/vue';
  import {
    defineComponent,
  } from 'vue'

  import {
    closeCircle
  } from 'ionicons/icons';


  export default defineComponent({
    name: 'Descrição Conta',
    props: {
      item: {
        type: Object
      },
      closeMe: {
        type: Function,
        default: () => {
          return 0
        }
      },
    },
    components: {
      IonHeader,
      IonTitle,
      IonToolbar
    },
    data() {
      return {
        tiposPagto: ['', 'Boleto', 'Cheque', 'Depósito', 'Dinheiro']
      }
    },
    setup() {
      return {
        closeCircle
      }
    },
    methods: {
      async pagar() {
          alert('pagar')
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
    }
  })
</script>

<style scoped>
  ion-button {
    margin-bottom: 10px;
  }
  p {
    padding-top: 10px;
  }
   .item.sc-ion-label-md-h, .item .sc-ion-label-md-h {
    color: var(--ion-color-palete-contrast-shade);
    }
</style>