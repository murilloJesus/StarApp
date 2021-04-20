<template>
      <div class="message" v-html="texto">
      </div>
</template>

<script>

export default {
    props: ['texto'],
}
</script>

<style>
.message {
    width: 100%; 
    padding: 0px 10px;
}

.message > div {
    width: 100%;
    border: 1px solid var(--ion-color-palete-secundary);
    border-radius: 5px;
    margin: 10px 0px;
    padding: 5px;
}

.original-message{
    color: var(--ion-color-palete-secundary);
    text-align: left;
    
}
.message-awser{
    text-align: right;
    color:black;
    background-color: var(--ion-color-palete-primary);
}
</style>