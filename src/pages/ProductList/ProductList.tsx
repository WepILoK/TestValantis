import "./ProductList.style.sass"
import {useEffect, useState} from "react";
import {Table} from "./components/Table/Table.tsx";
import {useProductListController} from "./ProductList.service.ts";
import {DrawerFilter} from "./components/DrawerFilter/DrawerFilter.tsx";

export const ProductList = () => {
    const [isFiltered, setIsFiltered] = useState()

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

    useEffect(() => {
        getProductIds()
        // getFilteredProductIds()
    }, [])

    return (
        <div className={"product-list"}>
            <DrawerFilter/>
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