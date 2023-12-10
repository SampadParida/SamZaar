
'use client'
import Image from 'next/image'
import Link from 'next/link' 
import {useState} from 'react';
import { usePathname } from 'next/navigation'

export default function ProductCard({title, price, image}) {

  return (
  	<a href="#" className={'bg-white shadow hover:shadow-2xl rounded-xl transition duration-300 p-3 border-inherit cursor-pointer'}>
  		<Image
			    alt="The guitarist in the concert."
			    src={image}
			    width={100}
			    height={100}
			    className="min-h-[300px] max-h-[300px] w-full border-inherit bg-gray-300 mx-auto"
			    layout="responsive"
			/>
  		<br />
  		<h5 className={'text-gray-500'}>{title}</h5>
  		<h5>Rs. {price}</h5>
  	</a>
  	)
}
