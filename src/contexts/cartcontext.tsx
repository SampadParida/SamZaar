"use client";
import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';
import { useCommonContext } from './commonContext';

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

interface cartProductProps {
	product_id: string,
	quantity: number,
	amount: number,
	_id: string
}

// CREATE INTERFACE
interface cartContextProps {
	fetchCartDetails: ()=>void,
	cartTotalNumber: number,
	cartProductList: cartItemProps[],
	setCartProductList: (value: []) => void,
	setCartTotalNumber: (value: number) => void,
	updatecartTotalNumber: (increment: number) => void,
	updatecartProducts: (product: any, quantity: number | 1, action: 'remove' | 'add') => void,
	cartTotalAmount: number,
	updatecartAmount: React.Dispatch<React.SetStateAction<number>>
}

// CREATE CONTEXT USING INTERFACE TYPE
const CartContext = createContext<cartContextProps | undefined>(undefined);


// export const CartContextProvider: React.FC = ({ children }) => {
export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
	const { isLoading, setIsLoading } = useCommonContext();
	const [cartTotalNumber, setCartTotalNumber] = useState<number>(0);
	const updatecartTotalNumber = (increment: number) => {
		setCartTotalNumber((prevTotalNumber) => { return prevTotalNumber + increment });
	};

	const [cartTotalAmount, setCartTotalAmount] = useState<number>(0);
	const [cartProductList, setCartProductList] = useState<cartItemProps[]>([]);
	const updatecartAmount = () => {
		const productPrices = cartProductList.map(item => item.product.price * item.quantity);
		const totalPrice = productPrices.reduce((accmulator, currentValue) => {
			return accmulator + currentValue
		}, 0);
		setCartTotalAmount(totalPrice);
	}

	const updatecartProducts = async (product: productProps, quantity: number = 1, action: 'add' | 'remove' = 'add', callApi: boolean = true) => {
		if (callApi) {
			// setIsLoading(true)
			const payload = {
				"product_id": product?._id,
				"quantity": 1,
				"amount": product?.price,
				"action": action
			}
			const AddressResp = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}cart/update`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `JWT ${Cookies.get('authToken')}`,
				},
				body: JSON.stringify(payload)
			});
			const RespData = await AddressResp.json();
			// setIsLoading(false)
		}
		const existingCartItem = cartProductList.find(item => item.product._id === product._id);
		if (existingCartItem) {
			setCartProductList((prevCartProducts) => {
				const updatedCartList = prevCartProducts.map((item) => item.product._id === existingCartItem.product._id
					? { ...item, quantity: action === 'add' ? item.quantity + quantity : item.quantity - quantity }
					: item
				);
				return updatedCartList.filter(item => item.quantity > 0)
			})
		} else {
			setCartProductList((prevCartProducts) => {
				const newProduct = { product, quantity: quantity }
				const addedProduct = [...prevCartProducts, newProduct,]
				return addedProduct
			});
			action === 'add' ? updatecartTotalNumber(1) : updatecartTotalNumber(-1);
		}
	};

	const fetchCartDetails = async () => {
		let token = Cookies.get('authToken');
		if (token) {
			try {
				// setIsLoading(true)
				const cartRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}cart/details`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						"Authorization": `JWT ${token}`,
					}
				});
				const RespData = await cartRes.json();
				RespData.cart.products.map((p: cartProductProps, index: Number) => {
					let product: any = p?.product_id;
					let quantity: number = p?.quantity;
					updatecartProducts(product, quantity, 'add', false);
				})

			} catch (e) {
			}
		}
	}

	useEffect(() => {
		fetchCartDetails()
	}, [])

	useEffect(() => {
		updatecartAmount();
	}, [cartProductList])

	const contextValue: cartContextProps = {
		fetchCartDetails,
		cartTotalNumber,
		cartProductList,
		setCartProductList,
		updatecartTotalNumber,
		updatecartProducts,
		setCartTotalNumber,
		cartTotalAmount,
		updatecartAmount
	};

	return <CartContext.Provider value={contextValue} >{children}</CartContext.Provider>
};


export const useCartContext = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCartContext must be used within a CartContextProvider');
	}

	return context;
};

