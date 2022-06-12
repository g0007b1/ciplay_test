import {UserDataType} from "../utils/types";

export const api = {
    registerUser: (user: UserDataType) => {
        return fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({
                ...user
            }),
        }).then(data => data.json()).then(data => data)
    },
    login: (user: UserDataType) => {
        return fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({
                ...user
            }),
        }).then(data => data.json()).then(data => data)
    },
    changePassword: (user: UserDataType) => {
        return fetch("/api/users/change-password", {
            method: "DELETE",
            body: JSON.stringify({
                ...user
            }),
        }).then(data => data.json()).then(data => data)
    }

}
