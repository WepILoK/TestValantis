export interface IDrawerFilter {
    applyFilters: (filter: IFieldsState) => void
    resetFilters: () => void
    isLoading: boolean
}

export interface IFieldsState {
    brand?: string
    product?: string
    price?: number | string
}