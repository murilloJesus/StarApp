import axios, { AxiosRequestConfig } from "axios";
import {store} from '@/store';
import {loadingController} from '@ionic/vue';
import qs from "qs";

class AuthenticationError extends Error {
    errorCode: any;
    constructor(errorCode: any, message: string | undefined) {
        super(message);
        this.name = this.constructor.name;
        if (message != null) {
            this.message = message;
        }
        this.errorCode = errorCode;
    }
}

const ApiService = {

    _requestInterceptor: 0,
    _401interceptor: 0,

    init(baseURL: string | undefined) {
        axios.defaults.baseURL = baseURL;
    },

    setHeader() {
        axios.defaults.headers.common["Access-Control-Allow-Origin"] = `*`;
        axios.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
    },

    get(resource: string) {
        return axios.get(resource);
    },

    async post(resource: string, data: any) {

        const requestData: AxiosRequestConfig = {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            url: resource,
            data: qs.stringify(data)
        };

        try {
            const response = await this.customRequest(requestData);
            this.setHeader();
            this.mount401Interceptor();

            return response.data;
        } catch (error) {
            this.catchError(error);
        }
    },

    put(resource: string, data: any) {
        return axios.put(resource, data);
    },

    delete(resource: string) {
        return axios.delete(resource);
    },

    customRequest(data: AxiosRequestConfig) {
        return axios(data);
    },

    mountRequestInterceptor() {
        this._requestInterceptor = axios.interceptors.request.use(async config => {
            console.log("show loading");
            const loading = await loadingController.create({
                message: 'Please wait...'
            });
            await loading.present();

            return config;
        });
    },

    mount401Interceptor() {
        this._401interceptor = axios.interceptors.response.use(
            response => {
                loadingController.dismiss().then(r => console.log(r));
                return response;
            },
            async error => {
                loadingController.dismiss().then(r => console.log(r));
                if (error.request.status === 401) {
                    if (error.config.url.includes("oauth/token")) {
                        await store.dispatch("auth/signOut");
                        throw error;
                    } else {
                        try {
                            await store.dispatch("auth/refreshToken");
                            return this.customRequest({
                                method: error.config.method,
                                url: error.config.url,
                                data: error.config.data
                            });
                        } catch (e) {
                            throw error;
                        }
                    }
                }
                throw error;
            }
        );
    },

    unmount401Interceptor() {
        axios.interceptors.response.eject(this._401interceptor);
    },

    catchError: function(error: any) {
        let status;
        let description;

        if (error.response === undefined) {
            status = error.message;
            description = error.message;
        } else {
            status = error.response.status;
            description = error.response.data.error_description;
        }

        throw new AuthenticationError(status, description);
    }

}

export default ApiService;