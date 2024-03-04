import {IProductItem} from "../../../../api/productList/productListApi.types.ts";

export interface ITable {
    isLoading: boolean
    info: {
        currentPage: number
        totalPages: number
    }
    nextPage: () => void
    prevPage: () => void
    selectPage: (page: number) => void
    data: IProductItem[]
}