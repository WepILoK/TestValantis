import "./Table.style.sass"
import {Pagination} from "../Pagination/Pagination.tsx";
import {Loader} from "../Loader/Loader.tsx";
import React from "react";
import {ITable} from "./Table.types.ts";

export const Table: React.FC<ITable> = ({data, info, isLoading, nextPage, prevPage, selectPage}) => {

    const rubFormat = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
    });

    return (
        <div className={"table"}>
            <div className={"table-inner"}>
                <div className={"table-header"}>
                    <div className={"table-row"}>
                        <div className={"table-cell"}>
                            ID
                        </div>
                        <div className={"table-cell"}>
                            Название
                        </div>
                        <div className={"table-cell"}>
                            Цена
                        </div>
                        <div className={"table-cell"}>
                            Бренд
                        </div>
                    </div>
                </div>
                <div className={"table-body"}>
                    {isLoading
                        ? <div className={"table-body-loader"}>
                            <Loader/>
                        </div>
                        : <>
                            {data.map((item, index) => (
                                <div key={index} className={"table-row"}>
                                    <div className={"table-cell"}>
                                        {item.id}
                                    </div>
                                    <div className={"table-cell"}>
                                        {item.product}
                                    </div>
                                    <div className={"table-cell"}>
                                        {rubFormat.format(item.price)}
                                    </div>
                                    <div className={"table-cell"}>
                                        {item.brand}
                                    </div>
                                </div>
                            ))}
                        </>
                    }
                </div>
            </div>
            <div className={"table-footer"}>
                <Pagination
                    isLoading={isLoading}
                    info={info}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    selectPage={selectPage}
                />
            </div>
        </div>
    )
}