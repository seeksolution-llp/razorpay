"use client"

import { CheckIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";


export default function PaymentSuccess({ id }: any) {
const router = useRouter()
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-500 to-indigo-500">
      <div className="max-w-md  mx-auto p-10 bg-white rounded shadow-lg text-green-500">
        <CheckIcon className="h-12 w-12 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Payment Successful</h1>
        <p className="text-lg mb-4 text-gray-700">Your transaction was successful.</p>
        <p className="text-lg mb-8 text-gray-700">Transaction ID: {id}</p>
        <button 
          onClick={()=>router.push('/')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
            Go to home
        </button>
      </div>
    </div>
  




  );
}
