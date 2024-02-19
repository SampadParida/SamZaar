"use client"
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";





export default function SignUp() {
    const router = useRouter();
    const signUpAction = async (formData: any) => {
        let email = formData.get('email');
        let password = formData.get('password');
        let name = formData.get('name');
        let payload = {
            "email": email, "password": password, "name": name
        }
        console.log('payload = ', payload)
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
            .then((res) => res.json())
            .then(data => {
                console.log('data = ', data)
                Cookies.set('authToken', data.token, { expires: 365 })
                // document.cookie = `authToken=${data.token}; max-age=3600`;
                router.push('/profile')
            })
    }
    return (
        <main className="flex flex-col items-center justify-between px-24 py-5">
            <div className={'grid grid-cols-1 gap-4 w-screen max-w-7xl mx-0 px-4'}>
                <div className={'flex justify-center items-center'} style={{ minHeight: '80vh' }}>
                    <div className={'bg-white text-center px-10 py-10 rounded-lg shadow-xl'} style={{ 'minWidth': '500px' }}>
                        <h1 className={'text-center'}><b>CREATE AN ACCOUNT</b></h1>
                        <form className={'w-full'} action={signUpAction}>
                            <div className={'mb-3'}>
                                <label className={'flex'}>Email</label>
                                <input required name="email" type="email" className={'border flex w-full rounded px-2 py-3 bg-slate-100 shadow-inner'} />
                            </div>
                            <div className={'mb-3'}>
                                <label className={'flex'}>Name</label>
                                <input required name="name" type="text" className={'border flex w-full rounded px-2 py-3 bg-slate-100 shadow-inner'} />
                            </div>
                            <div className={'mb-5'}>
                                <label className={'flex'}>Password</label>
                                <input required name="password" type="password" className={'border flex w-full rounded px-2 py-3 bg-slate-100 shadow-inner'} />
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