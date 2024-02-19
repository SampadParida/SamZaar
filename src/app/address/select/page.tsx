"use client"
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Suspense, lazy, useEffect } from "react";
import Loader from "@/app/components/LoaderSuspense";
import dynamic from 'next/dynamic';

const Addresses = lazy(() => import("@/app/components/Addresses"))

export default function SelectAddress() {
    const router = useRouter();
    const authToken = Cookies.get('authToken');
    useEffect(() => {
        if (!authToken) {
            router.push('/login')
        }
    }, [])
    return (
        <div className="flex flex-col items-center justify-between my-5 ">
            <div className="grid grid-cols-1 w-full max-w-7xl px-4">
                <div className="px-4">
                    <h1 className="font-bold text-xl">Addresses</h1>
                    <hr className="my-3 border-gray-300" />
                    <Suspense fallback={<Loader />}>
                        <Addresses />
                    </Suspense>
                    <Link href="/address/new" className={'p-3 border-2 border-blue-500 w-full rounded-lg mt-3 block text-center hover:bg-blue-100 font-bold'}>Add New Address</Link>
                </div>
            </div>
        </div>
    )
}