"use client";
import { createContext, useContext, useEffect, useRef, useState } from 'react';

interface productProps {
	category: string,
	description: string,
	_id: number,
	image: string,
	price: number,
	rating: object,
	title: string
}

interface cartItemProps {
	product: productProps,
	quantity: number
}

// CREATE INTERFACE
interface cartContextProps {
	cartTotalNumber: number,
	cartProductList: cartItemProps[],
	setCartTotalNumber: (value: number) => void,
	updatecartTotalNumber: (increment: number) => void,
	updatecartProducts: (product: any) => void,
	cartTotalAmount: number,
	updatecartAmount: React.Dispatch<React.SetStateAction<number>>
}

// CREATE CONTEXT USING INTERFACE TYPE
const CartContext = createContext<cartContextProps | undefined>(undefined);


// export const CartContextProvider: React.FC = ({ children }) => {
export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [cartTotalNumber, setCartTotalNumber] = useState<number>(0);
	const updatecartTotalNumber = (increment: number) => {
		setCartTotalNumber((prevTotalNumber) => { return prevTotalNumber + increment });
	};

	const [cartTotalAmount, setCartTotalAmount] = useState<number>(0);
	const cartTotalAmountRef = useRef(cartTotalAmount);
	const updatecartAmount = () => {
		console.log('cartProductList = ', cartProductList)
		const productPrices = cartProductList.map(item => item.product.price * item.quantity);
		console.log('productPrices = ', productPrices)
		const totalPrice = productPrices.reduce((accmulator, currentValue) => {
			return accmulator + currentValue
		}, 0);
		console.log('totalPrice = ', totalPrice)
		setCartTotalAmount(totalPrice);
		console.log('cartTotalAmount > ', cartTotalAmount)
	}

	const [cartProductList, setCartProductList] = useState<cartItemProps[]>([]);
	const updatecartProducts = (product: productProps, action: 'add' | 'remove' = 'add') => {
		const existingCartItem = cartProductList.find(item => item.product._id === product._id);
		console.log('existingCartItem = ', existingCartItem)
		if (existingCartItem) {
			setCartProductList((prevCartProducts) => {
				const updatedCartList = prevCartProducts.map((item) => item.product._id === existingCartItem.product._id
					? { ...item, quantity: action === 'add' ? item.quantity + 1 : item.quantity - 1 }
					: item
				);
				return updatedCartList.filter(item => item.quantity > 0)
			})
		} else {
			setCartProductList((prevCartProducts) => { 
				console.log(prevCartProducts)
				const newProduct = { product, quantity: 1 }
				console.log('newProduct = ', newProduct)
				const addedProduct = [...prevCartProducts, newProduct,]
				console.log('addedProduct = ', addedProduct)
				return addedProduct
			});
		}

		action === 'add' ? updatecartTotalNumber(1) : updatecartTotalNumber(-1);
	};

	useEffect(() => {
		updatecartAmount();
	}, [cartProductList])

	const contextValue: cartContextProps = {
		cartTotalNumber,
		cartProductList,
		updatecartTotalNumber,
		updatecartProducts,
		setCartTotalNumber,
		cartTotalAmount,
		updatecartAmount
	};

	return <CartContext.Provider value={{
		cartTotalNumber,
		updatecartTotalNumber, cartProductList,
		updatecartProducts, setCartTotalNumber, cartTotalAmount,
		updatecartAmount
	}} >{children}</CartContext.Provider>
};


export const useCartContext = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCartContext must be used within a CartContextProvider');
	}

	return context;
};

