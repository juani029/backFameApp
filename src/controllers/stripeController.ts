import { Request, Response } from "express";
import User from "../models/user";
import Stripe from "stripe";

const secretKey = process.env.SECRET_KEY;
const stripe = new Stripe(
  "sk_test_51M8nPkEZcBXalvvxPR5IrOJqxbTmT1xONXccAuYOkcMTRVPAGhiV4wAV5fsC2Rg0XmEJwSItSM84ENMvyvvxjsuD00UYwsSG5g",
  { apiVersion: "2022-11-15" }
);
// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.SECRET_KEY, );

// const createCustomer = async () => {
//   const params: Stripe.CustomerCreateParams = {
//     description: 'test customer',
//   };

//   const customer: Stripe.Customer = await stripe.customers.create(params);

//   console.log(customer.id);
// };
// createCustomer();

export const postStripe = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  const { id, amount } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Fame App",
      payment_method: id,
      confirm: true,
    });
    console.log("Payment", payment);
    return res.json({ msg: "Payment successful", success: true });
  } catch (error) {
    console.log("Error", error);
    return res.json({ msg: "Payment failed", success: false });
  }
};
