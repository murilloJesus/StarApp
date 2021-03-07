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

const CEPServices = {
    estados: async function() {
        try {
            return ApiService.get('/api/cep/estados.php');
        } catch (error) {
            throw new ResponseError(
                error.status,
                'Estados não encontrados.'
            );
        }
    },

    cidades: async function(id: number) {
        try {
            return ApiService.get(`/api/cep/cidades.php?estado=${id}`);
        } catch (error) {
            throw new ResponseError(
                error.status,
                'Cidades não encontradas.'
            );
        }
    }
}

export { CEPServices, ResponseError };