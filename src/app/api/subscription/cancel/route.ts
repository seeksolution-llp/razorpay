import Razorpay from 'razorpay';


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

export async function POST(request: Request) {
    const {subscriptionId}:any = await request.json()
    console.log("subscriptionId",subscriptionId); 
    try {
      const response = await razorpay.subscriptions.cancel(subscriptionId)  
      return Response.json(response,
        { status: 200 }
      );
    } catch (error) {
      return Response.json(error,
        { status: 400 }
      );
    }
  }



