"use client"
import { createContext, useContext, useState } from "react"

interface addressProps {
    _id: number,
    state: string,
    city: string,
    address: string,
    landmark: string,
    phone: string,
    pincode: number|string,
    isSelected: boolean|string
}

interface addressContextProps {
    address: addressProps,
    setAddress: ({}:addressProps) => void,// or we can do : React.Dispatch<React.SetStateAction<addressProps>>,
    updateInputData: (name:string, value:string|number) => void
}

const AddressContext = createContext<addressContextProps | undefined>(undefined)

export const AddressContextProvider = ({ children }: { children: React.ReactNode }) => {
    const defaultAddress = {
        _id: 0,
        state: 'Odisha',
        city: 'Jagatsinghpur',
        address: 'Dhabaleswar Colony, Tirtol',
        landmark: "Opposite to Sarala Boy's hostel",
        phone: '9583732596',
        pincode: 754137,
        isSelected: true,
    }
    const emptyAddress = {
        _id: 0,
        state: '',
        city: '',
        address: '',
        landmark: "",
        phone: '',
        pincode: '',
        isSelected: '',
    }
    const [address, setAddress] = useState<addressProps>(emptyAddress);
    const updateInputData = (name:string, value:string|number) => {
        setAddress(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };
    return <AddressContext.Provider value={{ address, setAddress, updateInputData }}> {children} </AddressContext.Provider>
}

export const useAddressContext = () => {
    const context = useContext(AddressContext);
    if (!context) {
        throw new Error('useCartContext must be used within a CartContextProvider');
    }

    return context;
};