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

const responsaveisService = {
    listar: async function(id: number) {
        try {
            return ApiService.get(`/api/responsaveis/lista.php?id=${id}`);
        } catch (error) {
            throw new ResponseError(
                error.status,
                'Lista de responsável não encontrada.'
            );
        }
    },

    cadastro: async function(id: number) {
        try {
            return ApiService.get(`/api/responsaveis/cadastro.php?id=${id}`);
        } catch (error) {
            throw new ResponseError(
                error.status,
                'Cadastro de responsável não encontrado.'
            );
        }
    },

    set: async function (data: any) {
        try {
            return ApiService.post(`/api/responsaveis/set.php`, data)
        } catch (error) {
            throw new ResponseError(
                error.status,
                'Não foi possivel salvar os dados'
            );
        }
    },
}

export { responsaveisService, ResponseError };