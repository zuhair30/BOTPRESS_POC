//CHECKSUM:444bcee09b48a3132a2af198d60c4b902cdf21039500891d089f08e55d37c53a
const base = require('./_base')

function render(data) {
  const events = []

  if (data.typing) {
    events.push({
      type: 'typing',
      value: data.typing
    })
  }

  return [
    ...events,
    {
      text: data.text,
      quick_replies: data.choices.map(c => ({
        title: c.title,
        payload: c.value.toUpperCase()
      })),
      typing: data.typing,
      markdown: data.markdown,
      disableFreeText: data.disableFreeText
    }
  ]
}

function renderMessenger(data) {
  const events = []

  if (data.typing) {
    events.push({
      type: 'typing',
      value: data.typing
    })
  }

  return [
    ...events,
    {
      text: data.text,
      quick_replies: data.choices.map(c => ({
        content_type: 'text',
        title: c.title,
        payload: c.value.toUpperCase()
      }))
    }
  ]
}

function renderSlack(data) {
  const events = []

  if (data.typing) {
    events.push({
      type: 'typing',
      value: data.typing
    })
  }

  return [
    ...events,
    {
      text: data.text,
      quick_replies: {
        type: 'actions',
        elements: data.choices.map((q, idx) => ({
          type: 'button',
          action_id: 'replace_buttons' + idx,
          text: {
            type: 'plain_text',
            text: q.title
          },
          value: q.value.toUpperCase()
        }))
      }
    }
  ]
}

function renderElement(data, channel) {
  if (channel === 'messenger') {
    return renderMessenger(data)
  } else if (channel === 'slack') {
    return renderSlack(data)
  } else {
    return render(data)
  }
}

module.exports = {
  id: 'builtin_single-choice',
  group: 'Built-in Messages',
  title: 'module.builtin.types.singleChoice.title',

  jsonSchema: {
    description: 'module.builtin.types.singleChoice.description',
    type: 'object',
    required: ['choices'],
    properties: {
      text: {
        type: 'string',
        title: 'message'
      },
      choices: {
        type: 'array',
        title: 'module.builtin.types.singleChoice.choice',
        minItems: 1,
        maxItems: 10,
        items: {
          type: 'object',
          required: ['title', 'value'],
          properties: {
            title: {
              description: 'module.builtin.types.singleChoice.itemTitle',
              type: 'string',
              title: 'Message'
            },
            value: {
              description: 'module.builtin.types.singleChoice.itemValue',
              type: 'string',
              title: 'Value'
            }
          }
        }
      },
      markdown: {
        type: 'boolean',
        title: 'module.builtin.useMarkdown',
        default: true
      },
      disableFreeText: {
        type: 'boolean',
        title: 'module.builtin.disableFreeText',
        default: false
      },
      ...base.typingIndicators
    }
  },

  uiSchema: {
    text: {
      'ui:field': 'i18n_field'
    },
    choices: {
      'ui:field': 'i18n_array'
    }
  },
  computePreviewText: formData =>
    formData.choices && formData.text && `Choices (${formData.choices.length}) ${formData.text}`,
  renderElement: renderElement,
  hidden: true
}
