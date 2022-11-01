import { CoreEvents, Observer } from 'core/events';
import Base from './Base';

const namespace = 'name';
let observer;
beforeEach(() => {
  observer = new Observer(namespace);
});
describe('Testing Base class for managers', () => {
  it('Calls observer publish with the correct args', () => {
    const baseInstance = new Base(observer);
    const spiedPublish = jest.spyOn(baseInstance, 'publish');
    const publishData = { dummyData: true };
    baseInstance.publish(CoreEvents.NAVIGATE_STEP_BACK, publishData);
    expect(spiedPublish).toBeCalled();
    expect(spiedPublish).toBeCalledWith(CoreEvents.NAVIGATE_STEP_BACK, publishData);
  });

  it('Calls observer subscribe with the correct args', () => {
    const baseInstance = new Base(observer);
    const spiedPublish = jest.spyOn(baseInstance, 'subscribe');
    const subscribeCallback = jest.fn();
    baseInstance.subscribe(CoreEvents.NAVIGATE_STEP_BACK, subscribeCallback);
    expect(spiedPublish).toBeCalled();
    expect(spiedPublish).toBeCalledWith(CoreEvents.NAVIGATE_STEP_BACK, subscribeCallback);
  });

  it('Calls observer subscribe with the correct args', () => {
    const baseInstance = new Base(observer);
    const spiedPublish = jest.spyOn(baseInstance, 'subscribeBulk');
    const subscribeCallback = jest.fn();

    baseInstance.subscribeBulk([CoreEvents.NAVIGATE_STEP_BACK], subscribeCallback);

    expect(spiedPublish).toBeCalled();
    expect(spiedPublish).toBeCalledWith([CoreEvents.NAVIGATE_STEP_BACK], subscribeCallback);
  });

  it('Assert only one topic subscriber ', () => {
    const baseInstance = new Base(observer);

    const subscribeCallback = jest.fn();

    baseInstance.subscribe(CoreEvents.NAVIGATE_STEP_BACK, subscribeCallback);
    baseInstance.subscribe(CoreEvents.NAVIGATE_STEP_BACK, subscribeCallback);
    baseInstance.subscribe(CoreEvents.NAVIGATE_STEP_BACK, subscribeCallback);
    baseInstance.subscribe(CoreEvents.NAVIGATE_STEP_BACK, subscribeCallback);

    expect(Object.keys(baseInstance.subscriptions)).toEqual([CoreEvents.NAVIGATE_STEP_BACK]);
  });

  it('Assert debounce time ', () => {
    const baseInstance = new Base(observer);

    baseInstance.debounceTime = 10;
    expect(baseInstance.debounceTime).toBe(10);
  });
});
