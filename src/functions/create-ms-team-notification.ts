import axios from "axios";

export { createMsTeamNotification };

async function createMsTeamNotification(event: any): Promise<any> {
  const record = event.Records[0];
  const message = record.Sns.Message;
  const myObj = JSON.parse(message);
  console.log(
    "Account:" +
      myObj.account +
      "\n" +
      "Status:" +
      myObj.detailType +
      "\n" +
      "Summary:" +
      myObj.detail.state
  );

  const account = myObj.account;
  const detailType = myObj.detailType;
  const state = myObj.detail.state;
  const pipeline = myObj.detail.pipeline;
  let color = "";
  if (state === "SUCCEEDED") {
    color = "00FF00";
  } else if (state === "FAILED") {
    color = "FF0000";
  } else {
    color = "000000";
  }

  const payload = {
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",

    themeColor: color,

    summary: pipeline,

    sections: [
      {
        activityTitle: pipeline,
        activityImage:
          "https://teamsnodesample.azurewebsites.net/static/img/image5.png",
        facts: [
          {
            name: "Account",
            value: account,
          },
          {
            name: "Status",
            value: state,
          },
          {
            name: "Summary",
            value: detailType,
          },
        ],
        markdown: true,
      },
    ],
    potentialAction: [
      {
        "@type": "ActionCard",
        name: "Jump to  pipeline",

        actions: [
          {
            "@type": "HttpPOST",
            name: "Jump to  pipeline",
            target:
              "https://sns.us-east-1.amazonaws.com/SimpleNotificationService-7ff5318490ec183fbaddaa2a969abfda.pem",
          },
        ],
      },
    ],
  };

  const res = await axios.post(
    "https://mrisoftware.webhook.office.com/webhookb2/ead50a4b-bba4-4756-a319-cb4d0a447646@e04e9f50-006e-4eaa-ab0b-e804b0c7b7d1/IncomingWebhook/b0089b0e0e9b41e0bd21aa9b0409b5f5/af59a89f-b463-4506-9204-a937eac07b6f",
    payload
  );

  const data = res.data;
  console.log(data);

  return {
    body: JSON.stringify({ message: "Successful lambda invocation" }),
    statusCode: 200,
  };
}
