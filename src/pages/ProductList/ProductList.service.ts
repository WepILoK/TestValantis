import {useEffect, useState} from "react";
import {productListApi} from "../../api/productList/productListApi.ts";
import {IGetFilterRequest, IProductItem} from "../../api/productList/productListApi.types.ts";
import {throwError} from "../../api";
import {IFilterValuesState} from "./ProductList.types.ts";

export const useProductListController = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [ids, setIds] = useState<string[]>([])
    const [products, setProducts] = useState<IProductItem[]>([])
    const [refreshCount, setRefreshCount] = useState(0)
    const [info, setInfo] = useState({
        currentPage: 1,
        totalPages: 0
    })

    const LIMIT = 50
    const OFFSET = 50

    const removeDuplicates = (items: IProductItem[]) => {
        return items.reduce((items: IProductItem[], item) => {
            if (!items.find(product => product.id == item.id)) {
                items.push(item);
            }
            return items;
        }, []);
    }

    const getProductIds = () => {
        productListApi
            .getIds()
            .then(({data}) => {
                const result = [...new Set(data.result)]
                setIds(result);
                setInfo((prevState) => ({
                    ...prevState,
                    currentPage: 1,
                    totalPages: Math.ceil(result.length / LIMIT)
                }))
            })
            .catch(({response}) => {
                if (refreshCount <= 3) {
                    getProductIds()
                    setRefreshCount(prev => prev + 1)
                }
                throwError(response)
            })
    }

    const getFilteredProductIds = (params: IGetFilterRequest) => {
        productListApi
            .productFilter({...params})
            .then(({data}) => {
                const result = [...new Set(data.result)]
                setIds(result);
                setInfo((prevState) => ({
                    ...prevState,
                    currentPage: 1,
                    totalPages: Math.ceil(result.length / LIMIT)
                }))
            })
            .catch(({response}) => {
                if (refreshCount <= 3) {
                    getFilteredProductIds(params)
                    setRefreshCount(prev => prev + 1)
                }
                throwError(response)
            })
    }

    useEffect(() => {
        const getItems = () => {
            setIsLoading(true)

            const requestIds = ids.slice(OFFSET * (info.currentPage - 1), (LIMIT * info.currentPage))
            productListApi
                .getItems({ids: requestIds})
                .then(({data}) => {
                    setProducts(removeDuplicates(data.result));
                    setIsLoading(false)
                })
                .catch(({response}) => {
                    if (refreshCount <= 3) {
                        setIsLoading(false)
                        getItems()
                        setRefreshCount(prev => prev + 1)
                    }
                    throwError(response)
                })
        }
        getItems()
    }, [info])


    return {
        getProductIds,
        getFilteredProductIds,
        setInfo,
        products,
        isLoading,
        info
    }
}

export const useFilterValues = () => {
    const [refreshCount, setRefreshCount] = useState(0)
    const [values, setValues] = useState<IFilterValuesState>({brand: [], product: []})

    useEffect(() => {
        const getFields = () => {
            productListApi
                .getFields({field: "brand"})
                .then(({data}) => {
                    const result = [...new Set(data.result)].filter((item) => !!item) as string[]
                    setValues(prevState => ({
                        ...prevState,
                        brand: result
                    }))
                })
                .catch(({response}) => {
                    if (refreshCount <= 3) {
                        getFields()
                        setRefreshCount(prev => prev + 1)
                    }
                    throwError(response)
                })
            productListApi
                .getFields({field: "product"})
                .then(({data}) => {
                    const result = [...new Set(data.result)].filter((item) => !!item) as string[]
                    setValues(prevState => ({
                        ...prevState,
                        product: result
                    }))
                })
                .catch(({response}) => {
                    if (refreshCount <= 3) {
                        getFields()
                        setRefreshCount(prev => prev + 1)
                    }
                    throwError(response)
                })
        }
        getFields()
    }, []);

    return {
        values
    }
}

export const removeEmpty = (obj: { [key: string]: any }) => {
    return Object.entries(obj).filter(([, v]) => v != null && v !== '').reduce((acc, [k, v]) => ({...acc, [k]: v}), {});
}
