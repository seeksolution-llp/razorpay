"use client"

import React, { useEffect } from 'react';



const Subscription = () => {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded.');
    };
    document.body.appendChild(script);
  }, []);

  const handler = async (planId:string,amount:number) => {

    const response = await fetch('/api/subscription', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plan_id: planId, price: amount }),
  });

  const data = await response.json();
  console.log("Order created", data);



    


    const options = {
      key: "rzp_test_vdU9Qfx2T0VMp6",
      subscription_id: data.id,
      name: "Seek solution.",
      description: "Monthly Test Plan",
      image: "/your_logo.jpg",
      handler: function (response: any) {
        console.log("callback function after payment-----", response);

      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "+919876543210"
      },
      notes: {
        note_key_1: "Tea. Earl Grey. Hot",
        note_key_2: "Make it so."
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp1 = await new window.Razorpay(options);
     await rzp1.open();
  }




  return (
    // <div className="flex justify-center items-center h-screen bg-gray-100">
    //   <div className="grid grid-cols-3 gap-8">
    //     <SubscriptionCard
    //       planName="brown Plan"
    //       price="100"
    //       details="Lorem ipsum dolor sit amet."
    //       buttonText="Checkout"
    //       handlePayment={() => handler()}
    //     />
    //     <SubscriptionCard
    //       planName="Silver Plan"
    //       price="200"
    //       details="Lorem ipsum dolor sit amet."
    //       buttonText="Checkout"
    //       handlePayment={() => handler()}
    //     />
    //     <SubscriptionCard
    //       planName="Gold Plan"
    //       price="300"
    //       details="Lorem ipsum dolor sit amet."
    //       buttonText="Checkout"
    //       handlePayment={() => handler()}
    //     />
    //   </div>
    // </div>
    <div>
      <main className="max-w-6xl mx-auto pt-10 pb-36 px-8">
        <h1 className="text-lg font-bold">Your Subscription</h1>
        <p className="my-2">
          Aliquam sagittis sapien in nibh tincidunt fermentum. Morbi eleifend
          faucibus.
        </p>
        <button className="bg-black text-white w-20 h-10 text-sm ">
          Monthly
        </button>
        &thinsp;
        <button className="bg-black text-white w-20 h-10 text-sm shadow-xl  ">
          Annual
        </button>
        <div className="flex flex-col justify-between items-center lg:flex-row lg:items-start">
          <div className="w-full flex-1 mt-8 p-8 order-2 bg-white shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-1 lg:rounded-r-none">
            <div className="mb-7 pb-7 flex items-center border-b border-gray-300">
              <img
                src="https://res.cloudinary.com/williamsondesign/abstract-1.jpg"
                alt=""
                className="rounded-3xl w-20 h-20"
              />
              <div className="ml-5">
                <span className="block text-2xl font-semibold">Basic</span>
                <span>
                  <span className="font-medium text-gray-500 text-xl align-top">
                  ₹&thinsp;
                  </span>
                  <span className="text-3xl font-bold">199 </span>
                </span>
                <span className="text-gray-500 font-medium">/ user</span>
              </div>
            </div>
            <ul className="mb-7 font-medium text-gray-500">
              <li className="flex text-lg mb-2">
                <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
                <span className="ml-3">
                  Direct Phone <span className="text-black">Numbers</span>
                </span>
              </li>
              <li className="flex text-lg mb-2">
                <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
                <span className="ml-3">
                  Landline  <span className="text-black">Phone Numbers</span>
                </span>
              </li>
              <li className="flex text-lg">
                <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
                <span className="ml-3">
                  <span className="text-black">Corporate</span>  email addresses
                </span>
              </li>
            </ul>
            <a
              onClick={()=>handler("plan_O7z6kHlcbHZybA",199)}
              href="#/"
              className="flex justify-center items-center bg-indigo-600 rounded-xl py-5 px-4 text-center text-white text-xl transition delay-150 duration-300 ease-in-out transition duration-500 ease-in-out bg-blue-500 hover:bg-green-500 transform hover:-translate-y-1 hover:scale-110 "
            >
              Clasic
            </a>
          </div>
          <div className="w-full flex-1 p-8 order-1 shadow-xl rounded-3xl bg-gray-900 text-gray-400 sm:w-96 lg:w-full lg:order-2 lg:mt-0">
            <div className="mb-8 pb-8 flex items-center border-b border-gray-600">
              <img
                src="https://res.cloudinary.com/williamsondesign/abstract-2.jpg"
                alt=""
                className="rounded-3xl w-20 h-20"
              />
              <div className="ml-5">
                <span className="block text-3xl font-semibold text-white">
                  Startup
                </span>
                <span>
                  <span className="font-medium text-xl align-top">
                  ₹&thinsp;
                  </span>
                  <span className="text-3xl font-bold text-white">99 </span>
                </span>
                <span className="font-medium">/ user</span>
              </div>
            </div>
            <ul className="mb-10 font-medium text-xl">
              <li className="flex mb-6">
                <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
                <span className="ml-3">
                  Direct Phone <span className="text-white">Numbers</span>
                </span>
              </li>
              <li className="flex mb-6">
                <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
                <span className="ml-3">
                  Landline  <span className="text-white">Phone Numbers</span>
                </span>
              </li>
              <li className="flex">
                <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
                <span className="ml-3">
                  <span className="text-white">Corporate</span>  email addresses
                </span>
              </li>
            </ul>
            <a

              onClick={() => handler("plan_O7z5sfK0DR12x3",99)}
              className="flex justify-center items-center bg-indigo-600 rounded-xl py-6 px-4 text-center text-white text-2xl transition delay-150 duration-300 ease-in-out transition duration-500 ease-in-out bg-blue-500 hover:bg-green-500 transform hover:-translate-y-1 hover:scale-110 "
            >
              Basic Plan
            </a>
          </div>
          <div className="w-full flex-1 mt-8 p-8 order-3 bg-white shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-3 lg:rounded-l-none">
            <div className="mb-7 pb-7 flex items-center border-b border-gray-300">
              <img
                src="https://res.cloudinary.com/williamsondesign/abstract-3.jpg"
                alt=""
                className="rounded-3xl w-20 h-20"
              />
              <div className="ml-5">
                <span className="block text-2xl font-semibold">Enterprise</span>
                <span>
                  <span className="font-medium text-gray-500 text-xl align-top">
                  ₹&thinsp;
                  </span>
                  <span className="text-3xl font-bold">249 </span>
                </span>
                <span className="text-gray-500 font-medium">/ user</span>
              </div>
            </div>
            <ul className="mb-7 font-medium text-gray-500">
              <li className="flex text-lg mb-2">
                <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
                <span className="ml-3">
                  Direct Phone <span className="text-black">Numbers</span>
                </span>
              </li>
              <li className="flex text-lg mb-2">
                <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
                <span className="ml-3">
                  Landline  <span className="text-black">Phone Numbers</span>
                </span>
              </li>
              <li className="flex text-lg">
                <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
                <span className="ml-3">
                  <span className="text-black">Corporate</span>  email addresses
                </span>
              </li>
            </ul>
            <a
              onClick={()=>handler("plan_O7z7UQyj4nlTxW",249)}
              href="#/"
              className="flex justify-center items-center bg-indigo-600 rounded-xl py-5 px-4 text-center text-white text-xl transition delay-150 duration-300 ease-in-out transition duration-500 ease-in-out bg-blue-500 hover:bg-green-500 transform hover:-translate-y-1 hover:scale-110 "
            >
              Standard
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Subscription;
