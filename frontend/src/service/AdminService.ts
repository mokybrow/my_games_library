import { AxiosResponse } from "axios";
import $api from "../api/api";

export default class AuthService {

    static async getUsers(page: number,): Promise<AxiosResponse> {

        return $api.get('/admin/users', {params:{
            page
        }})
    }
}