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

const MensagensService = {

    listar: async function (id: number) {
         try {
             return ApiService.get(`/api/mensagem/listar.php?id=${id}`)
         } catch (error) {
            throw new ResponseError(
                error.status,
                'Não foi possível listar as mensagens'
            );
        }
    },

    ver: async function (id: number) {
        try {
            return ApiService.get(`/api/mensagem/ver.php?id=${id}`)
        } catch (error) {
           throw new ResponseError(
               error.status,
               'Não foi possivel carregar a mensagem'
           );
       }
   },


   responder: async function (data: {
       id: number;
       texto: string;
   }) {
        try {
            return ApiService.post(`/api/mensagem/responder.php`, data)
        } catch (error) {
            throw new ResponseError(
                error.status,
                'Não foi possivel responder a mensagem'
            );
        }
    },

}

export { MensagensService, ResponseError };