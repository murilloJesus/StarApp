import { BoletimService, ResponseError } from "@/services/boletim.service";

const state = {
    lista: [],
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
    lista: (state: { lista: any }) => {
        return state.lista;
    },
};

const actions = {
    async load(context: any) {
        context.commit("dataRequest");
        try {
            const resp = await BoletimService.listar(context.rootState.home.id);
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
    async ver(context: any, id: number){
        context.commit("dataRequest");
        try {
            const resp = await BoletimService.ver(id);
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
        lista: []; 
        }, payload: any) {
        state.responseData = payload;
        state.lista = payload.data;
    },
    dataError(state: {
        responseError: any;
        responseErrorCode: any;
        }, {errorCode, errorMessage}: any) {
        state.responseError = errorMessage;
        state.responseErrorCode = errorCode;
    }
}

export const boletim = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};