"use client"
import { createContext, useContext, useState } from "react";

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
            { isLoading && 
                <div className="w-full h-full fixed left-0 right-0 top-0">
                    <div className="w-full bg-white h-full opacity-50"></div>
                    <div className="absolute left-0 right-0 top-0 text-center w-full">
                        <span className="flex justify-center items-center h-screen">
                            <h1 className="text-2xl font-bold">Loading...</h1>
                        </span>
                    </div>
                </div>
            }
            {children}
        </CommonContext.Provider>
    )
}

export const useCommonContext = () => useContext(CommonContext);

// export const useCommonContext = () => {
//     const context = useContext(CommonContext);
//     if (!context) {
// 		throw new Error('useCommonContext must be used within a CommonContextProvider');
// 	}

// 	return context;
// }