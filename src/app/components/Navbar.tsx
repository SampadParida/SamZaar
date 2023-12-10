
'use client'
import Link from 'next/link' 
import {useState} from 'react';
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation'


export default function Navbar() {
  const pathname = usePathname().replace("'", "-");
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const onMobileMenuClick = () => {
  	setIsMobileMenuActive(isMobileMenuActive => !isMobileMenuActive);
  }
  console.log('router.pathname ============== ', pathname)
  return (
  	<nav className={'bg-white shadow-xl'}>
  		{/* NAV BAR */}
  		<div className={'max-w-7xl mx-auto px-4'} style={{color: 'black'}}>
	  		<div className={'flex justify-between items-center'}>
	  			<div className={'flex space-x-4'}>
	  				<a href="/" className={'flex items-center py-5 px-2 space-x-1'}>
	  					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={'w-6 h-6'}>
						  <path strokeLinecap="round" className={'text-blue-500'} strokeLinejoin="round" d="M8.25 7.5l.415-.207a.75.75 0 011.085.67V10.5m0 0h6m-6 0h-1.5m1.5 0v5.438c0 .354.161.697.473.865a3.751 3.751 0 005.452-2.553c.083-.409-.263-.75-.68-.75h-.745M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span className={'font-bold'}>SamZaar</span>
	  				</a>
	  				<div className={'hidden md:flex items-center space-x-4 '}>
	  					<a href="/category/jewelery" className={(pathname == '/category/jewelery' ? 'border-b-[3px] border-blue-400 font-semibold' : '') + " py-5 px-2 hover:text-blue-500 transition duration-300"}>Jewelery</a>
	  					<a href="/category/electronics" className={(pathname == '/category/electronics' ? 'border-b-[3px] border-blue-400 font-semibold' : '') + ' py-5 px-2 hover:text-blue-500 transition duration-300'}>Electronics</a>
	  					<a href="/category/men's clothing" className={(pathname == '/category/men-s%20clothing' ? 'border-b-[3px] border-blue-400 font-semibold' : '') + ' py-5 px-2 hover:text-blue-500 transition duration-300'}>Men</a>
	  					<a href="/category/women's clothing" className={(pathname == '/category/women-s%20clothing' ? 'border-b-[3px] border-blue-400 font-semibold' : '') + ' py-5 px-2 hover:text-blue-500 transition duration-300'}>Women</a>
	  				</div>
	  			</div>
	  			<div className={'flex items-center space-x-4'}>
	  				<a href="" className={'hidden md:inline py-5 px-2 hover:text-blue-500 transition duration-300'}>Profile</a>
  					<a href="" className={' py-5 px-2 hover:text-blue-500 transition duration-300'}>Cart</a>
  					{/* MOBILE MENU CONTROLLER */}
		  			<div className={'md:hidden flex items-center cursor-pointer font-bold text-gray-600'} onClick={onMobileMenuClick}>
		  				Menu
		  			</div>
	  			</div>
	  			
  			</div>
  		</div>

  		{/* MOBILE MENU LIST */}
  		<div className={isMobileMenuActive ? 'md:hidden' : 'hidden' }>
  			<a href="/category/jewelery" className={'block py-3 px-4 hover:bg-gray-300 transition duration-300'}>Jewelery</a>
				<a href="/category/electronics" className={'block py-3 px-4 hover:bg-gray-300 transition duration-300'}>Elctronics</a>
				<a href="/category/men's clothing" className={'block py-3 px-4 hover:bg-gray-300 transition duration-300'}>Men</a>
				<a href="/category/women's clothing" className={'block py-3 px-4 hover:bg-gray-300 transition duration-300'}>Women</a>
  		</div>
  	</nav>
  	)
}
