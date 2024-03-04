import axios from 'axios';
import {Md5} from "ts-md5";

const timestamp  = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const hash = Md5.hashStr( "Valantis_" + timestamp ).toString()

const instance = axios.create({
    baseURL: "http://api.valantis.store:40000/",
    headers: {
        "X-Auth": hash
    }
});

export const throwError = (response: {data: string}) => {
    throw new Error(response.data)
}

export default instance;