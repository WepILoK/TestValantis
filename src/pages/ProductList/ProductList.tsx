import "./ProductList.style.sass"
import {useEffect} from "react";
import {Table} from "./components/Table/Table.tsx";
import {removeEmpty, useProductListController} from "./ProductList.service.ts";
import {DrawerFilter} from "./components/DrawerFilter/DrawerFilter.tsx";
import {IFieldsState} from "./components/DrawerFilter/DrawerFilter.types.ts";

export const ProductList = () => {
    const {
        isLoading,
        getFilteredProductIds, getProductIds, setInfo,
        products, info
    } = useProductListController()

    const prevPage = () => {
        setInfo((prevState) => {
            const currentPage = prevState.currentPage
            return {
                ...prevState,
                currentPage: currentPage > 1 ? currentPage - 1 : 1
            }
        })
    }

    const selectPage = (page: number) => {
        setInfo((prevState) => {
            return {
                ...prevState,
                currentPage: page
            }
        })
    }

    const nextPage = () => {
        setInfo((prevState) => {
            const currentPage = prevState.currentPage
            return {
                ...prevState,
                currentPage: currentPage < prevState.totalPages ? currentPage + 1 : prevState.totalPages
            }
        })
    }

    const resetFilters = () => {
        getProductIds()
    }

    const applyFilters = (filter: IFieldsState) => {
        if (!filter.product && !filter.price && !filter.brand) {
            return
        } else {
            getFilteredProductIds(removeEmpty(filter))
        }
    }

    useEffect(() => {
        getProductIds()
    }, [])

    return (
        <div className={"product-list"}>
            <DrawerFilter
                applyFilters={applyFilters}
                resetFilters={resetFilters}
                isLoading={isLoading}
            />
            <Table
                data={products}
                isLoading={isLoading}
                info={info}
                nextPage={nextPage}
                prevPage={prevPage}
                selectPage={selectPage}
            />
        </div>
    )
}