import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

  export async function POST(request: Request) {
    const {plan_id , price} = await request.json()
    const option = {
      "plan_id":plan_id,
      "total_count":6,
      "quantity":1,
      "start_at":1735689600,
      "expire_by":1893456000,
      "customer_notify":1,
      "addons":[
        {
          "item":{
            "name":"Delivery charges",
            "amount":price*100,
            "currency":"INR"
          }
        }
      ],
      "notes":{
        "notes_key_1":"Tea, Earl Grey, Hot",
        "notes_key_2":"Tea, Earl Grey… decaf."
      }
    }
    try {
  
      // const instance = await new Razorpay({ key_id: "rzp_test_vdU9Qfx2T0VMp6", key_secret: "rvjerOwMvzVBP3ee93kFuWC0" })
  
  
      const response =  await  razorpay.subscriptions.create(option)
  
      // return response
      return Response.json(response,
        { status: 200 }
      );
    } catch (error) {
      return Response.json(error,
        { status: 400 }
      );
    }
  }



