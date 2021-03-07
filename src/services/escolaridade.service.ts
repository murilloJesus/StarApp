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

const escolaridadeService = {
    ensino: async function(id: number) {
        try {
            return ApiService.get(`/api/escolaridade/ensino.php?id=${id}`);
        } catch (error) {
            throw new ResponseError(
                error.status,
                'Não foi possivel completar a requisição.'
            );
        }
    },

    ano: async function(id: number) {
        try {
            return ApiService.get(`/api/escolaridade/ano.php?id=${id}`);
        } catch (error) {
            throw new ResponseError(
                error.status,
                'Não foi possivel completar a requisição.'
            );
        }
    },

}

export { escolaridadeService, ResponseError };