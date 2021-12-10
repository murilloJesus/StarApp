import axios, { AxiosRequestConfig } from "axios";
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

    get(resource: string, params: any = false) {
        if(params) return axios.get(resource, { params: params})
        return axios.get(resource)
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