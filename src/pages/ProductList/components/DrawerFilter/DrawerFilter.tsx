import {Drawer} from "../Drawer/Drawer.tsx";
import {Input} from "../Input/Input.tsx";
import {Select} from "../Select/Select.tsx";
import {Autocomplete} from "../Autocomplete/Autocomplete.tsx";
import React, {useState} from "react";
import {useFilterValues} from "../../ProductList.service.ts";
import "./DrawerFilter.style.sass"
import {IDrawerFilter, IFieldsState} from "./DrawerFilter.types.ts";

export const DrawerFilter: React.FC<IDrawerFilter> = ({applyFilters, resetFilters, isLoading}) => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [fields, setFields] = useState<IFieldsState>({})
    const {values} = useFilterValues()

    const clearFilterValues = () => {
        resetFilters()
        setFields({
            brand: "",
            product: "",
            price: "",
        })
    }

    const submitFilter = () => {
        applyFilters(fields)
    }

    return (
        <div className={"drawer-filter"}>
            <Drawer
                isOpenDrawer={isOpenDrawer}
                onCloseDrawer={() => {
                    setIsOpenDrawer(false)
                }}
            >
                <div className={"drawer-filter-inner"}>
                    <Input
                        label={"Цена"}
                        name={"price"}
                        value={fields.price}
                        onChange={(e) => {
                            const value = Number(e.target.value)
                            setFields((prevState) => ({
                                ...prevState,
                                price: value === 0 ? "" : value
                            }))
                        }}
                    />
                    <Select
                        label={"Бренд"}
                        name={"brand"}
                        options={values.brand}
                        value={fields.brand}
                        onChange={(e) => {
                            const value = e.currentTarget.value
                            setFields((prevState) => ({
                                ...prevState,
                                brand: value === "Не выбрано" ? "" : value
                            }))
                        }}
                    />
                    <Autocomplete
                        className={"drawer-filter-autocomplete"}
                        label={"Название"}
                        name={"product"}
                        options={values.product}
                        value={fields.product}
                        onChange={(e) => {
                            const value = e.currentTarget.value
                            setFields((prevState) => ({
                                ...prevState,
                                product: value === "Не выбрано" ? "" : value
                            }))
                        }}
                    />
                    <button
                        disabled={isLoading}
                        onClick={() => {
                            submitFilter()
                        }}
                    >
                        Применить
                    </button>
                    <div className={"product-list-delimiter"}/>
                    <button
                        disabled={isLoading}
                        onClick={() => {
                            clearFilterValues()
                        }}
                    >
                        Сбрость
                    </button>
                </div>
            </Drawer>
            <button
                disabled={isLoading}
                onClick={() => {
                    setIsOpenDrawer(true)
                }}
            >
                Фильтры
            </button>
            <div className={"drawer-filter-delimiter"}/>
            <button
                disabled={isLoading}
                onClick={() => {
                    clearFilterValues()
                }}
            >
                Сбрость
            </button>
        </div>
    )
}