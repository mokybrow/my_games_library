import axios from "axios";

const FIRS_API_URL = 'https://jsonplaceholder.typicode.com'


export const getPosts = async () => {
    try {
        const res = await axios({
            url: `${FIRS_API_URL}/posts`,
            method: "GET",
            params: { offset: 0, limit: 10 }
        })

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.message, 'error');
        }

    }
};