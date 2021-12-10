<template>
  <ion-header>
      <ion-toolbar color="palete-success">
        <ion-title slot="start" color="palete-white">
          <h5>
            Ficha Medica
          </h5>
          </ion-title>
        <ion-icon @click="closeMe" slot="end" size="large" name="close" color="palete-white" />
      </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-list color="palete-secundary">
        <!-- FOTO AQUI -->

        <ion-item-divider>
            <ion-label>
            Convênio Medico
            </ion-label>
        </ion-item-divider>

        <ion-item>
            <ion-label>Convenio Médico</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_convenio_medico= !(Number(dados.bool_convenio_medico))" :checked="dados.bool_convenio_medico == 1"></ion-toggle>

            <!-- <ion-select placeholder="Selecione" @ionChange="dados.bool_convenio_medico= $event.target.value" :value="dados.bool_convenio_medico"> 
                <ion-select-option value="0">Não</ion-select-option>
                <ion-select-option value="1">Sim</ion-select-option>
            </ion-select> -->
        </ion-item>
        <div v-if="Number(dados.bool_convenio_medico)">
            <ion-item>
                <ion-label position="floating">Qual</ion-label>
                <ion-input @ionChange="dados.nome_convenio_medico= $event.target.value" :value="dados.nome_convenio_medico"></ion-input>
            </ion-item>

            <ion-item>
                <ion-label position="floating">Endereço</ion-label>
                <ion-input @ionChange="dados.endereco_convenio_medico= $event.target.value" :value="dados.endereco_convenio_medico"></ion-input>
            </ion-item>

            <ion-item>
                <ion-label position="floating">Telefone</ion-label>
                <ion-input @ionChange="dados.telefone_convenio_medico= $event.target.value" :value="dados.telefone_convenio_medico"></ion-input>
            </ion-item>

            <ion-item>
                <ion-label position="floating">Nº Identificação</ion-label>
                <ion-input @ionChange="dados.identificacao_convenio_medico= $event.target.value" :value="dados.identificacao_convenio_medico"></ion-input>
            </ion-item>
        </div>

        <ion-item-divider>
            <ion-label>
            Aluno
            </ion-label>
        </ion-item-divider>

        <ion-item>
            <ion-label position="floating">Reside Com</ion-label>
            <ion-select placeholder="Selecione"  @ionChange="dados.reside_com= $event.target.value" :value="dados.reside_com"> 
                <ion-select-option value="0">Pais</ion-select-option>
                <ion-select-option value="1">Só Pai</ion-select-option>
                <ion-select-option value="2">Só Mãe</ion-select-option>
                <ion-select-option value="3">Outros</ion-select-option>
            </ion-select>
        </ion-item>

        <ion-item>
            <ion-label position="floating">Calendario de Vacinas</ion-label>
            <ion-select placeholder="Selecione" @ionChange="dados.situacao_calebdario_vacinas= $event.target.value" :value="dados.situacao_calebdario_vacinas"> 
                <ion-select-option value="0">Atualizado</ion-select-option>
                <ion-select-option value="1">Atrasado</ion-select-option>
                <ion-select-option value="2">Sem Informações</ion-select-option>
            </ion-select>
        </ion-item>

        <ion-item>
            <ion-label position="floating">Faz Tratamento Especial?</ion-label>
            <ion-select placeholder="Selecione" @ionChange="dados.faz_tratamento_especializado= $event.target.value" :value="dados.faz_tratamento_especializado"> 
                <ion-select-option value="0">Psicologia</ion-select-option>
                <ion-select-option value="1">Fonoaudiologia</ion-select-option>
                <ion-select-option value="2">Psicopedagogia</ion-select-option>
                <ion-select-option value="3">Ocupacional</ion-select-option>
            </ion-select>
        <!-- </ion-item>

        <ion-item> -->
            <ion-label position="floating">Algum outro tratamento?</ion-label>
            <ion-input @ionChange="dados.nome_tratamento_especializado= $event.target.value" :value="dados.nome_tratamento_especializado"></ion-input>
        </ion-item>

        <ion-item>
            <ion-label position="floating">Tipo de Médico</ion-label>
            <ion-select placeholder="Selecione" @ionChange="dados.tipo_medico_convenio_medico= $event.target.value" :value="dados.tipo_medico_convenio_medico"> 
                <ion-select-option value="0">Alopata</ion-select-option>
                <ion-select-option value="1">Homeopata</ion-select-option>
            </ion-select>
        <!-- </ion-item>

        <ion-item> -->
            <ion-label position="floating">Nome Médico</ion-label>
            <ion-input @ionChange="dados.nome_medico_convenio_medico= $event.target.value" :value="dados.nome_medico_convenio_medico"></ion-input>
        </ion-item>

        <ion-item>
            <ion-label >Alergias a Alimentos</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_alergias_alimentares= !(Number(dados.bool_alergias_alimentares))" :checked="dados.bool_alergias_alimentares == 1"></ion-toggle>

            <!-- <ion-select placeholder="Selecione" @ionChange="dados.bool_alergias_medicamentos= $event.target.value" :value="dados.bool_alergias_medicamentos"> 
                <ion-select-option value="0">Não</ion-select-option>
                <ion-select-option value="1">Sim</ion-select-option>
            </ion-select> -->
        <!-- </ion-item>

        <ion-item> -->
            <div v-if="Number(dados.bool_alergias_alimentares)">
                <ion-label position="floating">Quais?</ion-label>
                <ion-input @ionChange="dados.nome_alergias_alimentares= $event.target.value" :value="dados.nome_alergias_alimentares"></ion-input>
            </div>
        </ion-item>

        <ion-item>
            <ion-label >Alergias a Medicamentos</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_alergias_medicamentos= !(Number(dados.bool_alergias_medicamentos))" :checked="dados.bool_alergias_medicamentos == 1"></ion-toggle>

            <!-- <ion-select placeholder="Selecione" @ionChange="dados.bool_alergias_medicamentos= $event.target.value" :value="dados.bool_alergias_medicamentos"> 
                <ion-select-option value="0">Não</ion-select-option>
                <ion-select-option value="1">Sim</ion-select-option>
            </ion-select> -->
        <!-- </ion-item>

        <ion-item> -->
            <div v-if="Number(dados.bool_alergias_medicamentos)">
                <ion-label position="floating">Quais?</ion-label>
                <ion-input @ionChange="dados.nome_alergias_medicamentos= $event.target.value" :value="dados.nome_alergias_medicamentos"></ion-input>
            </div>
        </ion-item>


        <ion-item-divider>
            <ion-label text-wrap>
                Liste os nomes e telefones para contactarmos na ausência dos pais.
            </ion-label>
        </ion-item-divider>

        <ion-item>
          <ion-textarea @ionChange="dados.procedimento_emergencia= $event.target.value" :value="dados.procedimento_emergencia" placeholder="Adicionar.."></ion-textarea>
        </ion-item>

        <ion-item-divider>
            <ion-label text-wrap>
                Procedimento em caso de emergencia, mover o aluno para qual hospital?
            </ion-label>
        </ion-item-divider>

        <ion-item>
          <ion-textarea @ionChange="dados.hospital_movido= $event.target.value" :value="dados.hospital_movido" placeholder="Adicionar.."></ion-textarea>
        </ion-item>

        <ion-item>
            <ion-label text-wrap position="floating">Ministrar Medicamento?</ion-label>
            <ion-select placeholder="Selecione" @ionChange="dados.bool_ministrar_medicamento= $event.target.value" :value="dados.bool_ministrar_medicamento"> 
                <ion-select-option value="0">Não Ministrar</ion-select-option>
                <ion-select-option value="1">Avisar Antes</ion-select-option>
                <ion-select-option value="2">Avisar Depois</ion-select-option>
            </ion-select>
        </ion-item>

        <ion-item>
            <ion-label text-wrap> Em Atual Tratamento?</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_tratamentos= !(Number(dados.bool_tratamentos))" :checked="dados.bool_tratamentos == 1"></ion-toggle>

            <!-- <ion-select placeholder="Selecione" @ionChange="dados.bool_tratamentos= $event.target.value" :value="dados.bool_tratamentos"> 
                <ion-select-option value="0">Não</ion-select-option>
                <ion-select-option value="1">Sim</ion-select-option>
            </ion-select> -->
        <!-- </ion-item>

        <ion-item> -->
            <div v-if="Number(dados.bool_tratamento)">
                <ion-label position="floating">Quail?</ion-label>
                <ion-input @ionChange="dados.nome_tratamentos= $event.target.value" :value="dados.nome_tratamentos"></ion-input>
            </div>
        </ion-item>

        <ion-item>
            <ion-label text-wrap>Ingere Medicamento?</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_medicamentos= !(Number(dados.bool_medicamentos))" :checked="dados.bool_medicamentos == 1"></ion-toggle>

            <!-- <ion-select placeholder="Selecione" @ionChange="dados.bool_medicamentos= $event.target.value" :value="dados.bool_medicamentos"> 
                <ion-select-option value="0">Não</ion-select-option>
                <ion-select-option value="1">Sim</ion-select-option>
            </ion-select> -->
        <!-- </ion-item>

        <ion-item> -->
            <div v-if="Number(dados.bool_medicamentos)">
                <ion-label position="floating">Quais?</ion-label>
                <ion-input @ionChange="dados.nome_Medicamentos= $event.target.value" :value="dados.nome_Medicamentos"></ion-input>
            </div>
        </ion-item>

        <ion-item>
            <ion-label text-wrap> Possui doença Congênita?</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_doenca_congenita= !(Number(dados.bool_doenca_congenita))" :checked="dados.bool_doenca_congenita == 1"></ion-toggle>

            <!-- <ion-select placeholder="Selecione" @ionChange="dados.bool_doenca_congenita= $event.target.value" :value="dados.bool_doenca_congenita"> 
                <ion-select-option value="0">Não</ion-select-option>
                <ion-select-option value="1">Sim</ion-select-option>
            </ion-select> -->
        <!-- </ion-item>

        <ion-item> -->
            <div v-if="Number(dados.bool_doenca_congenita)">
                <ion-label position="floating">Quais?</ion-label>
                <ion-input @ionChange="dados.nome_doenca_congenita= $event.target.value" :value="dados.nome_doenca_congenita"></ion-input>
            </div>
        </ion-item>

        <ion-item>
            <ion-label text-wrap>Já submeteu a alguma cirurgia?</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_cirurgia= !(Number(dados.bool_cirurgia))" :checked="dados.bool_cirurgia == 1"></ion-toggle>

            <!-- <ion-select placeholder="Selecione" @ionChange="dados.bool_cirurgia= $event.target.value" :value="dados.bool_cirurgia"> 
                <ion-select-option value="0">Não</ion-select-option>
                <ion-select-option value="1">Sim</ion-select-option>
            </ion-select> -->
        <!-- </ion-item>

        <ion-item> -->
            <div v-if="Number(dados.bool_cirurgia)">
                <ion-label position="floating">Quais?</ion-label>
                <ion-input @ionChange="dados.nome_cirurgia_realizada= $event.target.value" :value="dados.nome_cirurgia_realizada"></ion-input>
            </div>
        </ion-item>

        <ion-item>
            <ion-label text-wrap>Tem desmaio ou convulsão?</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_desmaio_ou_convulsao= !(Number(dados.bool_desmaio_ou_convulsao))" :checked="dados.bool_desmaio_ou_convulsao == 1"></ion-toggle>
        </ion-item>

        <div v-if="Number(dados.bool_desmaio_ou_convulsao)">
            <ion-item-divider>
                <ion-label text-wrap>
                    Está em tratamento ou outras informações
                </ion-label>
            </ion-item-divider>

            <ion-item>
                <ion-textarea @ionChange="dados.desmaio_convulsao_acao= $event.target.value" :value="dados.desmaio_convulsao_acao" placeholder="Adicionar.."></ion-textarea>
            </ion-item>
        </div>

        <ion-item>
            <ion-label>Possui Hipertensão?</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_hipertensao= !(Number(dados.bool_hipertensao))" :checked="dados.bool_hipertensao == 1"></ion-toggle>
        </ion-item>

        <ion-item>
            <ion-label>Possui Refluxo?</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_refluxo= !(Number(dados.bool_refluxo))" :checked="dados.bool_refluxo == 1"></ion-toggle>
        </ion-item>


        <ion-item-divider>
            <ion-label text-wrap>
                Liste Todas as Doenças já Contraídas          
            </ion-label>
        </ion-item-divider>

        <ion-item>
          <ion-textarea @ionChange="dados.nome_doencas_infantis= $event.target.value" :value="dados.nome_doencas_infantis" placeholder="Adicionar.."></ion-textarea>
        </ion-item>

        <ion-item-divider>
            <ion-label >
                Problema no Coração         
            </ion-label>
        </ion-item-divider>

        <ion-item>
            <ion-label>Possui?</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_problema_coracao= !(Number(dados.bool_problema_coracao))" :checked="dados.bool_problema_coracao == 1"></ion-toggle>
        </ion-item>

        <ion-item-divider>
            <ion-label >
                Eplepsia         
            </ion-label>
        </ion-item-divider>

        <ion-item>
            <ion-label>Possui?</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_eplepsia= !(Number(dados.bool_eplepsia))" :checked="dados.bool_eplepsia == 1"></ion-toggle>
        </ion-item>

        <ion-item  v-if="Number(dados.bool_eplepsia)">
            <ion-label>Em Tratamento?</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_tratamento_eplepsia= !(Number(dados.bool_tratamento_eplepsia))" :checked="dados.bool_tratamento_eplepsia == 1"></ion-toggle>
        </ion-item>


        <ion-item-divider>
            <ion-label >
                Hemofilia         
            </ion-label>
        </ion-item-divider>

        <ion-item>
            <ion-label>Possui?</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_hemofilia= !(Number(dados.bool_hemofilia))" :checked="dados.bool_hemofilia == 1"></ion-toggle>
        </ion-item>

        <ion-item  v-if="Number(dados.bool_hemofilia)">
            <ion-label>Em Tratamento?</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_tratamento_hemofilia= !(Number(dados.bool_tratamento_hemofilia))" :checked="dados.bool_tratamento_hemofilia == 1"></ion-toggle>
        </ion-item>

      <ion-item-divider>
            <ion-label >
                Asma         
            </ion-label>
        </ion-item-divider>

        <ion-item>
            <ion-label>Possui?</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_asmatico= !(Number(dados.bool_asmatico))" :checked="dados.bool_asmatico == 1"></ion-toggle>
        </ion-item>

        <ion-item v-if="Number(dados.bool_asmatico)">
            <ion-label>Em Tratamento?</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_tratamento_asmatico= !(Number(dados.bool_tratamento_asmatico))" :checked="dados.bool_tratamento_asmatico == 1"></ion-toggle>
        </ion-item>

        <ion-item-divider>
            <ion-label >
                Diabetes         
            </ion-label>
        </ion-item-divider>

        <ion-item>
            <ion-label>Possui?</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_diabetes= !(Number(dados.bool_diabetes))" :checked="dados.bool_diabetes == 1"></ion-toggle>
        </ion-item>

        <ion-item v-if="Number(dados.bool_diabetes)">
            <ion-label>Toma insulina?</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_tratamento_diabetes= !(Number(dados.bool_tratamento_diabetes))" :checked="dados.bool_tratamento_diabetes == 1"></ion-toggle>
        </ion-item>

        <ion-item-divider>
            <ion-label>
                Deficiência         
            </ion-label>
        </ion-item-divider>

        <ion-item>
            <ion-label>Visual</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_deficiencia_visual= !(Number(dados.bool_deficiencia_visual))" :checked="dados.bool_deficiencia_visual == 1"></ion-toggle>
        </ion-item>

        <ion-item>
            <ion-label>Auditiva</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_deficiencia_auditiva= !(Number(dados.bool_deficiencia_auditiva))" :checked="dados.bool_deficiencia_auditiva == 1"></ion-toggle>
        </ion-item>

        <ion-item>
            <ion-label>Física</ion-label>
            <ion-toggle color="palete-secundary" slot="end" @ionChange="dados.bool_deficiencia_fisica= !(Number(dados.bool_deficiencia_fisica))" :checked="dados.bool_deficiencia_fisica == 1"></ion-toggle>
        </ion-item>

        <ion-item>
            <ion-label>Outra?</ion-label>
            <ion-input @ionChange="dados.nome_outras_deficiencias= $event.target.value" :value="dados.nome_outras_deficiencias"></ion-input>
        </ion-item>

        <ion-item-divider>
            <ion-label text-wrap>
                Informações Adicionais
            </ion-label>
        </ion-item-divider>

        <ion-item>
          <ion-textarea @ionChange="dados.informacoes_adicionais= $event.target.value" :value="dados.informacoes_adicionais" placeholder="Adicionar.."></ion-textarea>
        </ion-item>

        <ion-button @click="saveDados()" expand="full" fill="outline" color="palete-success-shade">Salvar</ion-button>

    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonTitle, IonToolbar, toastController } from '@ionic/vue';
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'
import { closeCircle } from 'ionicons/icons';


export default defineComponent({
  name: 'Cadastro Responsável',
  props: {
    ficha: {},
    closeMe: { type: Function, default: () => { return 0} },
  },
  components: { IonContent, IonHeader, IonTitle, IonToolbar},
  data() {
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
      ...mapActions('fichas', ['saveMedica']),
      async saveDados(){

        const dados = Object.assign({}, this.dados)
         
         const toast = await toastController
            .create({
                message: 'Salvo com sucesso!',
                duration: 2000
            })

        await this.saveMedica(dados).then(() => {
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