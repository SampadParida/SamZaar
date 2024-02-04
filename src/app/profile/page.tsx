'use client'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useState } from 'react';

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

export default function profile() {
    const router = useRouter()
    const authToken = Cookies.get('authToken');
    const decoded:JwtPayload = jwtDecode(authToken);
    console.log('decoded ==== ', decoded)
    const userData = {
        "name" : decoded['name'],
        "email" : decoded['email'],
        "user_id" : decoded['user_id'],
    }

    const [profileData, setProfileData] = useState<UserState>(decoded)
    // !authToken ? router.push('/login') : false
    return (
        <div className={'max-w-7xl container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4'}>
            <div></div>
            <div className={'bg-white rounded-lg px-3 py-3 mt-5 mx-3'}>
                <h5><b>{profileData.name}</b></h5>
                <p>{profileData.email}</p>
            </div>
        </div>
    )
}