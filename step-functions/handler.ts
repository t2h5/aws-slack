import { Callback, Context, Handler, SNSEvent } from "aws-lambda";
import * as https from "https";

const slackWebhookPath = process.env.SLACK_WEBHOOK_PATH;

export const handler: Handler = async (event: SNSEvent, context: Context, callback: Callback) => {
  console.log(JSON.stringify(event));
  const message = JSON.parse(event.Records[0].Sns.Message);
  const options = {
    hostname: "hooks.slack.com",
    method: "POST",
    path: `/services/${slackWebhookPath}`,
    port: 443,
  };
  const req = https.request(options, (res) => {
    res.setEncoding("utf8");
    res.on("data", (data) => {
      console.log(data);
    });
  });
  req.on("error", (errors) => {
    console.log(errors);
  });
  req.write(JSON.stringify({
    attachments: [{
      color: "danger",
      text: message.NewStateReason,
      title: message.AlarmName,
    }],
  }));
  req.end();
  callback(null);
};
