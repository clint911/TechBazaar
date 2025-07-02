import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import axios from "axios"

export const login = async (dispatch, user) => {
    dispatch(loginStart());

    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));

        // Save the user data to localStorage
        localStorage.setItem("currentUser", JSON.stringify(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
};

export const register = async (dispatch, user) => {
    dispatch(loginStart());

    try {
        const res = await axios.post("http://localhost:3000/api/auth/register", user); // adjust URL
        dispatch( loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
        throw error
    }
};