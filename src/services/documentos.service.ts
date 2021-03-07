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

const documentosService = {
    listar: async function(id: number) {
        try {
            return ApiService.get(`/api/documentos/lista.php?id=${id}`);
        } catch (error) {
            throw new ResponseError(
                error.status,
                'Lista de responsável não encontrada.'
            );
        }
    },
    enviar: async function(id: number, form: any) {
        try {
            return ApiService.post(`/api/documentos/salvar.php?id=${id}`, form);
        } catch (error) {
            throw new ResponseError(
                error.status,
                'Lista de responsável não encontrada.'
            );
        }
    },
}

export { documentosService, ResponseError };