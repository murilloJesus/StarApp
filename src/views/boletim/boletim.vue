<template>
    <ion-header>
      <ion-toolbar color="palete-danger">
        <ion-title slot="start" color="palete-white">
          <h5>
            Boletim - {{name}}
          </h5>
          </ion-title>
        <ion-icon @click="closeMe" color="palete-white" slot="end" size="large" name="close" />
      </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-list>
      <ion-card v-for="(item, index) in boletim" :key="index">
        <ion-card-header>
          <ion-card-title>{{index}}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-grid fixed>
            <ion-row>
              <ion-col ></ion-col>
              <ion-col >Notas</ion-col>
              <ion-col >Faltas</ion-col>
              <ion-col >Rec.</ion-col>
            </ion-row>
            <ion-row v-for="(nitem, nindex) in item.notas" :key="nindex">
              <ion-col >{{nindex+1}} º</ion-col>
              <ion-col v-html="nitem.notas"></ion-col>
              <ion-col v-html="nitem.faltas"></ion-col>
              <ion-col v-html="nitem.recuperacao"></ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col >Média Final</ion-col>
              <ion-col size="4" v-html="item.media_final"></ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="6">Resultado</ion-col>
              <ion-col v-html="item.resultado_final"></ion-col>
            </ion-row>
            <ion-row>
              <ion-col >Faltas Total</ion-col>
              <ion-col size="4" v-html="item.faltas_total"></ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
    </ion-list>
  </ion-content>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      boletim: false
    }
  },
  props: {
    id: { type: Number, default: 0 },
    name: {type: String, defaul: ''},
    closeMe: { type: Function, default: () => { return 0} },
  },
  created() {
    this.ver(this.id).then((res) => {
        this.boletim = res.data
        console.log(res.data);
        
    })
  },
  methods: {
    ...mapActions('boletim', ['ver'])
  },
}
</script>

<style scoped>
  .item.sc-ion-label-md-h, .item .sc-ion-label-md-h {
        color: var(--ion-color-palete-success-shade);
    }
</style>