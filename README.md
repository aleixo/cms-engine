# Form-engine - Decouple your forms

Serve your forms in JSON to your frontend, and allow it to be agnostic of your forms logic.

3 simple steps
1. Map your components to the form (Section - Build your mappers)
2. Build your json
3. React - Use it with `<Form`


**BUILD MAPPERS**
```javascript
import Input from '@bit/bolttech.components.ui.input';

const Mappings = {
  input: { component: Input },
};

const formBuilderPropsMapping = {
  input: {
    getValue: 'onChange',
    setValue: 'value',
    setErrorMessage: 'errorMessage',
    onBlur: 'onBlur',
    onFocus: 'onFocus',
  },
};

export { Mappings, formBuilderPropsMapping };
```

**BUILD SCHEMA**
```json
{
  "components": [
    {
      "component": '',
      "name": '',
      "children": [
        {
          "component": "${componentName}",
          "name": "${componentFormName}",
          "props": {
            "fullWidth": true,
          },
        },
      ],
    },
  ],
};
```
**USE IT**
```javascript
import { Mappings, formBuilderPropsMapping } from './my-component-mappings'
import { getFormSchema } from './my-api-wrapper'
...
const schema = useMemo(() => getFormSchema('myInstanceContext'), [])

...
<Form mappings={Mappings} propsMappings={formBuilderPropsMapping} schema={schema}>
```

Nexts steps ? Checkout what you can do in the storybook with `npm run storybook` or see the best effort readme :( 
# Setup

## Build your mappers

The form uses mappings to connect to UI components so that its easy to connect to any set of components.

You can build your own mappings file or you can use the `bolttech` and if you want extend it with your set of components.

In the mappings file you need to specify the component definition and a name to refer in the JSON's latter, and how the form will connect to component props.

See this example

```javascript
import Input from '@bit/bolttech.components.ui.input';
import Checkbox from '@bit/bolttech.components.ui.checkbox';
import FormGroup from '@bit/bolttech.components.common.form-group';

const Mappings = {
  input: { component: Input },
  checkbox: { component: Checkbox },
  formGroup: { component: FormGroup },
};

const formBuilderPropsMapping = {
  input: {
    getValue: 'onChange',
    setValue: 'value',
    setErrorMessage: 'errorMessage',
    onBlur: 'onBlur',
    onFocus: 'onFocus',
  },
  checkbox: {
    getValue: 'onChange',
    setValue: 'checked',
  },
};

export { Mappings, formBuilderPropsMapping };
```

Here you say to the form that you can use in your JSON the names `input`, `checkbox` and `formGroup` and you tell the form how to get the props it needs from them.

## Setup Form provider

After setting your own mappings you encapsulate your app of your form with the provider

```javascript
<FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
  {children}
</FormProvider>
```

**DONE. NOW build your forms**

# My first basic form

# Form Features

Inside the schema you can specify several actions for a field alone or that correlate and have side-effects betweeen them.

Those actions support support multiple lifecycle and this must be on an action item basis:
- ON_FIELD_MOUNT
- ON_FIELD_CHANGE
- ON_FIELD_BLUR
- ON_FIELD_FOCUS

All the actions are typed, so you will have help here seeing which lifecycles you have available

Per action, you will be able to combine multiple lifecycle methods

All the following features can be inserted in the same location on the schema

```json
{
  component: 'input',
  name: 'fieldName',
  props: {
    label: 'My field',
  },
  ...your feature goes here
},
```

## Validations

Like the name say, this feature lets you validate the form.

```json
validations: {
  ON_FIELD_BLUR: {
    email: true,
  },
  ON_FIELD_CHANGE: {
    required: true,
  },
},
```

The above example will let form know that in each change the field must have something in it, and that on blur, the value must be a email.

### Error Messages
You can also specify the error messages you want.

```json
errorMessages: {
  default: 'Default error message',
  email: 'Invalid e-mail',
},
```

This schema part, will add messages to validations error.
- Each time the field has an e-mail error it will send the "Invalid e-mail" message to the component
- If there is and field error, but no message is specified, it will send what you have in `default` key. In this example, `required` error does not have message and will send "Default error message"

### Available validations

## Formatters

Formatting a field means mutating the field value to a given... format.

This options will allow you to force a give field to have the format you whant while the user is performing some action on the form.

**NOTE** - When receiving the values of the form, you will have the value with the specified format, not the raw value the user entered

You have several formatters. THe following example shows splitter that is a more generic one, allowing you to split the input text
```json
formatters: {
  ON_FIELD_MOUNT: {
    splitter: [
      {
        position: 2,
        value: '/',
      },
      {
        position: 5,
        value: '/',
      },
    ],
  },
}

```
The above example will split your word in position 2 and 5, adding there the `/`. This will give you a date format like `10/10/1987` (you would have to limit the input length. More on that on FILTERS)

### Available Formatters

## Masks
Mask has the same functionality of formatter, but keed the original value for your program. Think of it like the password mask. You input something into your text input, mask that something with `*` but you need to read the original value. FOr Eg.

```json
masks: {
  ON_FIELD_BLUR: {
    replaceAll: '*',
  },
  ON_FIELD_FOCUS: {
    cleanMask: true
  }
},
```

In this example, you will
- Mask a given text input from for example `123345` to `******`
- On Focus , you tell form to clean the mask with `cleanMask` directive.

### Available Masks (TBD)
TABLE
## Filters

Filters very predictable and work like the word says, they filter a given word to a given patter/directive.

Lets say you want a field to accept only numbers and with a max length o X.

```json
filter: {
  length: 4,
  isNumber: true
},
```

This example will let you do just that. Only numbers and max length of 4

### Available filters (TBS)
TABLE


## Visibility conditions

Sometimes you want to hide other fields based on certain conditions.

That is what this feature does. 

Eg: You want to hide another field, when a given field `originalField` has a given value on it.

```json
{
  name: 'originalField',
  component: 'checkbox',
  visibilityConditions: {
    ON_FIELD_MOUNT: [
      {
        validations: {
          value: 'Yes',
        },
        fieldName: 'targetField',
      },
    ],
    ON_FIELD_CHANGE: [
      {
        validations: {
          value: 'Yes',
        },
        fieldName: 'targetField',
      },
    ],
  },
  props: {
    ...
  },
},
{
  name: 'targetField',
  component: 'input',
  props: {
    ...
  }
}
```

This example tells form to
- On mount check if `originalField` has the value `Yes`
- If it put the `targetField` visible
- Ótherwise make it invisible

You can also for each visibility condition, apply it to multiple field names with `fieldNames` key that will accept an array.

```json
visibilityConditions: {
  ON_FIELD_MOUNT: [
    {
      validations: {
        value: 'Yes',
      },
      fieldNames: ['targetFieldOne', 'targetFieldTwo'],
    },
  ]
},
```
## Clear Fields

Guess what... THis will clear one or more form fields :)

Uses the same mechanism of VISIBILITY CONDITIONS.

Lets say you want to clear a given field when `originalField` has a given value.

```json
clearFields: {
  ON_FIELD_CHANGE: [
    {
      validations: {
        value: 'Yes',
      },
      field: 'targetValue',
      clearedValue: false,
    },
  ],
},
```

When form fires ON_CHANGE this will have the effect of having the field `targetValue` with the value `false` if `originalField` has value `Yes`.

Just like before, you can specify multiple fields with `fields` key for the same rule.
```json
clearFields: {
  ON_FIELD_CHANGE: [
    {
      validations: {
        value: 'Yes',
      },
      fields: ['targetValue'],
      clearedValue: false,
    },
  ],
},
```

## Api
This one will let you instruct form to call a give API at a given lifecycle method

```json
api: {
  ON_FIELD_CHANGE: [
    {
      blockRequestWhenInvalid: true,
      method: 'GET',
      url: 'https://api.chucknorris.io/jokes/random',
      scope: 'chuck',
    },
  ],
},
```
The above example will make form to call the API specified when the field where we gave the directory changes.

### Keys
| key                     | type    | Description                                                                                                                             |
|-------------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------|
| blockRequestWhenInvalid | boolean | Specify if this call  should be blocked when the field is invalid (due to validations)                                                  |
| method                  | string  | HTTP verb. Get, Post, Put or delete                                                                                                     |
| url                     | string  | The api url                                                                                                                             |
| scope                   | string  | This lets you put the api result inside the form scope in the given key. THis will allow to use the call result latter on on some field |
| body                    | object  | Body to send to the API                                                                                                                 |
| headers                 | object  | Api headers                                                                                                                             |
| debounceTime            | number  | Allow you to debounce the api call by X seconds                                                                                         |

## Templating AKA data binding

Form has a functionality to allow you to build your logic inside the schema via templating. 

### Scope
For templating to work, form relies on scope

| namespace | description                                                                                                                                                                                  |
|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| global    | This namespace contains all the data that comes from the client implementing the Form and is injected in iVars                                                                               |
| fields    | Automatically generated scope. This namespace contains all the fields with everything that is done in them per field. Eg: value, errors, visible, mask etc. Refer to the types for more info |
| api       | This scope is where you can store the api responses with the api scope key.                                                                                                                  |
| hooks     | This one is retrieved by the hooks configured on the client                                                                                                                                  |
| configs   | All the configs that the client gave to the form, will be stored here                                                                                                                        |


Templating basically allows a given component to subscribe to any scope change, be notified and changed according to that. In the following example, the component named `make` is subscribinf to `api` namespace on `data` key.

```json
{
    name: 'make',
    component: 'dropdown',
    props: {
      id: 'make',
      name: 'make',
      label: 'Make',
      placeholder: '',
      dataTestId: 'make',
      autoComplete: 'nope',
      backgroundColor: 'white',
      options: '${api.makes.data||[]}',
  },
},
```

This means that, anytime that `api.makes.data` changes (done by api action with scope = data), this component will be injected with it's value on the `options` key. It also has a default value of empty array `...data||[]}`.

If you want you can even nested templating also. Next example we will access to `global` namespace on `name` key. But we will access the prop dynamically from the field named `myfield` value
```json
{
  component: 'input',
  name: 'destination',
  props: {
    name: 'destination',
    id: 'destination',
    label: 'Dynamic -> ${global.name.${fields.myfield.value||test}}',
    autoComplete: 'nope',
  },
},
```
This will result in the following. Assume we have scope like

```javascript
  global: {
    name: {
      test: 'test,
      other: 'other
    }
  },
```

It will access `global.name.test` since we have the default value as test and there is no data in fields scope. The end result would be *"Dynamic -> test"*

But right after input on the form field named `myfield`, its scope will be populated

```javascript
  global: {
    name: {
      test: 'test,
      other: 'other
    }
  },
  fields: {
    myfield: {
      value:'other'
      ...
    }
  }
```

In this case would access `global.name.other` and the final result would be *"Dynamic -> other"*

## State

This key will allow you to setup some initial state on the field.

### hidden
Hidden prop on state, will turn your field visible or invisible
```json
{
  state: {
    hidden: true
  }
}
```

This will be reflected on the field scope.


## Rehydrate
**DEPRECATED, you can accomplish it with templating**

It lets you rehydrate a given field
```json
{
  rehydrate: {
    ON_FIELD_CHANGE: [
      {
        validations: {
          required: true,
        },
        fields: ['destination'],
      },
    ],
  },
  component: 'dropdown',
  name: 'originalField',
  props: {
    ...
  },
},
```

The api is pretty much like visibility conditions. The above example will rehydrate the `destination` field when field with the directive (*originalField*) meets the validations configured

## Group
In form we can correlate fields into a single field name. This is called the group functionality.

Say you have two checkboxes and whant the selected value. You can use `group` for that

```json
{
  name: 'checkOne',
  group: 'checkedGroup',
  component: 'checkbox',
  props: {
    ...
  },
},
{
  name: 'checkTwo',
  group: 'checkedGroup',
  component: 'checkbox',
  props: {
    ...
  },
},
```

This example will store the selected value of the checkbox in the `checkedGroup` and will then be send to the client.

## Steps navigation

# Adapters

## React
## Client Hooks

## Components
### Form
### useForm
### asFormField

## Form Reference functionalities
## Usage with JSON setup
## Usage with JSX based components setup

# Individual contributor


## Architecture explanation

### Layers responsability

# Form Builder UI (TBD)