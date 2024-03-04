import {SelectHTMLAttributes} from "react";

export interface ISelect extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string
    options: string[]
}