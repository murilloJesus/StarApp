<template>
    <ion-list v-if=" page === 'aluno' ">
        <!-- FOTO AQUI -->

        <ion-item-divider>
            <ion-label>
            Dados Gerais
            </ion-label>
        </ion-item-divider>

        <ion-item>
            <ion-label position="floating">Nome</ion-label>
            <ion-input @ionChange="dados.nome= $event.target.value" :value="dados.nome" ></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="floating">Código / Matricula</ion-label>
            <ion-input @ionChange="dados.codigo= $event.target.value" :value="dados.codigo"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="floating">R.A</ion-label>
            <ion-input @ionChange="dados.ra= $event.target.value" :value="dados.ra"></ion-input>
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
            <ion-label position="floating">Local de Nascimento</ion-label>
            <ion-input @ionChange="dados.local_nascimento= $event.target.value" :value="dados.local_nascimento"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="floating">Data de Nascimento</ion-label>
            <ion-input @ionChange="dados.nascimento= $event.target.value" :value="dados.nascimento"></ion-input>
        </ion-item>
        
        <ion-item>
            <ion-label>Sexo</ion-label>
            <ion-select placeholder="Selecione" @ionChange="dados.sexo= $event.target.value" :value="dados.sexo"> 
                <ion-select-option value="0">Feminino</ion-select-option>
                <ion-select-option value="1">Masculino</ion-select-option>
            </ion-select>
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
            Ensinos e Horários
            </ion-label>
        </ion-item-divider>

        <ion-item>
            <ion-label position="floating">Ensino</ion-label>
            <p>{{ensino}}</p>
        </ion-item>

        <ion-item>
            <ion-label position="floating">Série (Ano)</ion-label>
            <p>{{ano}}</p>
        </ion-item>

        <ion-item>
            <ion-label position="floating">Hor. de Entrada</ion-label>
            <p>{{dados.horario_entrada}}</p>
        </ion-item>

        <ion-item>
            <ion-label position="floating">Hor. de Saída</ion-label>
            <p>{{dados.horario_saida}}</p>
        </ion-item>

        <ion-item>
            <ion-label position="floating">Situação</ion-label>
            <p>{{compSituacao}}</p>
        </ion-item>


        <ion-item-divider>
            <ion-label>
                Financeiro
            </ion-label>
        </ion-item-divider>

        <ion-item>
            <ion-label position="floating">Valor da Mensalidade</ion-label>
            <p>{{parseFloat(dados.preco/100).toFixed(2)}}</p>
        </ion-item>

        <ion-item>
            <ion-label position="floating">Desconto</ion-label>
            <p>{{parseFloat(dados.desconto_mensalidade/100).toFixed(2)}}</p>
        </ion-item>

        <ion-button @click="saveDados()" expand="full" fill="outline">Salvar</ion-button>

    </ion-list>
</template>

<script lang=ts>
import { loadingController, toastController  } from '@ionic/vue';
import { mapActions } from 'vuex';
import { defineComponent, watch } from 'vue';

interface State {
    dados: any;
    estados: any;
    cidades: any;
    ensino: string;
    ano: string;
}

export default defineComponent({
    name: 'Cadastro Aluno',
    props: ['page'],
    data: (): State => {
        return  {
            dados: false,
            estados : [],
            cidades: [],
            ensino: '',
            ano: ''
        }
    },
    created(){
      this.loadDados();
      this.loadEstados();
    },
    methods: {
    ...mapActions("cadastroAluno", ["load"]),
    ...mapActions("cadastroAluno", ["save"]),
    ...mapActions("cep", ['loadEstados']),
    ...mapActions("cep", ['loadCidades']),
    ...mapActions("escolaridade", ['loadAno']),
    ...mapActions("escolaridade", ['loadEnsino']),
    async loadDados() {

      const loading = await loadingController
        .create({
          cssClass: 'my-custom-class',
          message: 'Aguarde...',
        })

        await loading.present()

      await this.load().then((res: any) => {
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

        this.loadAno(this.dados.series).then((res: any) => {
            this.ano = res.data.nome;
        });

        this.loadEnsino(this.dados.series1_cate).then((res: any) => {
            this.ensino = res.data.nome;
        });
    },
    async saveDados(){
         const toast = await toastController
            .create({
                message: 'Salvo com sucesso!',
                duration: 2000
            })

        await this.save(this.dados).then(() => {
            toast.present();
        });

    }
  },
  computed: {
      compSituacao(): string {
          const states = ['Aluno', 'Pré-Matricula', 'Ex-Aluno']

          return states[ this.dados.situacao ]
      }
  }
})
</script>

<style>
    ion-button {
        margin-bottom: 50px;
    }
</style>