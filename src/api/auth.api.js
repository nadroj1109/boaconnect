import api from "./axios";
import sanctum from "./sanctum";

export async function csrf() {

    await sanctum.get("/sanctum/csrf-cookie");

}

export async function login(credentials) {

    // await csrf();

    const { data } = await api.post(
        "/login",
        credentials
    );

    return data;

}

export async function me() {

    const { data } = await api.get("/me");

    return data;

}

export async function logout() {

    const { data } = await api.post("/logout");

    return data;

}