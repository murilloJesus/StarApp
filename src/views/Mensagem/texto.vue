<template>
      <div :id="skl" class="message" v-html="msg.texto">
      </div>
</template>

<script>
import $ from 'jquery'
import { onMounted } from '@vue/runtime-core'

        
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export default {
    props: ['msg'],
    setup(props){

        const skl = getRandomInt(1000, 10000)

        onMounted(() => {
            $(`<div class="hour right">${props.msg.databr}&nbsp${props.msg.hora}</div>`).insertAfter(`#${skl}>.original-message`)
            $(`<div class="hour left">${props.msg.data_de}</div>`).insertAfter(`#${skl}>.message-awser:last-child`)
        })

        return {
            skl
        }
    }
}
</script>

<style>
.message {
    width: 100%; 
    padding: 0px 10px;
}

.message > .message-awser, .message > .original-message {
    width: 100%;
    border: 1px solid var(--ion-color-palete-secundary-op50);
    border-radius: 5px;
    margin-top: 10px;
    padding: 5px;
}

.original-message{
    color: var(--ion-color-palete-message);
    text-align: left;
    margin-bottom: 3px;
    
}
.message-awser{
    text-align: right;
    color:white;
    background-color: var(--ion-color-palete-message);
}

.message-awser {
    margin-bottom: 3px;
}

.hour {
    font-size: 10px;
    color: rgb(129, 129, 129);
    font-weight: bold;
}


</style>