import { PuplicRequest } from "../requsetMethod.js";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
    try {
        dispatch(loginStart());

        const res = await PuplicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
};