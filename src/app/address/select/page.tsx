"use client"
import { useAddressContext } from "@/contexts/addresscontext"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useCommonContext } from '../../../contexts/commonContext';


interface addressProps {
    _id: string,
    state: string,
    city: string,
    address: string,
    landmark: string,
    phone: string,
    pincode: number,
    isSelected: boolean
}

const defaultAddress = {
    _id: '0',
    state: '',
    city: '',
    address: '',
    landmark: '',
    phone: '',
    pincode: 0,
    isSelected: true
}

const defaultAddressArray:[] = []

export default function SelectAddress() {
    const { isLoading, setIsLoading } = useCommonContext();
    const router = useRouter();
    const [addresses, setAddresses] = useState(defaultAddressArray);
    const [addressChangeCount, setAddressChangeCount] = useState(0)
    const fetchAndSetAddress = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}address/list`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${Cookies.get('authToken')}`,
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch addresses');
            }
            
            const data = await response.json();
            setAddresses(data);

        } catch (e) {
            setAddresses(defaultAddressArray)
        }
    };
    useEffect(() => {fetchAndSetAddress()}, [addressChangeCount])

    const { setAddress } = useAddressContext();
    const handleSelectClick = async (event: any) => {
        let selectedAddress: addressProps | undefined = addresses.find((item: addressProps) => item._id == event.target.getAttribute('data-id') as string);
        selectedAddress = selectedAddress == undefined ? defaultAddress : selectedAddress;
        if (selectedAddress && selectedAddress?._id != '0') {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}address/select/${selectedAddress?._id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${Cookies.get('authToken')}`,
                    },
                    body: JSON.stringify({ "isSelected": true })
                });
    
                if (!response.ok) {
                    throw new Error('Failed to update address');
                }
    
                const data = await response.json();
                setAddressChangeCount((prevCount) => prevCount + 1);
            } catch (error) {
                console.error('Error updating address:', error);
            }
        }
    }

    useEffect(() => {
        if (addresses) {
            const selectedAddress = addresses.find((item: addressProps) => item.isSelected === true);
            if (selectedAddress) {
                setAddress(selectedAddress);
                setIsLoading(false);
            }
        }
    }, [addresses, setAddress, setIsLoading])

    return (
        <div className="flex flex-col items-center justify-between my-5 ">
            <div className="grid grid-cols-1 w-full max-w-7xl px-4">
                <div className="px-4">
                    <h1 className="font-bold text-xl">Addresses</h1>
                    <hr className="my-3 border-gray-300" />
                    {
                        addresses && addresses.map((address: addressProps, index) => (
                            <div key={address._id} className={`p-3 rounded-lg shadow w-full mb-3 ${address.isSelected ? 'bg-blue-500 text-white' : 'bg-white border border-inherit hover:shadow-lg'}`}>
                                <div className="grid w-full grid-cols-12">
                                    <div className="col-span-10">{address.landmark && (<>{address.landmark},</>)} {address.address}, {address.city}, {address.pincode}, {address.phone}</div>
                                    <div className="col-span-2 justify-items-end">
                                        {address.isSelected ? (
                                            <p className="text-right">Selected</p>
                                        ) : (
                                            <button data-id={address._id} onClick={handleSelectClick} className="text-right w-full text-blue-500">Select</button>
                                        )}
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                    <Link href="/address/new" className={'p-3 border-2 border-blue-500 w-full rounded-lg mt-3 block text-center hover:bg-blue-100 font-bold'}>Add New Address</Link>

                </div>

            </div>
        </div>
    )
}