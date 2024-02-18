"use client"
import Cookies from 'js-cookie';
import Image from 'next/image';
import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation'

import { useCartContext } from '../../contexts/cartcontext'
import { useAddressContext } from '../../contexts/addresscontext'
import { useCommonContext } from '../../contexts/commonContext';

declare global {
  interface Window {
    Razorpay: any; // Use 'any' if you're not specifying a detailed type
  }
}
interface order {
  id: string,
  entity: string,
  amount: number,
  amount_paid: number,
  amount_due: number,
  currency: string,
  receipt: string,
  offer_id: string | null,
  status: string,
  attempts: number,
  notes: any,
  created_at: number
}

export default function Category() {
  const [orderData, setOrderData] = useState<order | null>(null);
  const { cartProductList, updatecartProducts, cartTotalAmount } = useCartContext();
  const { address, setAddress } = useAddressContext();
  const { isLoading, setIsLoading } = useCommonContext();

  const fetchSelectedAddress = useCallback(async () => {
    setIsLoading(true)
    const aToken = `JWT ${Cookies.get('authToken')}`;
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}address/selected`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "authorization": aToken,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch selected address');
        }
        return response.json();
      })
      .then(data => {
        setAddress(data);
      })
      .catch(error => {
        console.error('Error fetching selected address:', error);
      })
      .finally(() => {
        setIsLoading(false)
      })
      ;
  }, [setAddress, setIsLoading]);

  useEffect(() => {
    if (address._id === 0) {
      fetchSelectedAddress()
    }
  }, [address._id, fetchSelectedAddress])


  const addItem = (event: any) => {
    const productId = event.target.getAttribute('data-id');
    const product = cartProductList.find(item => item.product._id === productId);
    updatecartProducts(product?.product, 1, 'add');
  };

  const removeItem = (event: any) => {
    const productId = event.target.getAttribute('data-id');
    const product = cartProductList.find(item => item.product._id === productId)
    updatecartProducts(product?.product, 1, 'remove')
  }

  const payload = {}
  const handlePayment = async (event: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}order/create`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then(data => {
        console.log('data = ', data)
        const od: order = data;
        setOrderData(od)
      })

    var options = {
      "key": "rzp_test_muETAI3mfibeyR", // Enter the Key ID generated from the Dashboard
      "amount": "5000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "SamZaar", //your business name
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": orderData?.id || null, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (resp: any) {
        alert(resp.razorpay_payment_id);
        alert(resp.razorpay_order_id);
        alert(resp.razorpay_signature)
      },
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
        "address": "SamZaar Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const razorpayButton = new window.Razorpay(options);
      razorpayButton.on('payment.failed', function (response: any) {
        alert('Payment failed: ' + response.error.code + ' - ' + response.error.description);
      });

      razorpayButton.open();
    }


  }

  const routr = useRouter()
  const handleChangeCLick = () => {
    routr.push('/address/select')
  }
  return (
    <>
      <Head>
        <script async src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Head>

      <main className="flex flex-col items-center justify-between md:px-24 py-5">
        <div className={'grid grid-cols-6 max-w-7xl mx-0 px-4 w-full'}>
          <div className={'col-span-12 mx-0 px-4'}>
            <div className={'bg-white rounded-xl border-inherit shadow my-3 p-3'}>
              <b>Delivering to</b>
              <hr className={'my-3'} />
              <div className={'grid grid-cols-4'}>
                <div className={'col-span-3'}>
                  {address.landmark}, {address.address}, {address.city}, {address.pincode}, {address.phone}
                </div>
                <div className={'col-span-1 justify-items-end'}>
                  <div className={'flex justify-end'}>
                    <button onClick={handleChangeCLick} className={'border rounded-lg px-3 py-2 shadow border-blue-500 text-blue-500 text-sm'}>Change</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={'col-span-12 mx-0 px-4'}>
            <h2 className={'font-bold text-xl'}>Your Cart Items</h2>
            <div className="grid md:grid-cols-4 grid-cols-1 gap-4 mx-0">
              <div className='md:col-span-3'>
                {
                  cartProductList.map((p: any) => (
                    <div key={p.product._id} className={'bg-white p-3 rounded-xl border-inherit shadow items-center grid grid-cols-12 w-full my-3'}>
                      <div className={'col-span-1 px-3'}>
                        <Image alt={p.product.title} src={p.product.image} width={100}
                          height={100} className="rounded-xl border-inherit shadow border-inherit bg-gray-300 mx-auto" />
                      </div>
                      <div className={'col-span-8'}>
                        <h4 className={'font-bold'}>{p.product.title}</h4>
                        <p>Rs.{p?.product?.price}</p>
                      </div>
                      <div className={'col-span-3 text-xl justify-items-end'}>
                        <div className={'flex justify-end'}>
                          <button data-id={p.product._id} onClick={removeItem} className={'border-inherit shadow-md rounded-md px-3'}>-</button>
                          <p className={'px-2'}>{p.quantity}</p>
                          <button data-id={p.product._id} onClick={addItem} className={'border-inherit shadow-md rounded-md px-3'}>+</button>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div>
                <div className={'bg-white rounded-xl border-inherit shadow p-3 my-3'}>
                  <h2 className={'font-bold text-xl'}>Place Order</h2>
                  <hr className={'my-3'} />
                  <h1 className={''}>Total Amount : Rs.<b>{cartTotalAmount}</b></h1>
                  <button className={'bg-blue-600 text-white px-5 py-3 rounded-lg my-3 w-full'} onClick={handlePayment}>Pay Now</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}