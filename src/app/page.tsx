'use client'
import Image from 'next/image';
import {useState, useEffect} from 'react';

import ProductCard from './components/ProductCard';

async function fetchData(){
  const res = await fetch(`https://fakestoreapi.com/products`);
  return res.json();
}

// const dataPromise = fetchData()

export default function Home() {
  type ApiResType = { id:number, title:string, price:number, image:string };
  // const [data, setData] =  useState<ApiResType>({ id:0, title:'', price:0, image:'' })
  const [data, setData] = useState<ApiResType[] | null>(null);
  const [isLoading, setLoading] =  useState(true)
  

  useEffect(() => {
    const { data }: any = fetch(`https://fakestoreapi.com/products`)
      .then((res) => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])

  const ps = [1,2,3,4,5,6,7,8,9,10];
  // const products =  use(dataPromise);
  const products = (data) ? data : [];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-5">
      <h1 className={'font-bold text-5xl'}>SamZaar</h1>
      <h2>Aap ka apna Samaan Bazaar</h2>
      <hr />
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-screen max-w-7xl mx-0 px-4">
        {products.map((p) => (
          <ProductCard key={p.id} title={p.title} price={p.price} image={p.image}></ProductCard>
        ))}
      </div>
    </main>
  )
}
