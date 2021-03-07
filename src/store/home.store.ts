import { HomeService, ResponseError } from "@/services/home.service";

const state = {
    id: -1,
    nome: "",
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
    dataSuccess(state: { 
        responseData: string;
        nome: string; 
        id: number; 
        }, payload: any) {
        state.responseData = payload;
        state.nome = payload.data.nome;
        state.id = payload.data.id;
    },
    dataError(state: {
        responseError: any;
        responseErrorCode: any;
        }, {errorCode, errorMessage}: any) {
        state.responseError = errorMessage;
        state.responseErrorCode = errorCode;
    }
}

export const home = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};