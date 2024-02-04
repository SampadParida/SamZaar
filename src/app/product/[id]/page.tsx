'use client'
import { Metadata } from 'next'
import Image from 'next/image';
import {useState, useEffect} from 'react';
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation'
import { useCartContext } from '../../../contexts/cartcontext'
import ProductCard from '../../components/ProductCard';

// export const metadata: Metadata = {
//   title: 'Category',
// }

export default function Category() {
  const router = useRouter()
  const params = useParams();
  const productId = (params) ? params.id : 1;
  type ApiResType = {
    category: string,
    description: string,
    id: number,
    image: string,
    price: number,
    rating: object,
    title: string
  };
  const [data, setData] = useState<ApiResType|any>();
  const [isAdded, setIsAdded] = useState<Boolean|any>(false);
  const [isLoading, setLoading] =  useState(true);

  const { cartTotalNumber, updatecartTotalNumber, cartProductList, updatecartProducts, updatecartAmount } = useCartContext();
  updatecartAmount();

  const increaseCartNumber = () => {
    const newProductForCart = data;
    console.log('newProductForCart ==== ', newProductForCart)
    // You can perform any calculation here
    // updatecartTotalNumber(1);
    updatecartProducts(newProductForCart, 'add');
    setIsAdded(true)
  };

  const jumpToCart = () => {
    router.push('/cart')
  }

  useEffect(() => {
    const { data }: any = fetch(`http://localhost:3001/product/${productId}`)
      .then((res) => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [productId])

  return (
    <main className="flex flex-col items-center justify-between px-24 py-5">
      <div className={'grid grid-cols-12 gap-4 w-screen max-w-7xl mx-0 px-4'}>
        <div className={'md:col-span-4 col-span-12'}>
          <Image
              alt="The guitarist in the concert."
              src={data ? (data.image ? data.image : '') : ''}
              width={100}
              height={100}
              className="min-h-[300px] rounded-xl border-inherit shadow w-full border-inherit bg-gray-300 mx-auto"
              layout="responsive"
          />
        </div>
        <div className={'md:col-span-8 col-span-12'}>
          <h1 className={'text-3xl mb-3'}>{data ? data.title : ''}</h1>
          <h1 className={'text-2xl mb-3 font-bold'}>Rs. {data ? data.price : ''}</h1>
          {isAdded ? (
            <button onClick={jumpToCart} className={'bg-sky-500 border-0 text-white px-7 py-5 rounded-xl text-xl'}>
            View Cart</button>
          ) : (
            <button onClick={increaseCartNumber} className={'bg-sky-500 border-0 text-white px-7 py-5 rounded-xl text-xl'}>
            Add to Cart</button>
          )}
          <p className={'mt-4'}>{data ? data.description : ''}</p>
        </div>
      </div>
      
    </main>
  )
}
