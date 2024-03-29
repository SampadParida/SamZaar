'use client'
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartContext } from '../../contexts/cartcontext'

interface JwtPayload {
    name: string;
    email: string;
    user_id: string;
}
interface UserState {
    name: string;
    email: string;
    user_id: string;
}

export default function Profile() {
    const router = useRouter();
    const authToken = Cookies.get('authToken');
    useEffect(() => {
        if (!authToken) {
            router.push('/login')
        }
    }, [])
    const decoded: JwtPayload | null = authToken ? jwtDecode(authToken) : null;
    const [profileData, setProfileData] = useState<UserState | null>(decoded);
    const { setCartProductList, setCartTotalNumber } = useCartContext()
    const logOut = () => {
        Cookies.remove('authToken');
        setCartProductList([]);
        setCartTotalNumber(0);
        router.push('/login');
    }
    return (
        <>
            {
                authToken &&
                <div className={'max-w-7xl container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4'}>
                    <div></div>
                    <div className={'bg-white rounded-lg px-3 py-3 mt-5 mx-3'}>
                        <h5><b>{profileData?.name}</b></h5>
                        <p>{profileData?.email}</p>
                    </div>
                    <div></div>
                    <div></div>
                    <div className={'bg-white rounded-lg px-3 py-3 mx-3'}>
                        <Link href={{ pathname: '/address/select' }}><p>Addresses</p></Link>
                    </div>
                    <div></div>
                    <div></div>
                    <div className={'bg-white rounded-lg px-3 py-3 mx-3'}>
                        <p onClick={logOut}>Log Out</p>
                    </div>
                </div>

            }
        </>
    )
}