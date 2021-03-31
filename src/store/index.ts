import { createStore } from 'vuex';
import { auth } from "./auth.store";
import { home } from "./home.store";
import { mensagem } from "./mensagem.store"
import { cadastroAluno } from "./cadastroAluno.store"
import { cep } from "./cep.store"
import { escolaridade } from "./escolaridade.store"
import { responsaveis } from "./responsaveis.store"
import { documentos } from "./documentos.store"
import { fichas } from "./fichas.store"
import { boletim } from "./boletim.store"

export const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        home,
        mensagem,
        cadastroAluno,
        cep,
        escolaridade,
        responsaveis,
        documentos,
        fichas,
        boletim
    },
})