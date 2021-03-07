<template>
    <ion-item>
        <ion-label>Estado ID: {{dados.estado}}</ion-label>
        <ion-select placeholder="Selecione" @ionChange="dados.cidade= $event.target.value"   :value="dados.estado">
            <ion-select-option value="12">Feminino</ion-select-option>
            <ion-select-option value="25">Masculino</ion-select-option>
        </ion-select>
    </ion-item>
</template>

<script lang=ts>

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Local Estados',
    computed: {
        dados(): any {
            return localStorage.dados ? localStorage.dados : false
        }
    }
})
</script>