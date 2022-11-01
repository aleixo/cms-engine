import { EEVents } from 'core/events';
import { getFormInstance } from 'core/managers';
import { handler } from './steps';

const schema = {
  components: [
    { component: 'input', name: 'step1', children: [] },
    { component: 'input', name: 'step2', children: [] },
  ],
};

describe('Testing core/form/steps', () => {
  it('Should navigate forward', () => {
    const form = getFormInstance('asdawq', { schema });
    handler({ form, event: EEVents.NAVIGATE_STEP_FORWARD });
    expect(form.step).toEqual({
      currentStepSchema: schema.components[1],
      data: {},
      index: 1,
      isValid: false,
      navigated: true,
      numSteps: schema.components.length,
    });
  });

  it('Should navigate back', () => {
    const form = getFormInstance('asdawq', { schema });
    form.step = {
      currentStepSchema: schema.components[1],
      data: {},
      index: 1,
      isValid: false,
      navigated: false,
      numSteps: schema.components.length,
    };
    handler({ form, event: EEVents.NAVIGATE_STEP_BACK });
    expect(form.step).toEqual({
      currentStepSchema: schema.components[0],
      data: {},
      index: 0,
      isValid: false,
      navigated: true,
      numSteps: schema.components.length,
    });
  });
  it('Should stay in the same step when going forward but no more steps', () => {
    const form = getFormInstance('asdawq', { schema });
    form.step = {
      currentStepSchema: schema.components[1],
      data: {},
      index: 1,
      isValid: false,
      navigated: false,
      numSteps: schema.components.length,
    };
    handler({ form, event: EEVents.NAVIGATE_STEP_FORWARD });
    expect(form.step).toEqual({
      currentStepSchema: schema.components[1],
      data: {},
      index: 1,
      isValid: false,
      navigated: false,
      numSteps: schema.components.length,
    });
  });

  it('Should stay in the same step when going backward but no more steps', () => {
    const form = getFormInstance('asdawdddq', { schema });

    handler({ form, event: EEVents.NAVIGATE_STEP_BACK });
    expect(form.step).toEqual({
      currentStepSchema: schema.components[0],
      data: {},
      index: 0,
      isValid: false,
      navigated: false,
      numSteps: schema.components.length,
    });
  });
});
