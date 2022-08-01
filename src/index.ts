import * as path from "path";
import {
  AccountLabelMode,
  MSTeamsIncomingWebhookConfiguration,
} from "@cloudcomponents/cdk-chatops";
import {
  MSTeamsIncomingWebhook,
  PipelineEvent,
  PipelineNotificationRule,
} from "@cloudcomponents/cdk-developer-tools-notifications";
import * as cdk from "aws-cdk-lib";
import { Artifact, Pipeline } from "aws-cdk-lib/aws-codepipeline";
import {
  ManualApprovalAction,
  S3SourceAction,
} from "aws-cdk-lib/aws-codepipeline-actions";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Bucket } from "aws-cdk-lib/aws-s3";

// @ts-ignore
import { PipelineExecutionMessage } from "@cloudcomponents/cdk-chatops/lib/lambdas/msteams-incoming-webhook";

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new NodejsFunction(this, "createMsTeamNotification", {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "createMsTeamNotification",
      entry: path.join(__dirname, "functions/create-ms-team-notification.js"),
    });

    const webhook = new MSTeamsIncomingWebhookConfiguration(
      this,
      "MSTeamsWebhook",
      {
        url: "https://mrisoftware.webhook.office.com/webhookb2/ead50a4b-bba4-4756-a319-cb4d0a447646@e04e9f50-006e-4eaa-ab0b-e804b0c7b7d1/IncomingWebhook/b0089b0e0e9b41e0bd21aa9b0409b5f5/af59a89f-b463-4506-9204-a937eac07b6f",
        accountLabelMode: AccountLabelMode.ID_AND_ALIAS,
        themeColor: "#FF0000",
      }
    );

    const sourceBucket = Bucket.fromBucketName(
      this,
      "sourceBucket",
      "821665253511-space-managment-artifact"
    );

    const sourceOutput = new Artifact();

    const sourceAction = new S3SourceAction({
      actionName: "S3Source",
      bucket: sourceBucket,
      bucketKey: "WC/workplace-connect-source.zip",
      output: sourceOutput,
    });

    const approvalAction = new ManualApprovalAction({
      actionName: "Approval",
    });

    const pipeline = new Pipeline(this, "Pipeline", {
      pipelineName: "notifications-pipeline",
      artifactBucket: sourceBucket,
      crossAccountKeys: false,
      stages: [
        {
          stageName: "Source",
          actions: [sourceAction],
        },
        {
          stageName: "Approval",
          actions: [approvalAction],
        },
      ],
    });
    new PipelineNotificationRule(this, "PipelineNotificationRule", {
      name: "pipeline-notification",
      pipeline,
      events: [PipelineEvent.PIPELINE_EXECUTION_STARTED],
      targets: [new MSTeamsIncomingWebhook(webhook)],
    });
  }
}
