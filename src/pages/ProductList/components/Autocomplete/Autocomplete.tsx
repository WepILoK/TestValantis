import "./Autocomplete.style.sass"
import {IAutocomplete} from "./Autocomplete.types.ts";
import React from "react";

export const Autocomplete: React.FC<IAutocomplete> = ({label, options, name, ...rest}) => {
    return (
        <div className={"autocomplete-wrapper"}>
            <label htmlFor={name}>
                {label}
            </label>
            <input
                type="text"
                id={name}
                list={`list_${name}`}
                {...rest}
            />
            <datalist id={`list_${name}`}>
                <option>Не выбрано</option>
                {options.map((item) => (
                    <option key={item} value={item}/>
                ))}
            </datalist>
        </div>
    )
}