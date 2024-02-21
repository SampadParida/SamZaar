
'use client'
import Link from 'next/link' 
import React, { useState } from 'react';
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation'
import { useCartContext } from '../../contexts/cartcontext'

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
  		<div className={'max-w-7xl mx-auto px-4'} style={{color: 'black'}}>
	  		<div className={'flex justify-between items-center'}>
	  			<div className={'flex space-x-4'}>
	  				<Link href={{ pathname : '/' }} className={'flex items-center py-5 px-2 space-x-1'}>
	  					<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className={"bi bi-shop text-blue-500 mx-1"} viewBox="0 0 16 16">
							  <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z"/>
							</svg>
						<span className={'font-bold'}>SamZaar</span>
	  				</Link>
	  				<div className={'hidden md:flex items-center space-x-4 '}>
	  					<Link href={{ pathname : '/category/jewelery' }} className={(pathname == '/category/jewelery' ? 'border-b-[3px] border-blue-400 font-semibold' : '') + " py-5 px-2 hover:text-blue-500 transition duration-300"}>Jewelery</Link>
	  					<Link href={{ pathname : '/category/electronics' }} className={(pathname == '/category/electronics' ? 'border-b-[3px] border-blue-400 font-semibold' : '') + ' py-5 px-2 hover:text-blue-500 transition duration-300'}>Electronics</Link>
	  					<Link href={{ pathname : "/category/men_clothing" }} className={(pathname == '/category/men_clothing' ? 'border-b-[3px] border-blue-400 font-semibold' : '') + ' py-5 px-2 hover:text-blue-500 transition duration-300'}>Men</Link>
	  					<Link href={{ pathname : "/category/women_clothing" }} className={(pathname == '/category/women_clothing' ? 'border-b-[3px] border-blue-400 font-semibold' : '') + ' py-5 px-2 hover:text-blue-500 transition duration-300'}>Women</Link>
	  				</div>
	  			</div>
	  			<div className={'flex items-center space-x-4'}>
	  				<Link href={{ pathname : '/profile' }} className={'hidden md:inline py-5 px-2 hover:text-blue-500 transition duration-300'}>Profile</Link>
  					<Link href={{ pathname : '/cart' }} className={(pathname == '/cart' ? 'border-b-[3px] border-blue-400 font-semibold' : '') + ' py-5 px-2 hover:text-blue-500 transition duration-300'}>
  						<span className={'flex'}>
	  						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className={"bi bi-cart"} viewBox="0 0 16 16">
								  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
								</svg>
								<span className={'px-2'}>{cartTotalNumber}</span>
							</span>
  					</Link>
  					{/* MOBILE MENU CONTROLLER */}
		  			<div className={'md:hidden flex items-center cursor-pointer font-bold text-gray-600'} onClick={onMobileMenuClick}>
		  				Menu
		  			</div>
	  			</div>
	  			
  			</div>
  		</div>

  		{/* MOBILE MENU LIST */}
  		<div className={isMobileMenuActive ? 'md:hidden' : 'hidden' }>
  			<Link href={{ pathname : '/category/jewelery' }} className={'block py-3 px-4 hover:bg-gray-300 transition duration-300'}>Jewelery</Link>
				<Link href={{ pathname : '/category/electronics' }} className={'block py-3 px-4 hover:bg-gray-300 transition duration-300'}>Elctronics</Link>
				<Link href={{ pathname : "/category/men's clothing" }} className={'block py-3 px-4 hover:bg-gray-300 transition duration-300'}>Men</Link>
				<Link href={{ pathname : "/category/women's clothing" }} className={'block py-3 px-4 hover:bg-gray-300 transition duration-300'}>Women</Link>
  		</div>
  	</nav>
  	)
}
