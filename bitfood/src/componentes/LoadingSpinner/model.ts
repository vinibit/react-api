export interface LoadingSpinnerProps {
    id?: string
    loading?: boolean
    message?: string
}

export interface LoadingSpinnerContextProps {
    isLoading: boolean
    start: () => void
    stop: () => void    
}

export interface LoaderActions {
    start: () => void
    stop: () => void,
    status: () => boolean
}
