import * as Events from 'core/events';

export const handler = ({ form, event }: Events.TEventInformation) => {
  const mapperNextStepIndex = {
    [Events.CoreEvents.NAVIGATE_STEP_BACK]: form.step.index - 1,
    [Events.CoreEvents.NAVIGATE_STEP_FORWARD]: form.step.index + 1,
  };

  const nextStepIndex = mapperNextStepIndex[event];
  if (!form.schema?.components[mapperNextStepIndex[event]]) {
    form.step = {
      ...form.step,
      navigated: false,
    };
    return;
  }

  const nextStep = form.schema.components[nextStepIndex];

  form.step = {
    ...form.step,
    numSteps: form.schema.components.length,
    navigated: !!form.schema.components[nextStepIndex],
    index: !!form.schema.components[nextStepIndex] ? nextStepIndex : form.step.index,
    currentStepSchema: !!form.schema.components[nextStepIndex] ? nextStep : form.step.currentStepSchema,
  };
};
