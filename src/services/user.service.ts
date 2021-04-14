import axios from "axios";

interface User {
    id: any;
    login: any;
    senha: any;
}

const UserService = {

    getUser(): User {
        const id =   localStorage.getItem('id');
        const login =  localStorage.getItem('login');
        const senha =  localStorage.getItem('senha');

        return {
            id: id,
            login: login,
            senha: senha
        }
    },

    saveUser( accessUser: User ) {

        localStorage.setItem( 'id', accessUser.id);
        localStorage.setItem( 'login', accessUser.login);
        localStorage.setItem( 'senha', accessUser.senha);

        axios.defaults.headers.common['idescola'] = accessUser.id;
        axios.defaults.headers.common["login"] = accessUser.login;
        axios.defaults.headers.common["senha"] = accessUser.senha;
    },

    removeUser() {
        localStorage.removeItem('id');
        localStorage.removeItem('login');
        localStorage.removeItem('senha');
    },

}

export { UserService };