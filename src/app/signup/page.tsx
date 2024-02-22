"use client"
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRef, useState } from "react";





export default function SignUp() {
    const passwordRef:any = useRef(null);
    const emailRef:any = useRef(null);
    const nameRef:any = useRef(null);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const signUpAction = async (e:any) => {
        e.preventDefault();
        let passwordVal = passwordRef?.current?.value;
        let emailVal = emailRef?.current?.value;
        let nameVal = nameRef?.current?.value;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;


        if (passwordVal.length < 8) {
            setErrorMessage('Password must be at least 8 characters!');
            setTimeout(()=>{
                setErrorMessage('');
            }, 3000)
            
        } else if (!specialChars.test(passwordVal)) {
            setErrorMessage('Password must have a special character!');
            setTimeout(()=>{
                setErrorMessage('');
            }, 3000)
        } else if (passwordVal === passwordVal.toLowerCase()) {
            setErrorMessage('Password must have a capital letter!');
            setTimeout(()=>{
                setErrorMessage('');
            }, 3000)
        } else {
            let payload = {
                "email": emailVal, "password": passwordVal, "name": nameVal
            }
            console.log('payload = ', payload)
            
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/signup`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            })
                .then(async (res) => {
                    console.log('res = ', res)
                    if (!res.ok) {
                        return res.text().then(text => { throw new Error(text) })
                    }
                    return res.json()
                })
                .then(data => {
                    console.log('data = ', data)
                    Cookies.set('authToken', data.token, { expires: 365 })
                    router.push('/profile')
                })
                .catch(error => {
                    setErrorMessage(error.message);
                    setTimeout(()=>{
                        setErrorMessage('');
                    }, 3000)
                })
        }

    }
    return (
        <main className="flex flex-col items-center justify-between px-24 py-5">
            {
                errorMessage && errorMessage.length > 0 &&
                <div className="bg-red-500 px-3 py-3 fixed right-4 rounded-lg text-white shadow-xl duration-700">{errorMessage}</div>
            }
            
            <div className={'grid grid-cols-1 gap-4 w-screen max-w-7xl mx-0 px-4'}>
                <div className={'flex justify-center items-center'} style={{ minHeight: '80vh' }}>
                    <div className={'bg-white text-center px-10 py-5 rounded-lg shadow-xl'}>
                        <Image src={'/image/signup.png'} alt="signup" width="150" height="150" className='inline-block' />
                        <h1 className={'text-center'}><b>CREATE AN ACCOUNT</b></h1>
                        <br />
                        <form className={'w-full'} onSubmit={signUpAction}>
                            <div className={'mb-3'}>
                                <label className={'flex'}>Email</label>
                                <input ref={emailRef} required name="email" type="email" className={'border flex w-full rounded px-2 py-3 bg-slate-100 shadow-inner'} />
                            </div>
                            <div className={'mb-3'}>
                                <label className={'flex'}>Name</label>
                                <input ref={nameRef} required name="name" type="text" className={'border flex w-full rounded px-2 py-3 bg-slate-100 shadow-inner'} />
                            </div>
                            <div className={'mb-5'}>
                                <label className={'flex'}>Password</label>
                                <input ref={passwordRef} required name="password" type="password" className={'border flex w-full rounded px-2 py-3 bg-slate-100 shadow-inner'} />
                            </div>
                            <div>
                                <button type="submit" className={'border w-full rounded px-2 py-2 bg-blue-700 text-white items-center'}>SUBMIT</button>
                            </div>
                            <div>
                                <hr className='my-4' />
                                Already have an account?, <Link href={'/login'} className='text-blue-700 font-bold'>Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}