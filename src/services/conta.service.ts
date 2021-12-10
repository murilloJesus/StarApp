import ApiService from "./api.service";

class ResponseError extends Error {
    errorCode: any;
    errorMessage: any;
    constructor(errorCode: any, message: string | undefined) {
        super(message);
        this.name = this.constructor.name;
        if (message != null) {
            this.message = message;
        }
        this.errorCode = errorCode;
    }
}

const contaService = {
    listar: async function(id: number, params: any) {
        try {
            return ApiService.get(`/api/contas/lista.php`, {
                ...params,
                id: id
            });
        } catch (error) {
            throw new ResponseError(
                error.status,
                'Não Foi possível carregar.'
            );
        }
    },

    get: async function(id: number) {
        try {
            return ApiService.get(`/api/contas/get.php?id=${id}`);
        } catch (error) {
            throw new ResponseError(
                error.status,
                'Não Foi possivel carregar.'
            );
        }
    },

    anos: async function(id: number) {
        try {
            return ApiService.get(`/api/contas/anos.php`, {
                id: id
            });
        } catch (error) {
            throw new ResponseError(
                error.status,
                'Não Foi possivel carregar.'
            );
        }
    },
    

}

export { contaService, ResponseError };