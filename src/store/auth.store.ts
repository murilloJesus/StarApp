import {AuthenticationError, AuthService} from "@/services/auth.service";

const state = {
    authenticating: false,
    authenticationErrorCode: 0,
    authenticationError: "",
};

const getters = {
    authenticationErrorCode: (state: { authenticationErrorCode: any }) => {
        return state.authenticationErrorCode;
    },

    authenticationError: (state: { authenticationError: any }) => {
        return state.authenticationError;
    },

    authenticating: (state: { authenticating: any }) => {
        return state.authenticating;
    }
};

const actions = {
    async signIn(context: any, signInData: any) {
        context.commit("signInRequest");
        return new Promise((resolve, reject) => {
            AuthService.signIn(signInData).then(res => {
                context.commit("signInSuccess", res);
                resolve(res);
            }).catch(err => {
                if (err instanceof AuthenticationError) {
                    context.commit("signInError", {
                        errorCode: err.errorCode,
                        errorMessage: err.message
                    });
                    reject(err.errorCode);
                }
            });
        });
    },

    setAuthenticatingStatus(context: any, status: any) {
        context.commit("setAuthenticatingStatus", status);
    },
};

const mutations = {
    signInRequest(state: {
        authenticating: boolean;
        authenticationError: string;
        authenticationErrorCode: number;
    }) {
        state.authenticating = true;
        state.authenticationError = "";
        state.authenticationErrorCode = 0;
    },

    signInSuccess(state: {
        authenticating: boolean;
    }) {
        state.authenticating = false;
    },

    signInError(state: {
        authenticating: boolean;
        authenticationErrorCode: any;
        authenticationError: any;
    }, {errorCode, errorMessage}: any) {
        state.authenticating = false;
        state.authenticationErrorCode = errorCode;
        state.authenticationError = errorMessage;
    },

    signOutRequest(state: { authenticating: boolean }) {
        state.authenticating = false;
    },

    processSuccess(state: { authenticating: boolean }) {
        state.authenticating = false;
    },

    setAuthenticatingStatus(state: { authenticating: any }, status: any) {
        state.authenticating = status;
    }
};

export const auth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};