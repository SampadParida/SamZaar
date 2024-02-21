'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from "react";

import Cookies from 'js-cookie';
import Link from 'next/link';

import { useCartContext } from '@/contexts/cartcontext';
import Image from 'next/image';



export default function Login() {
    const router = useRouter();
    const tokenInCookie = Cookies.get('authToken');
    tokenInCookie ? router.push('/profile') : false;

    const { fetchCartDetails } = useCartContext();

    const loginAction = async (formData: any) => {
        let email = formData.get('email');
        let password = formData.get('password');
        let payload = {
            "email": email, "password": password
        }
        console.log('payload = ', payload)
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
            .then((res) => {
                console.log('login res = ', res)
                return res.json()
            })
            .then(data => {
                console.log('data = ', data)
                Cookies.set('authToken', data.token, { expires: 365 })
                // document.cookie = `authToken=${data.token}; max-age=3600`;
                fetchCartDetails();
                router.push('/profile')
            })
            .catch((e)=>{
                console.log('logon error : ', e)
            })
    }
    return (
        <main className="flex flex-col items-center justify-between px-24 py-5">
            <div className={'grid grid-cols-1 gap-4 w-screen max-w-7xl mx-0 px-4'}>
                <div className={'flex justify-center items-center'} style={{ minHeight: '80vh' }}>
                <div className={'bg-white text-center px-10 py-5 rounded-lg shadow-xl'}>
                        <Image src={'/image/login.png'} alt="signup" width="150" height="150" className='inline-block' />
                        <h1 className={'text-center'}><b>PLEASE LOGIN</b></h1>
                        <br />
                        <form className={'w-full'} action={loginAction}>
                            <div className={'mb-3'}>
                                <label className={'flex'}>Email</label>
                                <input required name="email" type="email" className={'border flex w-full rounded px-2 py-3 bg-slate-100 shadow-inner'} />
                            </div>
                            <div className={'mb-5'}>
                                <label className={'flex'}>Password</label>
                                <input required name="password" type="password" className={'border flex w-full rounded px-2 py-3 bg-slate-100 shadow-inner'} />
                            </div>
                            <div>
                                <button type="submit" className={'border w-full rounded px-2 py-2 bg-blue-700 text-white items-center'}>LOG IN</button>
                            </div>
                            <div>
                                <hr className='my-4' />
                                Don&apos;t have an account?, <Link href={'/signup'} className='text-blue-700 font-bold'>Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}