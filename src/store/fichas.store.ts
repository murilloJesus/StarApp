import { fichaService, ResponseError } from "@/services/ficha.service";

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
    async loadMedica(context: any) {
        context.commit("dataRequest");
        try {
            const resp = await fichaService.loadMedica(context.rootState.home.id);
            context.commit("dataSuccess", resp);
            return resp.data;
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
    async loadComplementar(context: any) {
        context.commit("dataRequest");
        try {
            const resp = await fichaService.loadComplementar(context.rootState.home.id);
            context.commit("dataSuccess", resp);
            return resp.data;
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
    async saveMedica(context: any, form: any) {
        context.commit("dataRequest");
        try {
            const resp = await fichaService.saveMedica(context.rootState.home.id, form);
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
    async saveComplementar(context: any, form: any) {
        context.commit("dataRequest");
        try {
            const resp = await fichaService.saveComplementar(context.rootState.home.id, form);
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

export const fichas = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};