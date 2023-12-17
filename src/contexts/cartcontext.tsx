"use client";
import { createContext, ReactNode, useContext, useState } from 'react';


// CREATE INTERFACE
interface cartContextProps {
	cartTotalNumber: number,
	cartProductList: Array,
	updatecartTotalNumber: (increment: number) => void,
	setCartProductList: (product: object) => void,
}

// CREATE CONTEXT USING INTERFACE TYPE
const CartContext = createContext<cartContextProps | undefined>(undefined);


export const CartContextProvider: React.FC = ({ children }) => {
	const [cartTotalNumber, setCartTotalNumber] = useState<number>(0);
	const updatecartTotalNumber = (increment: number) => {
    setCartTotalNumber((prevTotalNumber) => { return prevTotalNumber + increment });
  };

	const [cartProductList, setCartProductList] = useState<Array[]>([]);
	const updatecartProducts = (product: object) => {
    setCartProductList((prevProducts) => { return [...prevProducts, product] });
  };
	const contextValue: cartContextProps = {
    cartTotalNumber,
    cartProductList,
    updatecartTotalNumber,
    updatecartProducts
  };

  return <CartContext.Provider value={{cartTotalNumber, updatecartTotalNumber, cartProductList, updatecartProducts}} >{ children }</CartContext.Provider>
};


export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartContextProvider');
  }

  return context;
};

