import { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

export async function GET(request: Request) {
  return Response.json({ method: request.method })
}
export async function POST(request: Request) {
  const { amount } = await request.json()
  const options = {
    amount: amount * 100, // amount in paisa
    currency: 'INR',
    receipt: "registration",
  };
  try {
    const response = await razorpay.orders.create(options);
    return Response.json(response,
      { status: 200 }
    );
  } catch (error) {
    return Response.json(error,
      { status: 400 }
    );
  }
}




