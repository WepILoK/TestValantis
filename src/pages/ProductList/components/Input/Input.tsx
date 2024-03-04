import "./Input.style.sass"
import {IInput} from "./Input.types.ts";
import React from "react";

export const Input: React.FC<IInput> = ({label, name, ...rest}) => {
    return (
        <div className={"input-wrapper"}>
            <label htmlFor={name}>
                {label}
            </label>
            <input
                id={name}
                type="number"
                {...rest}
            />
        </div>
    )
}