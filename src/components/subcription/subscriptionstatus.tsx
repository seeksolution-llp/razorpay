import { Button } from 'antd';
import React, { useEffect, useState } from 'react';

const SubscriptionStatus = ({ startTime, currentPlan, status, expireTime, onUpdate }: any) => {

  const [isStatus,setIsStatus] = useState(status)
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const [expirationTime, setExpirationTime] = useState(parseInt(expireTime)); // Initial expiration time
  const [remainingTime, setRemainingTime] = useState('');


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






  const date = new Date(startTime * 1000);
  const formatted1 = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'UTC', // Adjust as needed
  });
  const date2 = new Date(expireTime * 1000);
  const formatted2 = date2.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'UTC', // Adjust as needed
  });


  useEffect(() => {
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000); // Current time in seconds
      const remaining = expirationTime - now;
      if (remaining <= 0) {
        clearInterval(interval);
        setRemainingTime('Expired');
      } else {
        setRemainingTime(formatTime(remaining));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expirationTime]);

  const formatTime = (expireTime: any) => {
    const hours = Math.floor(expireTime / 3600);
    const minutes = Math.floor((expireTime % 3600) / 60);
    const seconds = expireTime % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const cancel = async () => {
    enterLoading(0)
    const url = `/api/subscription/cancel`

    const apiRes = await fetch(url,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "subscriptionId":currentPlan
      })
    })

    if(!apiRes.ok){
        console.log('error');
        
    }
    const response = await apiRes.json()
    console.log("cancel response",response);
    setLoadings([false])
    setIsStatus(response.status)
  }


  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Current Plan: {currentPlan}</h3>
        <p className="text-sm">Status: <span className='text-sm inline text-green-600'>{isStatus}</span> </p>
        <p className="text-sm">Start: {formatted1}</p>
        <p className="text-sm">Expires: {formatted2}</p>
        <p className="text-sm">Remaining Time: {remainingTime}</p>
      </div>
      <div className="flex justify-between">
        {/* <button
          onClick={cancel}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Cancel Plan
        </button> */}
        <Button type="primary" style={{backgroundColor:'red'}} loading={loadings[0]} onClick={cancel}>
        Cancel Plan
        </Button>
        <button
          onClick={onUpdate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Plan
        </button>
      </div>
    </div>
  );
};

export default SubscriptionStatus;
