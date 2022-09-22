import applyRules from 'rjsf-conditionals';
import Engine from 'json-rules-engine-simplified';
import Form from "@rjsf/core";

const rules = []

const schema = {
  type: 'object',
  title: 'Test Schema',
  required: ['email'],
  properties: {
    name: {
      type: 'string',
      title: 'Your Name',
    },
    email: {
      type: 'string',
      title: 'Email',
    },
    meat: {
      type: 'boolean',
      title: 'Do you like meat ?',
      enumNames: ['Yes', 'No'],
    },
    website: {
      type: 'string',
      title: 'Website',
    },
    hasNoWebsite: {
      type: 'boolean',
      title: 'Does not have a website?',
    },
  },
  dependencies: {
    meat: {
      oneOf: [
        {
          properties: {
            meat: {
              enum: [false],
            },
          },
        },
        {
          properties: {
            meat: {
              enum: [true],
            },
            beef: {
              title: 'Do you like beef ?',
              type: 'boolean',
              enumNames: ['Yes', 'No'],
            },
            chicken: {
              title: 'Do you like chicken ?',
              type: 'boolean',
              enumNames: ['Yes', 'No'],
            },
          },
        },
      ],
    },
  },
}

const uiSchema = {
  meat: {
    'ui:widget': 'radio-button',
  },
  beef: {
    'ui:widget': 'radio-button',
  },
  chicken: {
    'ui:widget': 'radio-button',
  },
  website: { 'ui:disabled': false },
}

const App = () => {
  let FormWithConditionals = applyRules(schema, uiSchema, rules, Engine)(Form)
  return <FormWithConditionals />
}

export default App
