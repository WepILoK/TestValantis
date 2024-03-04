import {InputHTMLAttributes} from "react";

export interface IAutocomplete extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    name: string
    options: string[]
}