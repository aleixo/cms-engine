import { Meta, Story } from '@storybook/react/types-6-0';
import React, { ReactElement, useCallback, useRef, useState } from 'react';

import { Form, FormProvider, TFormRefActions, TFormValues, TSchema } from '../form';
import { Mappings, formBuilderPropsMapping } from '@bit/bolttech.components.common.form-mappings';

import Button from '@bit/bolttech.components.ui.button';
import CollapseGroup from '@bit/bolttech.components.common.collapse-group';
import Collapse, { CollapseProps } from '@bit/bolttech.components.common.collapse';

export default {
  title: 'Usages/CollapseGroup',
  component: CollapseGroup,
  argTypes: {
    openOneCollapseAtTime: {
      control: {
        type: 'boolean',
      },
    },
    indexCollapseStartOpened: {
      control: {
        type: 'number',
      },
    },
  },
} as Meta;

const personalDetails: TSchema = {
  components: [
    {
      component: '',
      name: '',
      children: [
        {
          name: '',
          component: 'formGroup',
          props: {},
          children: [
            {
              name: 'contactGroup',
              component: 'formGroup',
              props: {
                title: 'Contact Details',
                mb: 1,
              },
              children: [
                {
                  component: 'text',
                  name: 'email',
                  validations: {
                    onBlur: {
                      required: true,
                      email: true,
                    },
                  },
                  filter: {
                    maxLength: 50,
                  },
                  errorMessages: {
                    required: 'Please enter your email address',
                    email: 'Please provide valid email address',
                  },
                  props: {
                    dataTestId: 'email',
                    name: 'email',
                    id: 'email',
                    label: 'E-mail *',
                    placeholder: '',
                    variants: 'default_border',
                  },
                },
                {
                  component: 'text',
                  name: 'phoneNumber',
                  validations: {
                    onBlur: {
                      required: true,
                      regex: '([0]{1})([8]{1}|[8-9]{1})([0-9]{8})',
                    },
                  },
                  filter: {
                    isNumber: true,
                    maxLength: 10,
                  },
                  errorMessages: {
                    required: 'Mobile number is required',
                    regex: 'Please provide valid 10 digit mobile number',
                  },
                  props: {
                    dataTestId: 'phoneNumber',
                    name: 'phoneNumber',
                    id: 'phoneNumber',
                    label: 'Mobile number *',
                    placeholder: 'A valid 10 digit mobile number',
                    variants: 'default_border',
                    maxLength: 10,
                  },
                },
              ],
            },
          ],
        },
        {
          name: '',
          component: 'formGroup',

          children: [
            {
              name: 'addressGroup',
              component: 'formGroup',
              props: {
                title: 'Address',
                mb: 1,
              },
              children: [
                {
                  component: 'text',
                  name: 'address',
                  validations: {
                    onBlur: {
                      required: true,
                    },
                  },
                  filter: {
                    maxLength: 30,
                  },
                  errorMessages: {
                    required: 'Please enter your address',
                  },
                  props: {
                    dataTestId: 'address',
                    name: 'address',
                    id: 'address',
                    label: 'Address Line 1 (Max length:30) *',
                    placeholder: '',
                    variants: 'default_border',
                  },
                },
                {
                  component: 'text',
                  name: 'address2',
                  filter: {
                    maxLength: 30,
                  },
                  props: {
                    dataTestId: 'address2',
                    name: 'address2',
                    id: 'address2',
                    label: 'Address Line 2 (Max length:30)',
                    placeholder: '',
                    variants: 'default_border',
                  },
                },
                {
                  component: 'text',
                  name: 'postcode',
                  validations: {
                    onBlur: {
                      required: true,
                      isInTheList: '${global.postcodes}',
                    },
                  },
                  filter: {
                    maxLength: 5,
                    isNumber: true,
                    notAllowSpaces: true,
                  },
                  errorMessages: {
                    required: 'Please enter your postcode',
                    isInTheList: 'Postcode is invalid',
                  },
                  props: {
                    dataTestId: 'postcode',
                    name: 'postcode',
                    id: 'postcode',
                    label: 'Postcode *',
                    placeholder: '',
                    variants: 'default_border',
                  },
                  api: {
                    scope: 'postcode',
                    blockRequestWhenInvalid: true,
                    method: 'GET',
                    url: '/api/address/${fields.postcode.value}',
                    onBlur: true,
                  },
                },
                {
                  validations: {
                    onBlur: {
                      required: true,
                    },
                  },
                  errorMessages: {
                    required: 'Province is required',
                  },
                  component: 'dropdown',
                  name: 'province',
                  props: {
                    useScrollWhenIsOpen: false,
                    showScrollbar: true,
                    className: 'province',
                    dataTestId: 'province',
                    id: 'province',
                    label: 'Province',
                    options: '${api.postcode.provinces||[]}',
                    loading: '${api.postcode.loading||false}',
                  },
                },
                {
                  component: 'dropdown',
                  name: 'district',
                  validations: {
                    onBlur: {
                      required: true,
                    },
                  },
                  errorMessages: {
                    required: 'district is required',
                  },
                  props: {
                    useScrollWhenIsOpen: false,
                    showScrollbar: true,
                    className: 'district',
                    dataTestId: 'district',
                    id: 'district',
                    label: 'District',
                    loading: '${api.postcode.loading||false}',
                    options: '${global.districts||[]}',
                  },
                },
                {
                  validations: {
                    onBlur: {
                      required: true,
                    },
                  },
                  errorMessages: {
                    required: 'Sub district is required',
                  },
                  component: 'dropdown',
                  name: 'subDistrict',
                  props: {
                    useScrollWhenIsOpen: false,
                    showScrollbar: true,
                    className: 'subDistrict',
                    dataTestId: 'subDistrict',
                    id: 'subDistrict',
                    label: 'Sub District',
                    loading: '${api.postcode.loading||false}',
                    options: '${global.subDistricts||[]}',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const checkoutSchema2: TSchema = {
  components: [
    {
      component: '',
      name: '',
      children: [
        {
          name: '',
          component: 'formGroup',
          props: {
            fullWidth: true,
            horizontal: true,
            inputProps: { autoComplete: 'off' },
          },
          children: [
            {
              component: 'text',
              name: 'email2',
              validations: {
                onBlur: {
                  required: true,
                  email: true,
                },
              },
              filter: {
                maxLength: 50,
              },
              errorMessages: {
                required: 'E-mail is required',
                email: 'Please provide valid email address',
              },
              formatters: {
                onChange: {
                  capitalize: true,
                },
              },
              props: {
                dataTestId: 'email2',
                name: 'email2',
                id: 'email2',
                label: 'E-mail *',
                placeholder: '',
                inputProps: { autoComplete: 'off' },
                variants: 'bg-grey',
              },
            },
            {
              validations: {
                onBlur: {
                  required: true,
                  regex: '([0]{1})([6]{1}|[8-9]{1})([0-9]{8})',
                },
              },
              filter: {
                maxLength: 10,
              },
              errorMessages: {
                required: 'Mobile number is required',
                regex: 'Please provide valid 10 digit mobile number',
              },
              formatters: {
                onChange: {
                  capitalize: true,
                },
              },
              component: 'text',
              name: 'phoneNumber2',
              props: {
                dataTestId: 'phoneNumber2',
                name: 'phoneNumber2',
                id: 'phoneNumber2',
                label: 'Mobile number *',
                placeholder: '',
                inputProps: { autoComplete: 'off' },
                variants: 'bg-grey',
                maxLength: 10,
              },
            },
          ],
        },
      ],
    },
  ],
};

const checkoutSchema3: TSchema = {
  components: [
    {
      component: '',
      name: '',
      children: [
        {
          name: '',
          component: 'formGroup',
          props: {
            fullWidth: true,
            horizontal: true,
            inputProps: { autoComplete: 'off' },
          },
          children: [
            {
              component: 'text',
              name: 'email3',
              validations: {
                onBlur: {
                  required: true,
                  email: true,
                },
              },
              filter: {
                maxLength: 50,
              },
              errorMessages: {
                required: 'E-mail is required',
                email: 'Please provide valid email address',
              },
              formatters: {
                onChange: {
                  capitalize: true,
                },
              },
              props: {
                dataTestId: 'email3',
                name: 'email3',
                id: 'email3',
                label: 'E-mail *',
                placeholder: '',
                inputProps: { autoComplete: 'off' },
                variants: 'bg-grey',
              },
            },
            {
              validations: {
                onBlur: {
                  required: true,
                  regex: '([0]{1})([6]{1}|[8-9]{1})([0-9]{8})',
                },
              },
              filter: {
                maxLength: 10,
              },
              errorMessages: {
                required: 'Mobile number is required',
                regex: 'Please provide valid 10 digit mobile number',
              },
              formatters: {
                onChange: {
                  capitalize: true,
                },
              },
              component: 'text',
              name: 'phoneNumber3',
              props: {
                dataTestId: 'phoneNumber3',
                name: 'phoneNumber3',
                id: 'phoneNumber3',
                label: 'Mobile number *',
                placeholder: '',
                inputProps: { autoComplete: 'off' },
                variants: 'bg-grey',
                maxLength: 10,
              },
            },
          ],
        },
      ],
    },
  ],
};

const CollapseItem = (props: CollapseProps & { schema: TSchema }): ReactElement => {
  const [isValid, setIsValid] = useState<boolean | undefined>();
  const [isTriggeredValidateFormOnCloseCollapse, setIsTriggeredValidateFormOnCloseCollapse] = useState<boolean>(false);
  const formRef = useRef<TFormRefActions>();

  const validateOnBlur = useCallback(
    (data: TFormValues): void => {
      const isInputValid = formRef.current?.values({
        scopeBlurredChildren: true,
      })?.form?.isValid;

      const isFormValid = data?.form?.isValid;
      if (!isInputValid || (isInputValid && isFormValid)) {
        setIsValid(isFormValid);
      }

      if (!isTriggeredValidateFormOnCloseCollapse && isInputValid && !isFormValid) {
        setIsValid(undefined);
      }
    },
    [isTriggeredValidateFormOnCloseCollapse],
  );

  const handleClick = (): void => {
    if (isValid) props.handleNext?.();
    else {
      setIsValid(false);
      props.handleCloseAll?.();
    }
  };

  const validateOnCloseCollapse = (): void => {
    const formValidationResult = formRef?.current?.validateForm();
    setIsTriggeredValidateFormOnCloseCollapse(true);
    setIsValid(formValidationResult?.form?.isValid);
  };

  return (
    <Collapse {...props} isValid={isValid} onCloseCollapse={validateOnCloseCollapse}>
      <>
        <Form
          id={props.id}
          schema={props.schema}
          ref={formRef}
          onBlur={validateOnBlur}
          initialValues={{
            email: '',
            phoneNumber: '',
          }}
        />
        <Button text={'Next'} justifyContent="center" onClick={handleClick} design="secondary" />
      </>
    </Collapse>
  );
};

export interface CollapseGroupProps {
  openOneCollapseAtTime?: boolean;
  indexCollapseStartOpened?: number;
  children: ReactElement[];
}

const Template: Story<CollapseGroupProps> = (args) => {
  const customCollapsesProps = [
    {
      title: 'Personal Details 1',
      id: 'Personal Details 1',
      schema: personalDetails,
    },
    {
      title: 'Personal Details 2',
      id: 'Personal Details 2',
      schema: checkoutSchema2,
    },
    {
      title: 'Personal Details 3',
      id: 'Personal Details 3',
      schema: checkoutSchema3,
    },
  ];

  const children = customCollapsesProps.map((props, i) => <CollapseItem key={i} {...props} />);

  return (
    <div>
      <FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
        <CollapseGroup {...args}>{children}</CollapseGroup>
      </FormProvider>
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  openOneCollapseAtTime: true,
  indexCollapseStartOpened: 0,
};

export const Collapse1StartOpened = Template.bind({});

Collapse1StartOpened.args = {
  openOneCollapseAtTime: true,
  indexCollapseStartOpened: 1,
};

export const OpenMoreThanOne = Template.bind({});

OpenMoreThanOne.args = {
  openOneCollapseAtTime: false,
  indexCollapseStartOpened: 0,
};
