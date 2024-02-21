'use client'
import { Metadata } from 'next'
import Image from 'next/image';
import { useState, useEffect, Suspense, lazy } from 'react';
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation'
// import ProductCard from '../../components/ProductCard';
import { useCommonContext } from '../../../contexts/commonContext';
import Loader from '@/app/components/LoaderSuspense';

// export const metadata: Metadata = {
//   title: 'Category',
// }

const ProductCard = lazy(() => import('@/app/components/ProductCard'))

export default function Category() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  type ApiResType = { _id: number, title: string, price: number, image: string };
  const [data, setData] = useState<ApiResType[] | null>(null);
  const { isLoading, setIsLoading } = useCommonContext();

  const category = (params) ? params.name : 'jewelery';

  useEffect(() => {
    setIsLoading(true);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}product/list?category=${category}` ;
    fetch(apiUrl)
      .then((res) => res.json())
      .then(data => {
        setData(data)
        setIsLoading(false)
      })
  }, [category, setIsLoading])

  const products = (data) ? data : [];
  return (
    <main className="flex flex-col items-center justify-between px-24 py-5">
      <h1 className={'font-bold text-5xl'}>SamZaar</h1>
      <h2>Aap ka apna Samaan Bazaar</h2>
      <hr />
      <br />
      <Suspense fallback={<Loader />}>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-screen max-w-7xl mx-0 px-4">
          {products.map((p) => (
            <Suspense key={`s-${p._id}`} fallback={<Loader />}>
              <ProductCard key={p._id} title={p.title} price={p.price} image={p.image} product_id={p._id}></ProductCard>
            </Suspense>
          ))}
        </div>
      </Suspense>
    </main>
  )
}
