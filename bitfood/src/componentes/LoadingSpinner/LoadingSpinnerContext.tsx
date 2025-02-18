import React, { createContext, useState, ReactNode } from 'react';
import { LoadingSpinnerContextProps } from './model';

const LoadingSpinnerContext = createContext<LoadingSpinnerContextProps | undefined>({ isLoading: false, start: () => {}, stop: () => {} })

const LoadingSpinnerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const [isLoading, setLoading] = useState(false);

    const start = () => {
        setLoading(true)        
    }

    const stop = () => {
        setLoading(false)
    }   

    return (
        <LoadingSpinnerContext.Provider value={{ isLoading, start, stop }}>
            {children}
        </LoadingSpinnerContext.Provider>
    )
}

export default LoadingSpinnerContext