import { TComponent } from 'core';
import * as Events from 'core/events';
import { EEVents } from 'core/events';
import { TFlowType } from 'core/types';

//Field handlers
import * as change from './field/change';
import * as mount from './field/mount';
import * as blur from './field/blur';
import * as focus from './field/focus';
import * as templating from './field/templating';
import * as api from './field/api';
import * as data from './field/data';
import * as clearFields from './field/clearFields';
import * as rehydrate from './field/rehydrate';
import * as visibilityConditions from './field/visibilityConditions';
import * as htmlEventParser from './field/htmlEventParser';
import * as formatters from './field/formatters';
import * as filter from './field/filter';
import * as masks from './field/masks';
import * as validations from './field/validations';
//Form handlers
import * as hooks from './form/hooks';
import * as steps from './form/steps';
import * as validate from './form/validate';

const register = (observer: Events.Observer, flows: any, component?: TComponent) => {
  const flow = flows() as TFlowType;
  Object.keys(flow).forEach((event: EEVents) => {
    flow[event].forEach((handler) => {
      if (handler.events) {
        const events = handler.events(component);
        if (Array.isArray(events) && !events.includes(event)) return;
      }

      observer.subscribe(Events.BUILD_EVENT(event, component?.name), handler.handler);
    });
  });
};

const fieldFlows = () => ({
  [EEVents.ON_FIELD_MOUNT]: [
    mount,
    templating,
    api,
    validations,
    formatters,
    visibilityConditions,
    clearFields,
    rehydrate,
    templating,
    masks,
    data,
  ],
  [EEVents.ON_FIELD_CHANGE]: [
    htmlEventParser,
    filter,
    change,
    validations,
    formatters,
    api,
    visibilityConditions,
    clearFields,
    rehydrate,
    templating,
    data,
    masks,
  ],
  [EEVents.ON_FIELD_BLUR]: [
    blur,
    formatters,
    masks,
    validations,
    templating,
    api,
    visibilityConditions,
    clearFields,
    data,
  ],
  [EEVents.ON_FIELD_FOCUS]: [focus, masks],
});

const formFlows = () => ({
  [EEVents.ON_FORM_MOUNT]: [hooks, steps, validate],
  [EEVents.VALIDATE_FORM]: [validate],
  [EEVents.ON_FORM_SUBMIT]: [hooks],
  [EEVents.ON_FORM_UN_MOUNT]: [hooks],
  [EEVents.NAVIGATE_STEP_BACK]: [steps],
  [EEVents.NAVIGATE_STEP_FORWARD]: [steps],
  [EEVents.ON_FORM_REHYDRATE]: [],
});

export { register, fieldFlows, formFlows };
