
'use client'
import Link from 'next/link'
import React, { useState } from 'react';
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation'
import { useCartContext } from '../../contexts/cartcontext'
import Image from 'next/image';

export default function Navbar() {
	const pathnameStr = usePathname();
	const pathname = pathnameStr ? pathnameStr.replace("'", "-") : '';
	const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
	const onMobileMenuClick = () => {
		setIsMobileMenuActive(isMobileMenuActive => !isMobileMenuActive);
	}

	const { cartTotalNumber, setCartTotalNumber } = useCartContext();

	return (
		<nav className={'bg-white shadow-xl'}>
			{/* NAV BAR */}
			<div className={'max-w-7xl mx-auto px-4'} style={{ color: 'black' }}>
				<div className={'flex justify-between items-center'}>
					<div className={'flex space-x-4'}>
						<Link href={{ pathname: '/' }} className={'flex items-center py-5 px-2 space-x-1'}>
							<Image src={'/image/logo.png'} alt={'Empty cart'} width="28" height="28" className='inline-block rounded-full' />
							<span className={'font-bold'}>SamZaar</span>
						</Link>
						<div className={'hidden md:flex items-center space-x-4 '}>
							<Link href={{ pathname: '/category/jewelery' }} className={(pathname == '/category/jewelery' ? 'border-b-[3px] border-blue-400 font-semibold' : '') + " py-5 px-2 hover:text-blue-500 transition duration-300"}>Jewelery</Link>
							<Link href={{ pathname: '/category/electronics' }} className={(pathname == '/category/electronics' ? 'border-b-[3px] border-blue-400 font-semibold' : '') + ' py-5 px-2 hover:text-blue-500 transition duration-300'}>Electronics</Link>
							<Link href={{ pathname: "/category/men_clothing" }} className={(pathname == '/category/men_clothing' ? 'border-b-[3px] border-blue-400 font-semibold' : '') + ' py-5 px-2 hover:text-blue-500 transition duration-300'}>Men</Link>
							<Link href={{ pathname: "/category/women_clothing" }} className={(pathname == '/category/women_clothing' ? 'border-b-[3px] border-blue-400 font-semibold' : '') + ' py-5 px-2 hover:text-blue-500 transition duration-300'}>Women</Link>
						</div>
					</div>
					<div className={'flex items-center space-x-4'}>
						<Link href={{ pathname: '/profile' }} className={'md:inline py-5 px-2 hover:text-blue-500 transition duration-300'}>
							<svg  width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
						</Link>
						<Link href={{ pathname: '/cart' }} className={(pathname == '/cart' ? 'border-b-[3px] border-blue-400 font-semibold' : '') + ' py-5 px-2 hover:text-blue-500 transition duration-300'}>
							<span className={'flex'}>
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className={"bi bi-cart"} viewBox="0 0 16 16">
									<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
								</svg>
								<span className={'px-2'}>{cartTotalNumber}</span>
							</span>
						</Link>
						{/* MOBILE MENU CONTROLLER */}
						<div className={'md:hidden flex items-center cursor-pointer font-bold text-gray-600'} onClick={onMobileMenuClick}>
							<svg  width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
							</svg>

						</div>
					</div>

				</div>
			</div>

			{/* MOBILE MENU LIST */}
			<div className={isMobileMenuActive ? 'md:hidden' : 'hidden'}>
				<Link href={{ pathname: '/category/jewelery' }} className={'block py-3 px-4 hover:bg-gray-300 transition duration-300'}>Jewelery</Link>
				<Link href={{ pathname: '/category/electronics' }} className={'block py-3 px-4 hover:bg-gray-300 transition duration-300'}>Elctronics</Link>
				<Link href={{ pathname: "/category/men_clothing" }} className={'block py-3 px-4 hover:bg-gray-300 transition duration-300'}>Men</Link>
				<Link href={{ pathname: "/category/women_clothing" }} className={'block py-3 px-4 hover:bg-gray-300 transition duration-300'}>Women</Link>
			</div>
		</nav>
	)
}
