import axios, { AxiosResponse } from 'axios'
import {SERVER} from '../config/config.json'

const Axios = axios.create({
    baseURL:SERVER,
    headers: {
        "Access-Control-Allow-Origin": "*",
      },
});

export const getRequest = async({ url }: getRequestProps):Promise<AxiosResponse> => {
    const data = await Axios.get(url);

    return data;
};

export const postRequest = async({ url, request }:getPostProps):Promise<AxiosResponse> => {
    const data = await Axios.post(url,request);

    return data;
};

type getRequestProps = {
    url:string;
}

type getPostProps = {
    url:string;
    request:any;
}