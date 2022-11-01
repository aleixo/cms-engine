import { EEVents } from 'core/events';
import { TComponent } from 'core/types';
import { events } from './rehydrate';
describe('Testing handlers/fiels/rehydrate', () => {
  it('Assert that events registered are the correct ones', () => {
    const component: TComponent = {
      component: 'input',
      name: 'field',
      rehydrate: {
        ON_FIELD_CHANGE: [],
        ON_FIELD_MOUNT: [],
      },
    };
    expect(events(component)).toEqual([EEVents.ON_FIELD_CHANGE, EEVents.ON_FIELD_MOUNT]);
  });
});
