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

const fichaService = {
    loadMedica: async function(id: number) {
        try {
            return ApiService.get(`/api/ficha/getmedica.php?id=${id}`);
        } catch (error) {
            throw new ResponseError(
                error.status,
                'Não foi psosivel requisitar a ficha medica.'
            );
        }
    },
    loadComplementar: async function(id: number) {
        try {
            return ApiService.get(`/api/ficha/getcomplementar.php?id=${id}`);
        } catch (error) {
            throw new ResponseError(
                error.status,
                'Não foi possivel requisitar a ficha complementar'
            );
        }
    },
    saveMedica: async function(id: number, form: any) {
        try {
            return ApiService.post(`/api/ficha/setmedica.php?id=${id}`, form);
        } catch (error) {
            throw new ResponseError(
                error.status,
                'Não foi possivel salvar a ficha Medica.'
            );
        }
    },
    saveComplementar: async function(id: number, form: any) {
        try {
            return ApiService.post(`/api/ficha/setcomplementar.php?id=${id}`, form);
        } catch (error) {
            throw new ResponseError(
                error.status,
                'Não foi possivel salvar a ficha complementar.'
            );
        }
    },
}

export { fichaService, ResponseError };