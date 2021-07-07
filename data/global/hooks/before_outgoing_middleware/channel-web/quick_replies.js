//CHECKSUM:0eb9c5d7c0750f0812cc3b470dc42f81393dac5aa06ec8152e6be450948aa7ae
const _ = require('lodash')

const channels = ['api', 'web']
if (event.payload.quick_replies && channels.includes(event.channel)) {
  event.payload = {
    type: 'custom',
    module: 'channel-web',
    component: 'QuickReplies',
    quick_replies: event.payload.quick_replies,
    disableFreeText: event.payload.disableFreeText,
    wrapped: {
      type: 'text',
      ..._.omit(event.payload, 'quick_replies')
    }
  }
  event.type = 'custom'
}
