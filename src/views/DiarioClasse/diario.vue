<template>
    <ion-header>
      <ion-toolbar color="palete-warning">
        <ion-title slot="start" color="palete-white">
          <h5>
            Diario de Classe
          </h5>
          </ion-title>
        <ion-icon @click="closeMe" color="palete-white" slot="end" size="large" name="close" />
      </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-list>
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            <p>{{diario.nome_turmas}}</p>
            <small>{{diario.nome_disc}}</small><br>
            <small>{{diario.dia_semana}}</small>
          </ion-card-title>
        </ion-card-header>

        <ion-card-content v-html="diario.txt">

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
      diario: false
    }
  },
  props: ['id', 'closeMe'],
  created() {
    this.ver(this.id).then((res) => {
        this.diario = res.data
    })
  },
  methods: {
    ...mapActions('diarioClasse', ['ver'])
  },
}
</script>

<style scoped>
  .item.sc-ion-label-md-h, .item .sc-ion-label-md-h {
    color: var(--ion-color-palete-success-shade);
  }
</style>