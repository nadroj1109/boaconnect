import api from "../api/axios";

export function verify(token) {

    return api.get(

        `/auth/activation/${token}`

    );

}

export function activate(data) {

    return api.post(

        "/auth/activate",

        data

    );

}