"use client"
import { useAddressContext } from "@/contexts/addresscontext"
import { useEffect, useState } from "react";



interface addressProps {
    state: string,
    city: string,
    address: string,
    landmark: string,
    phone: string,
    pincode: number,
    isSelected: boolean
}
var initialAddress = [
    {
        _id: 1,
        state: 'Odisha',
        city: 'Jagatsinghpur',
        address: 'Dhabaleswar Colony, Tirtol',
        landmark: "Opposite to Sarala Boy's hostel",
        phone: '9583732596',
        pincode: 754137,
        isSelected: true
    },
    {
        _id: 2,
        state: 'Maharastra',
        city: 'Mumbai',
        address: '145/146 Powai Plazza',
        landmark: "Opposite to powai signal",
        phone: '9583732596',
        pincode: 40076,
        isSelected: false
    }
]


export default function selectAddress() {
    const [addresses, setAddresses] = useState([]);
    const [addressChangeCount, setAddressChangeCount] = useState(0)
    useEffect(() => {
        const { data }: any = fetch(`http://localhost:3001/address/list`)
            .then((res) => res.json())
            .then(data => {
                setAddresses(data)
            })
    }, [addressChangeCount])

    const { setAddress } = useAddressContext();
    const handleSelectCLick = async(event: any) => {
        let selectedAddress = addresses.find((item) => item._id == event.target.getAttribute('data-id'));
        if(selectedAddress){
            await fetch(`http://localhost:3001/address/update/${selectedAddress._id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "isSelected": true })
            })
                .then((res) => res.json())
                .then(async data => {
                    let prevSelectedAddress = addresses.find((item) => item.isSelected === true);
                    if(prevSelectedAddress){
                        await fetch(`http://localhost:3001/address/update/${prevSelectedAddress._id}`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ "isSelected": false })
                        })
                            .then((res) => res.json())
                            .then(d => {
                                setAddressChangeCount((prevCount) => prevCount + 1)
                                console.log('addressChangeCount === ', addressChangeCount)
                            })
                    }
                })
        }
    }
    
    useEffect(() => {
        console.log('here === ')
        if (addresses) {
            const selectedAddress = addresses.find((item) => item.isSelected === true);
            if (selectedAddress) {
                setAddress(selectedAddress);
            }
        }
    }, [addresses])

    return (
        <div className="flex flex-col items-center justify-between my-5 ">
            <div className="grid grid-cols-1 w-full max-w-7xl px-4">
                <div className="px-4">
                    <h1 className="font-bold text-xl">Addresses</h1>
                    <hr className="my-3 border-gray-300" />
                    {
                        addresses && addresses.map((address, index) => (
                            <div key={address._id} className={`p-3 rounded-lg shadow w-full mb-3 ${address.isSelected ? 'bg-blue-500 text-white' : 'bg-white border border-inherit hover:shadow-lg'}`}>
                                <div className="grid w-full grid-cols-12">
                                    <div className="col-span-10">{address.landmark && (<>{address.landmark},</>)} {address.address}, {address.city}, {address.pincode}, {address.phone}</div>
                                    <div className="col-span-2 justify-items-end">
                                        {address.isSelected ? (
                                            <p className="text-right">Selected</p>
                                        ) : (
                                            <button data-id={address._id} onClick={handleSelectCLick} className="text-right w-full text-blue-500">Select</button>
                                        )}
                                    </div>
                                </div>

                            </div>
                        ))
                    }

                </div>

            </div>
        </div>
    )
}