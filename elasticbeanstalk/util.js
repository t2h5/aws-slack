const onlyNewDeployment = process.env.onlyNewDeployment

exports.generateMessage = (event, slackChannel) => {
  const message = event.Records[0].Sns.Message
  const text = message
  const color = setColor(message)
  const slackMessage = {
    channel: slackChannel,
    attachments: [{
      color,
      text
    }]
  }
  const skip = !!onlyNewDeployment && message.indexOf('New application version was deployed') === -1
  if (skip) {
    return null
  }
  return slackMessage
}

const setColor = (message) => {
  if (message.indexOf('Environment health has transitioned') !== -1) {
    if (message.indexOf('to Ok') !== -1) {
      return 'good'
    } else if (message.indexOf('to Warning') !== -1 || message.indexOf('to Degraded') !== -1) {
      return 'warning'
    } else if (message.indexOf('to Severe') !== -1) {
      return 'danger'
    } else if (message.indexOf('to Info') !== -1) {
      return '#764FA5'
    }
  } else if (message.indexOf('New application version was deployed') !== -1) {
    return 'good'
  } else {
    return null
  }
}
