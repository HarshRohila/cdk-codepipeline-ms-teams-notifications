import * as cdk from "aws-cdk-lib";
import { CdkStarterStack } from ".";

const app = new cdk.App();

new CdkStarterStack(app, "NotificationStack", {
  stackName: "test-notif",
});
