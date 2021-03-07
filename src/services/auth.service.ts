import ApiService from "./api.service";
import { AxiosRequestConfig } from "axios";
import { UserService } from "./user.service";
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

const AuthService = {
    signIn: async function(signInData: any) {
        const requestData: AxiosRequestConfig = {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            url: "/loginapi.php",
            data: qs.stringify({
                id: signInData.id,
                login: signInData.login,
                senha: signInData.senha
            })
        };

        try {
            const response = await ApiService.customRequest(requestData);
            ApiService.setHeader();
            UserService.saveUser(signInData);
            ApiService.mount401Interceptor();

            return response.data;
        } catch (error) {
            this.catchError(error);
        }
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

export {AuthService, AuthenticationError} 