import applyRules from 'rjsf-conditionals';
import Engine from 'json-rules-engine-simplified';
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";

const rules = [
  {
    conditions: {
      meat: 'falsey'
    },
    event: {
      type: "remove",
      params: {
        field: "beef"
      },
    }
  },
  {
    conditions: {
      meat: 'falsey'
    },
    event: {
      type: "remove",
      params: {
        field: "chicken"
      },
    }
  }
]

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
      format: 'email',
    },
    meat: {
      type: 'boolean',
      title: 'Do you like meat ?',
      enumNames: ['Yes', 'No'],
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
    website: {
      type: 'string',
      title: 'Website',
    },
    hasNoWebsite: {
      type: 'boolean',
      title: 'Does not have a website?',
    },
  },
}

const uiSchema = {
  website: { 'ui:disabled': false },
}

const App = () => {
  let FormWithConditionals = applyRules(schema, uiSchema, rules, Engine)(Form)
  return <FormWithConditionals validator={validator} liveValidate noHtml5Validate />
}

export default App
