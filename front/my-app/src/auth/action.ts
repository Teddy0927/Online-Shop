import { AppDispatch } from "../store";
import axios, { AxiosResponse } from 'axios';

// export function loggedIn(email: string, username:string, token: string) {
export function loggedIn(token: string) {

    return {
        type: '@@auth/LOGGED_IN' as const,
        // email: email,
        // username: username,
        token: token,
    };
}

export function loggedOut() {
    return {
        type: '@@auth/LOGGED_OUT' as const,
    };
}

export type LoggedInAction = ReturnType<typeof loggedIn>;

export type LoggedOutAction = ReturnType<typeof loggedOut>;

export type AuthActions = LoggedInAction | LoggedOutAction;

export function checkResponse(res: AxiosResponse) {
    return (dispatch: AppDispatch) => {
        if (res.headers['temp-token'] != null) {
            dispatch(login(res.headers['temp-token']))
        }
    }
}

// export function login(email: string, username: string, token: string) {
export function login(token: string) {

    return (dispatch: AppDispatch) => {
        localStorage.setItem('token', token);

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        // dispatch(loggedIn(email, username, token));
        dispatch(loggedIn(token));
    }
}

// export function logout(email: string, username: string, token: string) {
export function logout(token: string) {

    return (dispatch: AppDispatch) => {
        localStorage.removeItem('token');

        delete axios.defaults.headers.common['Authorization'];

        // dispatch(loggedIn(email, username, token));
        dispatch(loggedIn(token));


    }
}