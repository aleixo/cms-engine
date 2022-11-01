import { EEVents, Observer } from 'core/events';
import { register } from './flows';

describe('Testing handlers/flows', () => {
  it('Should call two handlers since they have no events restriction', async () => {
    const observer = new Observer('namespaaa', false);
    const h1 = jest.fn();
    const h2 = jest.fn();
    const handler1 = {
      handler: h1,
    };

    const handler2 = {
      handler: h2,
    };

    const flows = () => ({
      [EEVents.ON_FIELD_MOUNT]: [handler1, handler2],
    });
    register(observer, flows);
    await observer.publish(EEVents.ON_FIELD_MOUNT, {});
    expect(h1).toBeCalled();
    expect(h2).toBeCalled();
  });

  it('Should call not call any handler when published different event from flow', async () => {
    const observer = new Observer('namespasaaa', false);
    const h1 = jest.fn();
    const h2 = jest.fn();
    const handler1 = {
      handler: h1,
    };

    const handler2 = {
      handler: h2,
    };

    const flows = () => ({
      [EEVents.ON_FIELD_MOUNT]: [handler1, handler2],
    });
    register(observer, flows);
    await observer.publish(EEVents.ON_FIELD_CHANGE, {});
    expect(h1).not.toBeCalled();
    expect(h2).not.toBeCalled();
  });

  it('Should set static initial value from schema', async () => {
    const observer = new Observer('namedsadsaspaaa2', false);
    const h1 = jest.fn();
    const h2 = jest.fn();

    const handler1 = {
      handler: h1,
    };

    const handler2 = {
      handler: h2,
      events: () => [EEVents.ON_FIELD_CHANGE],
    };

    const flows = () => ({
      [EEVents.ON_FIELD_MOUNT]: [handler1, handler2],
    });
    register(observer, flows);
    await observer.publish(EEVents.ON_FIELD_MOUNT, {});
    expect(h1).toBeCalled();
    expect(h2).not.toBeCalled();
  });
});
