'use client'
import { Metadata } from 'next'
import Image from 'next/image';
import {useState, useEffect} from 'react';
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation'
import { useCartContext } from '../../contexts/cartcontext'


export default function Category() {

  const { cartTotalNumber, updatecartTotalNumber, cartProductList, updatecartProducts } = useCartContext();

  console.log('cartProductList ======= ', cartProductList)
  const increaseCartNumber = () => {
    // const newProductForCart = data;
    updatecartTotalNumber(1);
    // updatecartProducts(newProductForCart);
  };

  return (
    <main className="flex flex-col items-center justify-between px-24 py-5">
      <div className={'grid grid-cols-12 gap-4 w-screen max-w-7xl mx-0 px-4'}>
        <div className={'col-span-12 gap-4 w-screen max-w-7xl mx-0 px-4'}>
        <h2 className={'font-bold text-2xl'}>Your Cart Items</h2>
        {
          cartProductList.map((p:any)=>(
            <div key={p.id} className={'bg-white p-3 rounded-xl border-inherit shadow items-center grid grid-cols-12 w-full my-3'}>
              <div className={'col-span-1 px-3'}>
                <Image alt={p.title} src={p.image} width={100}
                height={100} className="rounded-xl border-inherit shadow border-inherit bg-gray-300 mx-auto"/>
              </div>
              <div className={'col-span-11'}>
                <h4 className={'font-bold'}>{p.title}</h4>
                <p>{p.price}</p>
              </div>
            </div>
          ))
        }
        </div>
      </div>      
    </main>
  )
}