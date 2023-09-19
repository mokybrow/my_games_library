import { Dispatch } from "@reduxjs/toolkit"

import { AxiosPromise } from "axios"
import { loginFailure, loginStart, loginSucess } from "./AuthReducer"
import { ILoginRequest } from "../../api/auth/types"
import api from "../../api"


export const loginUser =
    (data: ILoginRequest) =>
        async (dispatch: Dispatch<any>): Promise<void> => {
            try {
                dispatch(loginStart())

                const res = await api.auth.login(data)

                dispatch(loginSucess(res.data.accessToken))

            } catch (e: any) {
                console.error(e)

                dispatch(loginFailure(e.message))
            }
        }


