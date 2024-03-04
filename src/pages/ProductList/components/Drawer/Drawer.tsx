import "./Drawer.style.sass"
import React from "react";

interface IDrawer {
    isOpenDrawer: boolean
    onCloseDrawer: () => void
    children: React.ReactNode
}

export const Drawer: React.FC<IDrawer> = ({isOpenDrawer, onCloseDrawer, children}) => {

    return (
        <div className={"drawer"}>
            <div
                className={`drawer-shadow${isOpenDrawer ? "" : " drawer-shadow-hidden"}`}
                onClick={() => {
                    onCloseDrawer()
                }}
            />
            <div
                className={`drawer-body${isOpenDrawer ? " drawer-body-show" : " drawer-body-hidden"}`}
            >
                <div className={"drawer-close"}>
                    <button
                        onClick={() => {
                            onCloseDrawer()
                        }}
                    >
                        Закрыть
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}