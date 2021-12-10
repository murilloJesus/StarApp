<template>
    <ion-header>
      <ion-toolbar color="palete-success">
        <ion-title slot="start" color="palete-white">
          <h5>
            Ficha Complementar
          </h5>
          </ion-title>
        <ion-icon @click="closeMe" color="palete-white" slot="end" size="large" name="close" />
      </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-list>
        <ion-item-divider>
            <ion-label text-wrap>
                <h3>ALIMENTAÇÃO: </h3>
                <p>REFEIÇÃO/ LEITE/ SUCOS/ CHÁS/ FRUTAS/ OUTROS</p>
                <p>Tipos / medidas / horários:</p>
            </ion-label>
        </ion-item-divider>

        <ion-item>
          <ion-textarea @ionChange="dados.alimentacao= $event.target.value" :value="dados.alimentacao" placeholder="Adicionar.."></ion-textarea>
        </ion-item>

        <ion-item-divider>
            <ion-label text-wrap>
                <h3>HIGIENE: </h3>
                <p>Banho / pomadas / outros: </p>
            </ion-label>
        </ion-item-divider>

        <ion-item>
          <ion-textarea @ionChange="dados.higiene= $event.target.value" :value="dados.higiene" placeholder="Adicionar.."></ion-textarea>
        </ion-item>

        <ion-item-divider>
            <ion-label text-wrap>
                <h3>COSTUMES:  </h3>
                <p>Chupeta / paninho / outros: </p>
            </ion-label>
        </ion-item-divider>

        <ion-item>
          <ion-textarea @ionChange="dados.costumes= $event.target.value" :value="dados.costumes" placeholder="Adicionar.."></ion-textarea>
        </ion-item>

        <ion-item-divider>
            <ion-label text-wrap>
                <h3>CUIDADOS ESPECIAIS: </h3>
            </ion-label>
        </ion-item-divider>

        <ion-item>
          <ion-textarea @ionChange="dados.cuidados= $event.target.value" :value="dados.cuidados" placeholder="Adicionar.."></ion-textarea>
        </ion-item>

        <ion-item-divider>
            <ion-label text-wrap>
                <h3>TRATAMENTOS: </h3>
            </ion-label>
        </ion-item-divider>

        <ion-item>
          <ion-textarea @ionChange="dados.tratamento= $event.target.value" :value="dados.tratamento" placeholder="Adicionar.."></ion-textarea>
        </ion-item>

        <ion-item-divider>
            <ion-label text-wrap>
                <h3>RESTRIÇÕES MÉDICAS:  </h3>
            </ion-label>
        </ion-item-divider>

        <ion-item>
          <ion-textarea @ionChange="dados.restricoes= $event.target.value" :value="dados.restricoes" placeholder="Adicionar.."></ion-textarea>
        </ion-item>

        <ion-item-divider>
            <ion-label text-wrap>
                <h3>OBSERVAÇÕES  </h3>
            </ion-label>
        </ion-item-divider>

        <ion-item>
          <ion-textarea @ionChange="dados.observacoes= $event.target.value" :value="dados.observacoes" placeholder="Adicionar.."></ion-textarea>
        </ion-item>

        <ion-button @click="saveDados()" expand="full" fill="outline" color="palete-success-shade">Salvar</ion-button>

    </ion-list>
  </ion-content>
</template>

<script lang=ts>
import { toastController } from '@ionic/vue';
import { defineComponent } from "vue";
import { closeCircle } from 'ionicons/icons';
import { mapActions } from 'vuex'


export default defineComponent({
    name: 'Ficha Complementar',
    props: {
      ficha: {},
      closeMe: { type: Function, default: () => { return 0} },
    },
    data() {

      console.log(this.ficha);
      

      return {
          dados: this.ficha,
      }
    },
    setup() {
      return {
        closeCircle
      }
    },
    methods: {
      ...mapActions('fichas', ['saveComplementar']),
      async saveDados(){

        const dados = Object.assign({}, this.dados)

         const toast = await toastController
            .create({
                message: 'Salvo com sucesso!',
                duration: 2000
            })

        await this.saveComplementar(dados).then(() => {
            toast.present();
            this.closeMe();
        });

      }
  }  
})
</script>

<style scoped>
    .item.sc-ion-label-md-h, .item .sc-ion-label-md-h {
        color: var(--ion-color-palete-success-shade);
    }
</style>