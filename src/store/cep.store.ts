import { CEPServices , ResponseError } from "@/services/cep.service";

const state = {
    id: -1,
    estados: [],
    cidades: "",
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
    estados: (state: { estados: any }) => {
        return state.estados;
    },
    cidades: (state: { cidades: any }) => {
        return state.cidades;
    },
    id: (state: { id: any }) => {
        return state.id;
    }
};

const actions = {
    async loadCidades(context: any, id: number) {
        context.commit("dataRequest");
        try {
            const resp = await CEPServices.cidades(id);
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
    async loadEstados(context: any) {
        context.commit("dataRequest");
        try {
            const resp = await CEPServices.estados();
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
        estados: any; 
        }, payload: any) {
        state.responseData = payload;
        state.estados = payload.data;
    },
    dataError(state: {
        responseError: any;
        responseErrorCode: any;
        }, {errorCode, errorMessage}: any) {
        state.responseError = errorMessage;
        state.responseErrorCode = errorCode;
    }
}

export const cep = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};