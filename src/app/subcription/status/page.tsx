// pages/payment-success.js
"use client"
import { useSearchParams } from 'next/navigation';
import SubscriptionStatus from 'seek-solution/components/subcription/subscriptionstatus';

export default function page() {
  const query = useSearchParams()
  const currentPlan = query.get('id');
  const expireTime = query.get('expireTime')
  const startTime = query.get('startTime')
  const status = query.get('status')

  

 
  return (
      <>
      <SubscriptionStatus currentPlan={currentPlan} expireTime={expireTime} startTime={startTime} status={status}/>
      </>
  );
}
