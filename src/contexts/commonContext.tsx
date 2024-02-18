"use client"
import { createContext, useContext, useState } from "react";
import Loader from '../app/components/Loader';

interface contextProps {
    isLoading: boolean,
    setIsLoading: (value: boolean) => void
}

const defaultLoading = {
    isLoading: false,
    setIsLoading: () => {}
}

const CommonContext = createContext<contextProps>(defaultLoading);

export const CommonContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const contextValue = {
        isLoading,
        setIsLoading
    };

    return (
        <CommonContext.Provider value={contextValue}>
            <Loader />
            {children}
        </CommonContext.Provider>
    )
}

export const useCommonContext = () => useContext(CommonContext);