import { getFormInstance } from 'core';
import { ALL_NAMESPACE_EVENTS, BUILD_EVENT, Observer, CoreEvents, EEVents } from '.';

describe('Testing Observer', () => {
  it('Assert namespace', () => {
    const observer = new Observer('namespace');
    expect(observer.namespace).toBe('namespace');
  });

  it('Test building event to match all namespace events with ALL_NAMESPACE EVENTS', () => {
    expect(ALL_NAMESPACE_EVENTS(CoreEvents.NAVIGATE_STEP_BACK)).toEqual(
      new RegExp(`^(${CoreEvents.NAVIGATE_STEP_BACK}).*$`, 'g'),
    );
  });
  it('Test building event with path with BUILD_EVENT', () => {
    expect(BUILD_EVENT(EEVents.NAVIGATE_STEP_BACK, 'mypath')).toBe('NAVIGATE_STEP_BACK/mypath');
  });

  describe('Subscription assertions', () => {
    it('Assert that subscribe adds events to events queue and its callback', () => {
      const observer = new Observer('namespace');
      const subsCallback = jest.fn();

      observer.subscribe(CoreEvents.NAVIGATE_STEP_BACK, subsCallback);
      observer.subscribe(CoreEvents.NAVIGATE_STEP_FORWARD, subsCallback);
      observer.subscribe(CoreEvents.ON_FIELD_CHANGE, subsCallback);
      observer.subscribe(CoreEvents.ON_FIELD_MOUNT, subsCallback);

      expect(Object.keys(observer.events)).toEqual([
        'NAVIGATE_STEP_BACK',
        'NAVIGATE_STEP_FORWARD',
        'ON_FIELD_CHANGE',
        'ON_FIELD_MOUNT',
      ]);
    });

    it('Assert that subscribe adds events to events queue and its callback to the regex based event queue', () => {
      const observer = new Observer('namespace');
      const subsCallback = jest.fn();

      const event1 = ALL_NAMESPACE_EVENTS(CoreEvents.NAVIGATE_STEP_BACK);
      const event2 = ALL_NAMESPACE_EVENTS(CoreEvents.NAVIGATE_STEP_FORWARD);
      const event3 = ALL_NAMESPACE_EVENTS(CoreEvents.ON_FIELD_CHANGE);
      const event4 = ALL_NAMESPACE_EVENTS(CoreEvents.ON_FIELD_MOUNT);

      observer.subscribe(event1, subsCallback);
      observer.subscribe(event2, subsCallback);
      observer.subscribe(event3, subsCallback);
      observer.subscribe(event4, subsCallback);

      expect(observer.regexBasedEvents).toEqual({
        [event1.toString()]: { regex: event1, handlers: [subsCallback] },
        [event2.toString()]: { regex: event2, handlers: [subsCallback] },
        [event3.toString()]: { regex: event3, handlers: [subsCallback] },
        [event4.toString()]: { regex: event4, handlers: [subsCallback] },
      });
    });

    it('Assert that subscribe stores the subscription callback', () => {
      const observer = new Observer('namespace');
      const subsCallback = jest.fn();
      observer.subscribe(CoreEvents.NAVIGATE_STEP_BACK, subsCallback);
      observer.subscribe(CoreEvents.NAVIGATE_STEP_FORWARD, subsCallback);

      expect(observer.events).toEqual({
        [CoreEvents.NAVIGATE_STEP_BACK]: [subsCallback],
        [CoreEvents.NAVIGATE_STEP_FORWARD]: [subsCallback],
      });
    });

    it('Validates that subscribe returns unsubscribe it unsubscribes the event', () => {
      const observer = new Observer('namespace');
      const subsCallback = jest.fn();
      const subsCallback2 = jest.fn();

      const unsubSpy = jest.spyOn(observer, 'unsubscribe');
      const unsub = observer.subscribe(CoreEvents.NAVIGATE_STEP_BACK, subsCallback);
      observer.subscribe(CoreEvents.NAVIGATE_STEP_BACK, subsCallback2);

      expect(observer.events).toEqual({
        [CoreEvents.NAVIGATE_STEP_BACK]: [subsCallback, subsCallback2],
      });

      unsub();
      expect(unsubSpy).toBeCalledWith(CoreEvents.NAVIGATE_STEP_BACK, subsCallback);

      expect(observer.events).toEqual({
        [CoreEvents.NAVIGATE_STEP_BACK]: [subsCallback2],
      });
    });

    it('Should be able to fire all namespace events when using ALL_NAMESPACE_EVENTS', () => {
      const observer = new Observer('namespace');
      const cb = jest.fn();
      const cbAll = jest.fn();

      observer.subscribe(BUILD_EVENT(EEVents.NAVIGATE_STEP_BACK, 'mypath2'), cb);
      observer.subscribe(BUILD_EVENT(EEVents.NAVIGATE_STEP_BACK, 'mypath3'), cb);

      const subSpy = jest.spyOn(observer, 'subscribe');

      observer.subscribe(ALL_NAMESPACE_EVENTS(CoreEvents.NAVIGATE_STEP_BACK), cbAll);

      expect(subSpy).toBeCalledTimes(2);
    });

    it.skip('Asserts the payload received on the subscriber when someone publishes', () => {
      const form = getFormInstance('sss');
      const subsCb = jest.fn();
      form.subscribe(CoreEvents.NAVIGATE_STEP_BACK, subsCb);
      form.publish(CoreEvents.NAVIGATE_STEP_BACK, { pubData: true });

      expect(subsCb).toBeCalledWith({
        eventReducedSchema: undefined,
        coreEvent: EEVents.NAVIGATE_STEP_BACK,
        namespace: 'sss',
        form,
        field: undefined,
        event: CoreEvents.NAVIGATE_STEP_BACK,
        data: {
          pubData: true,
        },
        payload: { pubData: true },
      });
    });
  });

  describe('Publish assertions', () => {
    it('Should call subscriptions when publish', () => {
      const observer = new Observer('namespace');
      const subsCb = jest.fn();
      observer.subscribe(CoreEvents.NAVIGATE_STEP_BACK, subsCb);
      observer.publish(CoreEvents.NAVIGATE_STEP_BACK);

      expect(subsCb).toBeCalled();
    });

    it('Should call all namespace subscriptions when used with ALL_NAMESPACE_EVENTS', () => {
      const observer = new Observer('namespace');
      const subsCb = jest.fn();
      const subsCb2 = jest.fn();

      observer.subscribe(CoreEvents.NAVIGATE_STEP_BACK, subsCb);
      observer.subscribe(CoreEvents.NAVIGATE_STEP_BACK, subsCb2);

      observer.publish(CoreEvents.NAVIGATE_STEP_BACK);

      expect(subsCb).toBeCalled();
      expect(subsCb).toBeCalled();
    });

    it('Validate that subscriptions responses are accumulated', async () => {
      const observer = new Observer('namespace');

      observer.subscribe(CoreEvents.NAVIGATE_STEP_BACK, () => ({ sub1: true }));
      observer.subscribe(CoreEvents.NAVIGATE_STEP_BACK, () => ({ sub2: true }));

      const subsResult = await observer.publish(CoreEvents.NAVIGATE_STEP_BACK);
      expect(subsResult).toEqual({
        erroredFields: [],
        fields: {},
        form: {
          isValid: false,
          messages: [],
          scope: {},
          steps: {
            currentStepSchema: undefined,
            data: {},
            index: 0,
            isValid: false,
            navigated: false,
            numSteps: undefined,
          },
        },
        formatted: {},
        predictableErroredFields: [],
        sub1: true,
        sub2: true,
      });
    });
  });
});
