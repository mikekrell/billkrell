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
        console.log(customer.email)
        const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
          update_existing:true,
          email_address: customer.email,
          status: "subscribed",
        });
        res.statusCode = 200
        return res.json({ response })
      }catch (err) {
        //console.log()
        console.warn('Failed adding subscriber', err);
        res.statusCode = err.status
        res.json(err)
        return res.detail
      };
    }

     run();

  }
}
