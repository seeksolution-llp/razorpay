// pages/payment-success.js
"use client"
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import PaymentSuccess from 'seek-solution/components/statusTrue';

export default function page() {
  const query = useSearchParams()

 const id =  query.get("id")
 console.log(id);
 
  return (
      <>
        <PaymentSuccess id={id} />
      </>
  );
}
