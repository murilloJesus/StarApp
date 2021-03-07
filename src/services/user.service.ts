import axios from "axios";

const USER_KEY = "usuario";

const UserService = {

    getUser() {
        return localStorage.getItem(JSON.parse(USER_KEY));
    },

    saveUser(accessUser: {id: number; login: string; senha: string} ) {
        localStorage.setItem( USER_KEY, JSON.stringify(accessUser));
        axios.defaults.headers.common['idescola'] = accessUser.id;
        axios.defaults.headers.common["login"] = accessUser.login;
        axios.defaults.headers.common["senha"] = accessUser.senha;
    },

    removeUser() {
        localStorage.removeItem(USER_KEY);
    },

}

export { UserService };