"use client";
import { createContext, ReactNode, useContext, useState } from 'react';

interface productProps{
	category: string,
	description: string,
	id: number,
	image: string,
	price: number,
	rating: object,
	title: string
}

// CREATE INTERFACE
interface cartContextProps {
	cartTotalNumber: number,
	cartProductList: productProps[],
	setCartTotalNumber: (value: number) => void,
	updatecartTotalNumber: (increment: number) => void,
	updatecartProducts: (product: any) => void,
}

// CREATE CONTEXT USING INTERFACE TYPE
const CartContext = createContext<cartContextProps | undefined>(undefined);


// export const CartContextProvider: React.FC = ({ children }) => {
export const CartContextProvider = ( {children} : {children: React.ReactNode} ) => {
	const [cartTotalNumber, setCartTotalNumber] = useState<number>(0);
	const updatecartTotalNumber = (increment: number) => {
    setCartTotalNumber((prevTotalNumber) => { return prevTotalNumber + increment });
  };

	const [cartProductList, setCartProductList] = useState<productProps[]>([]);
	const updatecartProducts = (product: productProps) => {
    setCartProductList((prevProducts) => { return [...prevProducts, product] });
  };
	const contextValue: cartContextProps = {
    cartTotalNumber,
    cartProductList,
    updatecartTotalNumber,
    updatecartProducts,
    setCartTotalNumber
  };

  return <CartContext.Provider value={{cartTotalNumber, updatecartTotalNumber, cartProductList, updatecartProducts, setCartTotalNumber}} >{ children }</CartContext.Provider>
};


export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartContextProvider');
  }

  return context;
};

