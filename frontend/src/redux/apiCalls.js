import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";


export const login = async (dispatch, user) => {
    dispatch(loginStart());

    try {
        const res = await publicRequest.post("http://localhost:3000/api/auth/login", user);
        dispatch(loginSuccess(res.data));

        // Save the user data to localStorage
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        return res.data
    } catch (error) {
        dispatch(loginFailure());
        console.log(error.message)
        throw error
    }
};

export const register = async (dispatch, user) => {

    try {
        const res = await publicRequest.post("http://localhost:3000/api/auth/register", user); // adjust URL
        return res.data
    } catch (error) {
        throw error
    }
};