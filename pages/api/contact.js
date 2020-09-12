// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async (req, res) => {
    const customer = JSON.parse(req.body)

    if (req.method === "POST") {

        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_KEY;

        const client = require('twilio')(accountSid, authToken);
            client.messages
                .create({
                    body: `Hey ${customer.first} ${customer.last}! This message was made by your brother. I am using live data, the email you used was ${customer.email}`,
                    from: '+15034619772',
                    to: '+1' + customer.phone
                })
                .then(message => {
                    res.statusCode = 200
                    res.json({ message: message, status: 'success' })
                })
                .done();
    }
}
