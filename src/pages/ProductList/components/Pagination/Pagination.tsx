import "./Pagination.style.sass"
import React from "react";
import {IPagination} from "./Pagination.types.ts";

export const Pagination: React.FC<IPagination> = ({info, isLoading, nextPage, prevPage, selectPage}) => {
    return (
        <div className={"pagination"}>
            <button
                className={"pagination-item"}
                disabled={info.currentPage === 1 || isLoading}
                onClick={() => {
                    prevPage()
                }}
            >
                &#9668;
            </button>

            {info.currentPage !== 1 &&
                <button
                    className={"pagination-item pagination-item-active"}
                    disabled={isLoading}
                    onClick={() => {
                        selectPage(1)
                    }}>
                    1
                </button>
            }
            <div className={"pagination-item pagination-item-current"}>
                {info.currentPage}
            </div>
            {info.currentPage !== info.totalPages && info.totalPages !== 0 &&
                <button
                    className={"pagination-item pagination-item-active"}
                    disabled={isLoading}
                    onClick={() => {
                        selectPage(info.totalPages)
                    }}>
                    {info.totalPages}
                </button>
            }
            <button
                className={"pagination-item"}
                disabled={info.currentPage === info.totalPages || isLoading || info.totalPages === 0}
                onClick={() => {
                    nextPage()
                }}
            >
                &#9658;
            </button>
        </div>
    )
}