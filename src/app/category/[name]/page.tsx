'use client'
import { Metadata } from 'next'
import Image from 'next/image';
import {useState, useEffect} from 'react';
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation'
import ProductCard from '../../components/ProductCard';

// export const metadata: Metadata = {
//   title: 'Category',
// }

export default function Category() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  type ApiResType = { id:number, title:string, price:number, image:string };
  const [data, setData] = useState<ApiResType[] | null>(null);
  const [isLoading, setLoading] =  useState(true);
  
  const name = (params) ? params.name : 'jewelery';
  

  useEffect(() => {
    const { data }: any = fetch(`https://fakestoreapi.com/products/category/${name}`, { cache: 'force-cache' })
      .then((res) => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [name])

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
          <ProductCard key={p.id} title={p.title} price={p.price} image={p.image} product_id={p.id}></ProductCard>
        ))}
      </div>
      )}
    </main>
  )
}
