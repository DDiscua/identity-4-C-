import axios from "../../util/Api";
import { push } from "connected-react-router";
import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    SIGNOUT_USER_SUCCESS,
    SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_ERROR, SIGNOUT_USER_ERROR, SIGNOUT_USER, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS
} from "../types";

export const userLogin = ({ username, password }) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            try {
                dispatch({ type: FETCH_START });
                axios
                    .post("User/login", {
                        UserName: username,
                        Password: password
                    })
                    .then(({ data }) => {
                        if (data && data.code === 200) {
                            dispatch({ type: FETCH_SUCCESS });
                            dispatch({ type: LOGIN_USER_SUCCESS, payload: data.payload });
                            setSession(data.payload);
                            resolve(data);
                        } else {
                            dispatch({ type: FETCH_ERROR, payload: data.error });
                            reject(data);
                        }
                    })
                    .catch(function (error) {
                        const { response } = error;
                        dispatch({ type: FETCH_ERROR, payload: error });
                        reject(response);
                    });
            } catch (err) {
                reject(err);
            }
        });
    };
};

export const Register = ({ username, password, confirmPassword, email, phoneNumber }) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            try {
                dispatch({ type: FETCH_START });
                axios
                    .post("User/RegisterUser", {
                        UserName: username,
                        Password: password,
                        PhoneNumber: phoneNumber,
                        ConfirmPassword: confirmPassword,
                        Email: email
                    })
                    .then(({ data }) => {
                        console.log(data);
                        if (data && data.code === 200) {
                            dispatch({ type: FETCH_SUCCESS });
                            dispatch(push("/dashboard/main"));
                            resolve(data);
                        } else {
                            dispatch({ type: FETCH_ERROR, payload: data.error });
                            reject(data);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        const { response } = error;
                        dispatch({ type: FETCH_ERROR, payload: error });
                        reject(response);
                    });
            } catch (err) {
                reject(err);
            }
        });
    };
};

export const ListUsers = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            try {
                dispatch({ type: FETCH_START });
                axios
                    .get("User/ListUsers")
                    .then(({ data }) => {
                        console.log(data);
                        if (data && data.code === 200) {
                            dispatch({ type: FETCH_SUCCESS });
                            resolve(data);
                        } else {
                            dispatch({ type: FETCH_ERROR, payload: data.error });
                            reject(data);
                        }
                    })
                    .catch(function (error) {
                        const { response } = error;
                        dispatch({ type: FETCH_ERROR, payload: error });
                        reject(response);
                    });
            } catch (err) {
                reject(err);
            }
        });
    };
};




const setSession = data => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(data.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem("access_token", data.token.access_token);
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("id_token", data.token.access_token);
    localStorage.setItem("expires_at", data.token.expires_in);
};

const outSession = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("user");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("reduxState");
};

export const userSignOut = () => {
    console.log('Logout');
    return dispatch => {
        dispatch({ type: FETCH_START });
        return new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    outSession();
                    dispatch({ type: FETCH_SUCCESS });
                    dispatch({ type: SIGNOUT_USER_SUCCESS });
                    dispatch(push("/"));
                });
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    };
};