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

const CadastroAlunoService = {

    get: async function (id: number) {
         try {
             return ApiService.get(`/api/cadastro/get.php?id=${id}`)
         } catch (error) {
            throw new ResponseError(
                error.status,
                'Não foi possível carregar o cadastro do aluno'
            );
        }
    },


   set: async function (data: any) {
        try {
            return ApiService.post(`/api/cadastro/set.php`, data)
        } catch (error) {
            throw new ResponseError(
                error.status,
                'Não foi possivel salvar os dados'
            );
        }
    },

}

export { CadastroAlunoService, ResponseError };