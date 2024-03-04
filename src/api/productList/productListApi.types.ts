//GET_IDS
export interface IGetIdsRequest {
    offset: number
    limit: number
}

export interface IGetIdsResponse {
    result: string[]
}

//GET_IDS
//=================================
//GET_ITEMS

export interface IGetItemsRequest {
    ids: string[]
}

export interface IProductItem {
    id: string
    brand: string | null
    price: number
    product: string
}

export interface IGetItemsResponse {
    result: IProductItem[]
}

//GET_ITEMS
//=================================
//GET_FIELDS

export interface IGetFieldsRequest {
    field: "brand" | "price" | "product"
    offset?: number
    limit?: number
}

export interface IGetFieldsResponse {
    result: (string | null | number)[]
}

//GET_FIELDS
//=================================
//FILTER

export interface IGetFilterRequest {
    brand?: string
    price?: number
    product?: string
}

export interface IGetFilterResponse {
    result: string[]
}

//FILTER