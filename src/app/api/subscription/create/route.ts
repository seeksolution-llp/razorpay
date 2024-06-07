import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

export async function POST(request: Request) {
  const { plan_id } = await request.json()
  try {
     const user  =  await razorpay.customers.create({
      name: "Gaurav Kumar",
      contact: 9123456780,
      email: "gaurav.kumar@example.com",
      fail_existing: 0,
      notes: {
        notes_key_1: "Tea, Earl Grey, Hot",
        notes_key_2: "Tea, Earl Grey… decaf."
      }
    })

    const subscription = await razorpay.subscriptions.create({
      plan_id: plan_id,
      total_count: 1,
    });
    
    return Response.json(subscription,
      { status: 200 }
    );
  } catch (error) {
    return Response.json(error,
      { status: 400 }
    );
  }
}



