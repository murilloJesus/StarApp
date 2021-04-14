<template>
  <ion-header>
      <ion-toolbar>
        <ion-title slot="start">
          <h5>
            Cadastro Responsavel
          </h5>
          </ion-title>
        <ion-icon @click="closeMe" color="primary" slot="end" size="large" name="close" />
      </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-list>
        <!-- FOTO AQUI -->

        <ion-item-divider>
            <ion-label>
            Dados Gerais
            </ion-label>
        </ion-item-divider>

        <ion-item>
            <ion-label position="floating">Nome</ion-label>
            <p>{{dados.nome}}</p>
        </ion-item>

         <ion-item>
            <ion-label>Parentesco</ion-label>
            <ion-select placeholder="Selecione"  @ionChange="dados.parentesco= $event.target.value" :value="dados.parentesco">
                <ion-select-option v-for="(item, index) in parentesco" :value="index" :key="index">{{item}}</ion-select-option>
            </ion-select>
        </ion-item>

        <ion-item>
            <ion-label>Tipo</ion-label>
            <ion-select placeholder="Selecione"  @ionChange="dados.tipo= $event.target.value" :value="dados.tipo">
                <ion-select-option v-for="(item, index) in tipo" :value="index" :key="index">{{item}}</ion-select-option>
            </ion-select>
        </ion-item>

        <ion-item>
            <ion-label position="floating">CPF</ion-label>
            <ion-input @ionChange="dados.cpf= $event.target.value" :value="dados.cpf"></ion-input>
        </ion-item>

        <ion-item>
            <ion-label position="floating">RG</ion-label>
            <ion-input @ionChange="dados.rg= $event.target.value" :value="dados.rg"></ion-input>
        </ion-item>

        <ion-item>
            <ion-label position="floating">Orgao expedidor RG</ion-label>
            <ion-input @ionChange="dados.orgao_rg= $event.target.value" :value="dados.orgao_rg"></ion-input>
        </ion-item>

        <ion-item>
            <ion-label position="floating">Data Expediçao RG</ion-label>
            <ion-input @ionChange="dados.data_rg= $event.target.value" :value="dados.data_rg"></ion-input>
        </ion-item>

        <ion-item>
            <ion-label position="floating">Data de Nascimento</ion-label>
            <ion-input @ionChange="dados.nascimento= $event.target.value" :value="dados.nascimento"></ion-input>
        </ion-item>

        <ion-item>
            <ion-label position="floating">Local de Nascimento</ion-label>
            <ion-input @ionChange="dados.local_nascimento= $event.target.value" :value="dados.local_nascimento"></ion-input>
        </ion-item>

        <ion-item>
            <ion-label position="floating">Naturalidade</ion-label>
            <ion-input @ionChange="dados.naturalidade= $event.target.value" :value="dados.naturalidade"></ion-input>
        </ion-item>

        

        <ion-item-divider>
            <ion-label>
            Contato
            </ion-label>
        </ion-item-divider>

        <ion-item>
            <ion-label position="floating">Telefone</ion-label>
            <ion-input @ionChange="dados.telefone= $event.target.value" :value="dados.telefone"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="floating">Celular</ion-label>
            <ion-input @ionChange="dados.celular= $event.target.value" :value="dados.celular"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="floating">E-mail</ion-label>
            <ion-input @ionChange="dados.email= $event.target.value" :value="dados.email"></ion-input>
        </ion-item>

        <ion-item-divider>
            <ion-label>
            Endereço
            </ion-label>
        </ion-item-divider>

        <ion-item>
            <ion-label position="floating">CEP</ion-label>
            <ion-input @ionChange="dados.cep= $event.target.value" :value="dados.cep"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="floating">Endereço</ion-label>
            <ion-input @ionChange="dados.endereco= $event.target.value" :value="dados.endereco"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="floating">Número</ion-label>
            <ion-input @ionChange="dados.numero= $event.target.value" :value="dados.numero"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="floating">Complemento</ion-label>
            <ion-input @ionChange="dados.complemento= $event.target.value" :value="dados.complemento"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="floating">Bairro</ion-label>
            <ion-input @ionChange="dados.bairro= $event.target.value" :value="dados.bairro"></ion-input>
        </ion-item>

         <ion-item>
            <ion-label>Cidade</ion-label>
            <ion-select placeholder="Selecione"  @ionChange="dados.cidade= $event.target.value" :value="dados.cidade">
                <ion-select-option v-for="item in cidades" :value="item.id" :key="item.id">{{item.nome}}</ion-select-option>
            </ion-select>
        </ion-item>

         <ion-item>
            <ion-label>Estado</ion-label>
            <ion-select placeholder="Selecione" @ionChange="dados.estado = $event.target.value" :value="dados.estado" >
                <ion-select-option v-for="item in estados" :value="item.id" :key="item.id">{{item.nome}}</ion-select-option>
            </ion-select>
        </ion-item>

        <ion-item-divider>
            <ion-label>
            Dados profissionais
            </ion-label>
        </ion-item-divider>

        <ion-item>
            <ion-label position="floating">Profissão</ion-label>
            <ion-input @ionChange="dados.profissao= $event.target.value" :value="dados.profissao"></ion-input>
        </ion-item>

        <ion-item>
            <ion-label position="floating">Empresa</ion-label>
            <ion-input @ionChange="dados.empresa_trabalha= $event.target.value" :value="dados.empresa_trabalha"></ion-input>
        </ion-item>

        <ion-item>
            <ion-label position="floating">CNPJ</ion-label>
            <ion-input @ionChange="dados.cnpj= $event.target.value" :value="dados.cnpj"></ion-input>
        </ion-item>

        <ion-item>
            <ion-label position="floating">Telefone </ion-label>
            <ion-input @ionChange="dados.empresa_telefone= $event.target.value" :value="dados.empresa_telefone"></ion-input>
        </ion-item>

        <ion-item-divider>
            <ion-label>
            Informações adicionais
            </ion-label>
        </ion-item-divider>

        <ion-item>
          <ion-textarea @ionChange="dados.txtcurto= $event.target.value" :value="dados.txtcurto"></ion-textarea>
        </ion-item>

        <ion-button @click="saveDados()" expand="full" fill="outline">Salvar</ion-button>

    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonTitle, IonToolbar, loadingController, toastController } from '@ionic/vue';
import { defineComponent, watch } from 'vue'
import { mapActions } from 'vuex'
import { closeCircle } from 'ionicons/icons';


export default defineComponent({
  name: 'Cadastro Responsável',
  props: {
    id: { type: Number, default: 0 },
    closeMe: { type: Function, default: () => { return 0} },
  },
  components: { IonContent, IonHeader, IonTitle, IonToolbar},
  data() {
      return {
          dados: false,
          parentesco: ['Pai', 'Mãe', 'Tio', 'Tia', 'Avô', 'Avó', 'Irmão', 'Irmã', 'Outros'],
          tipo: ['Responsável pelo Aluno', 'Responsável Financeiro 1', 'Responsável Financeiro 2', 'Outros']
      }
  },
  created(){
    this.loadDados();
  },
  setup() {
    return {
      closeCircle
    }
  },
  methods: {
      ...mapActions('responsaveis', ['cadastro']),
      ...mapActions('responsaveis', ['salvar']),
      ...mapActions("cep", ['loadEstados']),
      ...mapActions("cep", ['loadCidades']),
      async saveDados(){
         const toast = await toastController
            .create({
                message: 'Salvo com sucesso!',
                duration: 2000
            })

        await this.salvar(this.dados).then(() => {
            toast.present();
            this.closeMe();
        });

      },
      async loadDados() {

        const loading = await loadingController
          .create({
            cssClass: 'my-custom-class',
            message: 'Aguarde...',
          })

          await loading.present()

        await this.cadastro(this.id).then((res: any) => {
          this.dados = res.data;
          loading.dismiss();
        });

        watch(
          () => this.dados.estado,
              (estado) => {
                  this.loadCidades(estado).then((res: any) => {
                      this.cidades = res.data
                  });
              }
          )

          this.loadCidades(this.dados.estado).then((res: any) => {
              this.cidades =  res.data
          });

          this.loadEstados().then((res: any) => {
              this.estados = res.data;
          });
      }
  }  
})
</script>