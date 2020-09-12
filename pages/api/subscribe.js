// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mailchimp from "@mailchimp/mailchimp_marketing";
export default async (req, res) => {

  if (req.method === "POST") {
    //const listId = "1066117";
    const customer = JSON.parse(req.body)

    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMP_API_KEY,
      server: process.env.MAILCHIMP_SERVER_PREFIX,
    });

    async function run() {
      try{
        const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
          update_existing:true,
          phoneNumber: customer.phoneNumber,
          email_address: customer.emailAddress,
          status: "subscribed",
          merge_fields: {
            "FNAME": customer.firstName,
            "LNAME": customer.lastName,
            "PHONE" : customer.phoneNumber,
            "COMPANY" : customer.companyName
          }
        });
        //console.log(response);
        res.statusCode = 200
        res.json({ response })
      }catch (err) {
        //console.log()
        console.warn('Failed adding subscriber', err);
        res.statusCode = err.status
        res.json(err)
      };

    }

    run();

  } else {
    const accountSid = 'AC03623229dba462b92876e9bec4f98181';
    const authToken = '005bd078cc1cc22a5eb099af3916ed3b';
    const client = require('twilio')(accountSid, authToken);

    client.messages
      .create({
        body: 'This is a test',
        from: '+15034619772',
        to: '+15038498414'
      })
      .then(message => console.log(message.sid))
      .done();

    res.statusCode = 200
    res.json({ name: 'John Doe' })
  }
}
