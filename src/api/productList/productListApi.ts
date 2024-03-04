import axios from "../index.ts";
import {AxiosPromise} from "axios";
import {
    IGetFieldsRequest, IGetFieldsResponse, IGetFilterRequest, IGetFilterResponse,
    IGetIdsResponse,
    IGetItemsRequest,
    IGetItemsResponse
} from "./productListApi.types.ts";

export const productListApi = {
    getIds: (): AxiosPromise<IGetIdsResponse> => {
        return axios.post("", {
            action: "get_ids",
            // params: params
        })
    },
    getItems: (params: IGetItemsRequest): AxiosPromise<IGetItemsResponse> => {
        return axios.post("", {
            action: "get_items",
            params: params
        })
    },
    getFields: (params: IGetFieldsRequest): AxiosPromise<IGetFieldsResponse> => {
        return axios.post("", {
            action: "get_fields",
            params: params
        })
    },
    productFilter: (params: IGetFilterRequest): AxiosPromise<IGetFilterResponse> => {
        return axios.post("", {
            action: "filter",
            params: params
        })
    },
}