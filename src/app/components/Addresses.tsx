"use client"
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useAddressContext } from "@/contexts/addresscontext"

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

const defaultAddressArray: [] = []

export default function Addresses() {
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
    useEffect(() => { fetchAndSetAddress() }, [addressChangeCount])

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
            }
        }
    }, [addresses, setAddress])
    return (
        <>
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
        </>
    )
}