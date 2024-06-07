"use client"
import { useEffect, useState } from 'react';
import crypto from 'crypto';
import { useRouter } from 'next/navigation';
import { Button } from 'antd';


function CreatePayment() {
   const router = useRouter()
  const [loadings, setLoadings] = useState<boolean[]>([]);



   const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  }
    
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
            console.log('Razorpay script loaded.');
        };
        document.body.appendChild(script);
    }, []);

    const handlePayment = async (price: number) => {
        enterLoading(0)
        const response = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: price }),
        });

        const data = await response.json();
        console.log("Order created", data);
        const options = {
            key_id: process.env.RAZORPAY_KEY,
            amount: data.amount, // amount in paisa
            currency: 'INR',
            name: 'seek-solution',
            description: 'Test Payment',
            image: '/your_logo.png',
            order_id: data.id, // Use the order ID from your server
            handler: async function  (response: any) {
                // alert(response.razorpay_payment_id);
                console.log("payment details-------", response);
              const verify =  await verification(response,)
                            console.log("verify",verify);
                            
            },
            prefill: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                contact: '9999999999',
            },
            notes: {
                address: 'Razorpay Corporate Office',
            },
            theme: {
                color: '#3399cc',
            },
        };
        const rzp = new window.Razorpay(options);
        setLoadings([false])
        rzp.open();
    };


    const verification = async (res: any) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = res;
        console.log(process.env.RAZORPAY_SECRET);
        const generated_signature = crypto.createHmac('sha256', "rvjerOwMvzVBP3ee93kFuWC0")
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');
        if (generated_signature === razorpay_signature) {
            console.log("Payment is successful");
            const searchParam = new URLSearchParams({
               id: razorpay_payment_id
              });
            router.push(`/status?${searchParam.toString()}`)
            return true;
        }
    }

    return (
        <div>
            <div>
                <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
                    <div className="flex flex-col justify-start items-start w-full space-y-9">
                        <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
                            <div className="xl:w-3/5 flex flex-col sm:flex-row xl:flex-col justify-center items-center bg-gray-100 dark:bg-gray-800 py-7 sm:py-0 xl:py-10 px-10 xl:w-full">
                                <div className="flex flex-col justify-start items-start w-full space-y-4"></div>
                                <div className="mt-6 sm:mt-0 xl:my-10 xl:px-20 w-52 sm:w-96 xl:w-auto">
                                    <img
                                        src="https://i.ibb.co/0GFzTP4/Rectangle-131.png"
                                        alt="headphones"
                                    />
                                </div>
                            </div>
                            <div className="p-8 bg-gray-100 dark:bg-gray-800 flex flex-col lg:w-full xl:w-3/5">
                                <button className="border border-transparent hover:border-gray-300 bg-gray-900 dark:bg-white dark:hover:bg-gray-900 dark:hover:border-gray-900 dark:text-gray-900 dark:hover:text-white hover:bg-white text-white hover:text-gray-900 flex flex-row justify-center items-center space-x-2 py-4 rounded w-full">
                                    <div>
                                        <svg className="fill-current" width="16" height="16">
                                            <path
                                                d="M10.9099 4.27692C9.6499 4.27692 9.1174 4.87817 8.2399 4.87817C7.34021 4.87817 6.65396 4.28129 5.56208 4.28129C4.49333 4.28129 3.35365 4.93379 2.6299 6.04535C1.61365 7.61285 1.78615 10.565 3.43208 13.08C4.02083 13.9804 4.80708 14.99 5.83833 15.001H5.85708C6.75333 15.001 7.01958 14.4141 8.25302 14.4072H8.27177C9.48677 14.4072 9.73052 14.9975 10.623 14.9975H10.6418C11.673 14.9866 12.5015 13.8679 13.0902 12.971C13.514 12.326 13.6715 12.0022 13.9965 11.2725C11.6155 10.3688 11.233 6.99348 13.5877 5.69942C12.869 4.79942 11.859 4.27817 10.9068 4.27817L10.9099 4.27692Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M10.6338 1C9.88379 1.05094 9.00879 1.52844 8.49629 2.15188C8.03129 2.71688 7.64879 3.555 7.79879 4.36781H7.85879C8.65754 4.36781 9.47504 3.88688 9.95254 3.27063C10.4125 2.68406 10.7613 1.85281 10.6338 1V1Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-base leading-4">Pay</p>
                                    </div>
                                </button>
                                <div className="flex flex-row justify-center items-center mt-6">
                                    <hr className="border w-full" />
                                    <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600 dark:text-white">
                                        or pay with card
                                    </p>
                                    <hr className="border w-full" />
                                </div>
                                <div className="mt-8">
                                    <input
                                        className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                                        type="email"
                                        name=""
                                        id=""
                                        placeholder="Email"
                                    />
                                </div>
                                <label className="mt-8 text-base leading-4 text-gray-800 dark:text-gray-50">
                                    Card details
                                </label>
                                <div className="mt-2 flex-col">
                                    <div>
                                        <input
                                            className="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                                            type="email"
                                            name=""
                                            id=""
                                            placeholder="0000 1234 6549 15151"
                                        />
                                    </div>
                                    <div className="flex-row flex">
                                        <input
                                            className="border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                                            type="email"
                                            name=""
                                            id=""
                                            placeholder="MM/YY"
                                        />
                                        <input
                                            className="border rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                                            type="email"
                                            name=""
                                            id=""
                                            placeholder="CVC"
                                        />
                                    </div>
                                </div>
                                <label className="mt-8 text-base leading-4 text-gray-800 dark:text-gray-50">
                                    Name on card
                                </label>
                                <div className="mt-2 flex-col">
                                    <div>
                                        <input
                                            className="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                                            type="email"
                                            name=""
                                            id=""
                                            placeholder="Name on card"
                                        />
                                    </div>
                                </div>
                                <label className="mt-8 text-base leading-4 text-gray-800 dark:text-gray-50">
                                    Country or region
                                </label>
                                <div className="mt-2 flex-col">
                                    <div className="relative">
                                        <button
                                            id="changetext"
                                            className="text-left border rounded-tr rounded-tl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600 bg-white"
                                        >
                                            United States
                                        </button>
                                    </div>
                                    <input
                                        className="border rounded-bl rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="ZIP"
                                    />
                                </div>
                                <Button
                                    loading={loadings[0]} 
                                    onClick={() => handlePayment(2999)}
                                    className="mt-8 border border-transparent hover:border-gray-300 dark:bg-white dark:hover:bg-gray-900 dark:text-gray-900 dark:hover:text-white dark:border-transparent bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-5 rounded w-full">
                                    <div>
                                        <p className="text-base leading-4">Pay Amount 2999</p>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default CreatePayment;
