'use client'
import Image from 'next/image';
import {useState, useEffect} from 'react';

import ProductCard from './components/ProductCard';

export default function Home() {
  type ApiResType = { id:number, title:string, price:number, image:string };
  const [data, setData] = useState<ApiResType[] | null>(null);
  const [isLoading, setLoading] =  useState(true)
  

  useEffect(() => {
    const { data }: any = fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}product/list?category=all`, { cache: 'force-cache' })
      .then((res) => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])


  const products = (data) ? data : [];
  return (
    <main className="flex flex-col items-center justify-between px-24 py-5">
      <h1 className={'font-bold text-5xl'}>SamZaar</h1>
      <h2>Aap ka apna Samaan Bazaar</h2>
      <hr />
      <br />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-screen max-w-7xl mx-0 px-4">
        {products.map((p) => (
          <ProductCard key={p.id} title={p.title} price={p.price} image={p.image} product_id={p._id}></ProductCard>
        ))}
      </div>
      )}
      {
        !isLoading && products.length == 0 &&
        <div className='text-center'>
          <Image src={'/image/error-sorry.jpg'} alt={'No content'} width="200" height="200" className='inline-block rounded-full' />
          <br/>
          <br/>
          <h3 className='text-2xl'>SORRY!</h3>
          <b>This filter type having no product at this moment.</b>
        </div>
      }

    </main>
  )
}
