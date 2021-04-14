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

const DiarioClasseService = {

    listar: async function (id: number) {
         try {
             return ApiService.get(`/api/diario_classe/lista.php?id=${id}`)
         } catch (error) {
            throw new ResponseError(
                error.status,
                'Não foi possível listar'
            );
        }
    },

    ver: async function (id: number) {
        try {
            return ApiService.get(`/api/diario_classe/ver.php?id=${id}`)
        } catch (error) {
           throw new ResponseError(
               error.status,
               'Não foi possivel carregar o diario'
           );
       }
   },

}

export { DiarioClasseService, ResponseError };