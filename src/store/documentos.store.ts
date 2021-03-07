import { documentosService, ResponseError } from "@/services/documentos.service";

const state = {
    dados: [],
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
    dados: (state: { dados: any }) => {
        return state.dados;
    },
};

const actions = {
    async load(context: any) {
        context.commit("dataRequest");
        try {
            const resp = await documentosService.listar(context.rootState.home.id);
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
    async save(context: any, form: any) {
        context.commit("dataRequest");
        try {
            const resp = await documentosService.enviar(context.rootState.home.id, form);
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
        dados: []; 
        }, payload: any) {
        state.responseData = payload;
        state.dados = payload.data;
    },
    dataError(state: {
        responseError: any;
        responseErrorCode: any;
        }, {errorCode, errorMessage}: any) {
        state.responseError = errorMessage;
        state.responseErrorCode = errorCode;
    }
}

export const documentos = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};