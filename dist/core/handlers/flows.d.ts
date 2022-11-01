import { TComponent } from '../index.js';
import * as Events from '../events/index.js';
import * as change from './field/change.js';
import * as mount from './field/mount.js';
import * as blur from './field/blur.js';
import * as focus from './field/focus.js';
import * as hooks from './form/hooks.js';
import * as steps from './form/steps.js';
import * as validate from './form/validate.js';
declare const register: (observer: Events.Observer, flows: any, component?: TComponent) => void;
declare const fieldFlows: () => {
    ON_FIELD_MOUNT: (typeof mount)[];
    ON_FIELD_CHANGE: (typeof change)[];
    ON_FIELD_BLUR: (typeof blur)[];
    ON_FIELD_FOCUS: (typeof focus)[];
};
declare const formFlows: () => {
    ON_FORM_MOUNT: (typeof steps)[];
    VALIDATE_FORM: (typeof validate)[];
    ON_FORM_SUBMIT: (typeof hooks)[];
    ON_FORM_UN_MOUNT: (typeof hooks)[];
    NAVIGATE_STEP_BACK: (typeof steps)[];
    NAVIGATE_STEP_FORWARD: (typeof steps)[];
    ON_FORM_REHYDRATE: never[];
};
export { register, fieldFlows, formFlows };
