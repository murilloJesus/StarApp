<template>
  <ion-card>
    <ion-card-header @click="toogle()">
      <ion-card-subtitle>{{diarios[0].dia_semana}}</ion-card-subtitle>
      <ion-icon size="large" color="palete-warning" v-if="isVisible" :icon="closeCircle"></ion-icon>
      <ion-icon size="large" color="palete-warning" v-else :icon="addCircle"></ion-icon>
    </ion-card-header>

    <ion-card-content v-if="isVisible">
        <ion-item v-for="(item, index) in diarios" :key="index" >
            <ion-label @click="$emit('openDiario', item.id)">
                <p>{{item.nome_disc}} &nbsp;&nbsp;<small>{{item.nome_turmas}}</small></p>
            </ion-label>
        </ion-item>
    </ion-card-content>
  </ion-card>
</template>

<script>
import { ref } from 'vue';
  import {
    addCircle,
    closeCircle
  } from 'ionicons/icons';

export default {
    props: ['diarios'],
    emits: ['openDiario'],
    data(){
        return{
            addCircle,
            closeCircle
        }
    },
    setup(){
        const isVisible = ref(false);

        function toogle(){
            isVisible.value = !(isVisible.value)
        }

        return {
            isVisible,
            toogle
        }
    }
}
</script>

<style scoped>
ion-icon {
    position: absolute;
    top: 5px;
    right: 5px;
}
</style>