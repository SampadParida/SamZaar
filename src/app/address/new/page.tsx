"use client"
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export default function NewAddress() {
    const router = useRouter();
    const handleFormSubmission = async (formData:any) => {
        const payload = {
            "address" : formData.get('address'),
            "landmark" : formData.get('landmark'),
            "state" : formData.get('state'),
            "city" : formData.get('city'),
            "pincode" : formData.get('pincode'),
            "phone" : formData.get('phone'),
            "isSelected" : false
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}address/create`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${Cookies.get('authToken')}`,
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Failed to update address');
            }

            const data = await response.json();
            router.push('/address/select')
        } catch (error) {
            console.error('Error updating address:', error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-between my-5">
            <div className="grid grid-cols-1 w-full px-4 max-w-7xl">
                <div className="px-2 md:px-4">
                    <div className="grid md:grid-cols-4 grid-cols-1">
                        <div></div>
                        <div className="md:col-span-2">
                            <h1 className="font-bold text-center">New Address</h1>
                            <br />
                            <div className="p-4 rounded-lg bg-white shadow">
                                <form action={handleFormSubmission}>
                                    <div className={'mb-3'}>
                                        <label className={'flex'}>Address</label>
                                        <input required type="text" placeholder="Enter address" name="address" className="border flex w-full rounded px-2 py-3 bg-slate-100" />
                                    </div>
                                    <div className={'mb-3'}>
                                        <label className={'flex'}>Landmark</label>
                                        <input required type="text" placeholder="Any landmark" name="landmark" className="border flex w-full rounded px-2 py-3 bg-slate-100" />
                                    </div>
                                    <div className="flex flex-1 gap-4">
                                        <div className={'mb-3 grow'}>
                                            <label className={'flex'}>State</label>
                                            <input required type="text" placeholder="State" name="state" className="border flex w-full rounded px-2 py-3 bg-slate-100" />
                                        </div>
                                        <div className={'mb-3 grow'}>
                                            <label className={'flex'}>City</label>
                                            <input required type="text" placeholder="City" name="city" className="border flex w-full rounded px-2 py-3 bg-slate-100" />
                                        </div>
                                    </div>
                                    <div className="flex flex-1 gap-4">
                                        <div className={'mb-3 grow'}>
                                            <label className={'flex'}>Pincode</label>
                                            <input required type="text" placeholder="Pincode" name="pincode" className="border flex w-full rounded px-2 py-3 bg-slate-100" />
                                        </div>
                                        <div className={'mb-3 grow'}>
                                            <label className={'flex'}>Phone</label>
                                            <input required type="text" placeholder="Phone" name="phone" className="border flex w-full rounded px-2 py-3 bg-slate-100" />
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" className={'border w-full rounded px-2 py-2 bg-blue-500 text-white items-center'}>CREATE ADDRESS</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}