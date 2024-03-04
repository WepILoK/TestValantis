import "./Select.style.sass"
import {ISelect} from "./Select.types.ts";
import React from "react";

export const Select: React.FC<ISelect> = ({label, options, ...rest}) => {
    return (
        <div className={"select-wrapper"}>
            <label>
                {label}
            </label>
            <select {...rest}>
                <option value={""}></option>
                {options.map((item) => (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>
        </div>
    )
}