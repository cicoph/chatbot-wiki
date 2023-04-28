import { NextApiRequest, NextApiResponse } from "next";
import initStripe from 'stripe'
import { buffer } from 'micro'

const { STRIPE_SECRET_WEBHOOK: signSecretWebhook, STRIPE_SECRET_KEY: stripeSecretKey } = process.env

export const config = { api: { bodyParse: false } }

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const stripe = new initStripe(stripeSecretKey, { apiVersion: '2022-11-15' })
    const signature = req.headers['stripe-signature']
    const reqBuffer = await buffer( req )

    let event;

    try {
        event = stripe.webhooks.constructEvent( reqBuffer, signature, signSecretWebhook )
    } catch (error) {
        console.log(error)
        return res.status(400).send(`Webhook Error: ${error.message}`)
    }
    
    console.log( { event } )
    return res.status(200).json({ received: true })
}
export default handler