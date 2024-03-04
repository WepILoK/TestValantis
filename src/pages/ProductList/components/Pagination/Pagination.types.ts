export interface IPagination {
    info: {
        currentPage: number
        totalPages: number
    }
    isLoading: boolean
    nextPage: () => void
    prevPage: () => void
    selectPage: (page: number) => void
}