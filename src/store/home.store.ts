import { HomeService, ResponseError } from "@/services/home.service";

const state = {
    id: false,
    parentId: -1,
    nome: "",
    tipo: "",
    selAluno: {},
    lisAlunos: [],
    //REST control
    responseData: "",
    responseErrorCode: 0,
    responseError: "",
};

const getters = {
    responseErrorCode: (state: { responseErrorCode: any }) => {
        return state.responseErrorCode;
    },
    responseError: (state: { responseError: any }) => {
        return state.responseError;
    },
    responseData: (state: { responseData: any }) => {
        return state.responseData;
    },
    user: (state: any) => {
        return {
            id: state.id,
            nome: state.nome,
            tipo: state.tipo,
            selAluno: state.selAluno, 
            lisAlunos: state.lisAlunos
        }
    },
    nome: (state: { nome: any }) => {
        return state.nome;
    },
    id: (state: { id: any }) => {
        return state.id;
    }
};

const actions = {
    async loadHome(context: any) {
        context.commit("dataRequest");
        try {
            const resp = await HomeService.home();
            context.commit("dataSuccess", resp);
            return resp;
        } catch (e) {
            if (e instanceof ResponseError) {
                context.commit("dataError", {
                    errorMessage: e.errorMessage,
                    responseErrorCode: e.errorCode
                });
            }
            return e.message;
        }
    },
    async setAluno(context: any, id: number){
        return context.commit("setAluno", id)
    }
};

const mutations = {
    dataRequest(state: {
        responseError: string;
        responseErrorCode: number;
    }) {
        state.responseError = "";
        state.responseErrorCode = 0;
    },
    dataSuccess( state: any , payload: any) {
        state.responseData = payload;
        state.nome = payload.data.nome;
        state.email =  payload.data.email;
        state.tipo = payload.data.tipo;

        if( state.tipo === 'Responsável'){
            state.selAluno = payload.data.alunos[0];
            state.lisAlunos = payload.data.alunos;
            state.id = state.selAluno.id;
            state.parentId = payload.data.id;
        }else{
            state.id = payload.data.id
        }
    },
    dataError(state: {
        responseError: any;
        responseErrorCode: any;
        }, {errorCode, errorMessage}: any) {
        state.responseError = errorMessage;
        state.responseErrorCode = errorCode;
    },
    setAluno(state: any, id: any){
        state.selAluno = state.lisAlunos.find((element: any) => element.id === id)
        state.id = state.selAluno.id
        return true
    }
}

export const home = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};