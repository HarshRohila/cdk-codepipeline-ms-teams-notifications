export { createMsTeamNotification };

async function createMsTeamNotification(
  event: any,
): Promise<any> {
  //  let s:any='event';
    //let obj:any = JSON.parse(s);
  //  let myJSON:any = JSON.stringify(event);
  //  let myObj:any = JSON.parse(myJSON);

    //console.log(myJSON);

    const s=event.Records[0];
    const z=s.Sns.Message;
    const myObj = JSON.parse(z);
    console.log("Account:"+myObj.account+"\n"+"Status:"+ myObj.detailType+"\n"+"Summary:"+ myObj.detail.state);
   
    const k=myObj.account;
    const c=myObj.detailType;
    const v=myObj.detail.state;
    const x=myObj.detail.pipeline;


  const axios= require('axios');
 
  const payload = { "@type": "MessageCard",
  "@context": "http://schema.org/extensions",
  "themeColor": "00FF00",
  
  "summary": x,


  "sections": [{
      "activityTitle": x,
      "activityImage": "https://teamsnodesample.azurewebsites.net/static/img/image5.png",
      "facts": [{
          "name": "Account",
          "value": k
      }, {
          "name": "Status",
          "value": v
      }, {
          "name": "Summary",
          "value": c
      }],
      "markdown": true
  }],
  "potentialAction": [{
      "@type": "ActionCard",
      "name": "Jump to  pipeline",
    
      "actions": [{
          "@type": "HttpPOST",
          "name": "Jump to  pipeline",
          "target": "https://sns.us-east-1.amazonaws.com/SimpleNotificationService-7ff5318490ec183fbaddaa2a969abfda.pem"
      }]
  }] };

    let res:any = await axios.post('https://mrisoftware.webhook.office.com/webhookb2/ead50a4b-bba4-4756-a319-cb4d0a447646@e04e9f50-006e-4eaa-ab0b-e804b0c7b7d1/IncomingWebhook/b0089b0e0e9b41e0bd21aa9b0409b5f5/af59a89f-b463-4506-9204-a937eac07b6f', payload);

    let data:any = res.data;
    console.log(data);


  return {
    body: JSON.stringify({ message: 'Successful lambda invocation' }),
    statusCode: 200,
  };


}