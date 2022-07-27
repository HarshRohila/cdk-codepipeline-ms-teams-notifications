import { Template } from "aws-cdk-lib/assertions";
import * as cdk from "aws-cdk-lib";
import { CdkStarterStack } from "../../src/index";
import { createMsTeamNotification } from "../../src/functions/create-ms-team-notification";

const snsEventPayload = {
  Records: [
    {
      EventSource: "aws:sns",
      EventVersion: "1.0",
      EventSubscriptionArn:
        "arn:aws:sns:us-east-1:821665253511:workplace-connect-notification-topic-qa:86199928-e383-45e7-810b-eb3bca1e2e83",
      Sns: {
        Type: "Notification",
        MessageId: "2f6f4879-132f-5e6f-8437-133954fa83b3",
        TopicArn:
          "arn:aws:sns:us-east-1:821665253511:workplace-connect-notification-topic-qa",
        Subject: null,
        Message:
          '{"account":"821665253511","detailType":"CodePipeline Pipeline Execution State Change","region":"us-east-1","source":"aws.codepipeline","time":"2022-07-07T02:31:41Z","notificationRuleArn":"arn:aws:codestar-notifications:us-east-1:821665253511:notificationrule/7555ac2c628ba488641cfe1f97ba4f60f6dbe8f0","detail":{"pipeline":"qa-wpc-android-qa-cf-generated-Pipeline","execution-id":"f2d2963d-ebb7-4cd2-804f-906b7c9d0e21","execution-trigger":{"trigger-type":"StartPipelineExecution","trigger-detail":"arn:aws:sts::821665253511:assumed-role/AWSReservedSSO_Manhattan.Developer.dev_7489d1ced05eae65/Harsh.Rohila@mrisoftware.com"},"state":"SUCCEEDED","version":252.0},"resources":["arn:aws:codepipeline:us-east-1:821665253511:workplace-connect-qa-cf-generated-Pipeline"],"additionalAttributes":{}}',
        Timestamp: "2022-07-07T02:31:49.038Z",
        SignatureVersion: "1",
        Signature:
          "Rm2vYnffXqwUV9bz/+ew37I5YOfIVkwUZ5EoDZS8iKySLdAMmliGkGbjYdgtlBR3djZIt+eyV5UruKOP4KYjDd03qO6Q5MMJOSpQkcso9zDmohLnZx6G7IjunIcNKybzDF0gjrJoUEWqFmVaThcffz0auauNRfq641TKuoNOfE4XkEw76Z2Rxgpek0mb3Yx6Wnz1gxjX4w9FYUaA8XZSkM6egg0MbuSP37UohYJsUh2zyMd7YknXmjG51YUpz8vAeA8exvrjsv4+ovC10ltKWn4d+rXeCGdd1dp7tIzjbjA1TGi76ibXFobeqgoe/Z2ZRRyB6TJYwRnwSDDLgBraKQ==",
        SigningCertUrl:
          "https://sns.us-east-1.amazonaws.com/SimpleNotificationService-7ff5318490ec183fbaddaa2a969abfda.pem",
        UnsubscribeUrl:
          "https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-1:821665253511:workplace-connect-notification-topic-qa:86199928-e383-45e7-810b-eb3bca1e2e83",
        MessageAttributes: {},
      },
    },
  ],
};

describe("create-ms-team-notification | Function", () => {
  it("runs", async () => {
    const response = await createMsTeamNotification(snsEventPayload);
    expect(response).toStrictEqual({
      body: '{"message":"Successful lambda invocation"}',
      statusCode: 200,
    });
  });
  it("lib has lambda fn with correct properties", () => {
    const app = new cdk.App();

    const CdkStack = new CdkStarterStack(app, "CdkStarterStack");

    const template = Template.fromStack(CdkStack);
    template.hasResourceProperties("AWS::Lambda::Function", {
      Handler: "index.createMsTeamNotification",
      Runtime: "nodejs14.x",
    });
  });
});
