import { TComponent } from 'core/types';
import { run } from './masks';
describe('Testing core/apis/masks', () => {
  describe('Tests replace mask', () => {
    it('Tests with a number', () => {
      const component: TComponent = {
        component: 'input',
        name: 'field',
        masks: {
          ON_FIELD_BLUR: {
            replaceAll: 2,
          },
        },
      };
      expect(run('1234', component.masks?.ON_FIELD_BLUR!)).toEqual('2222');
    });

    it('Tests with a string', () => {
      const component: TComponent = {
        component: 'input',
        name: 'field',
        masks: {
          ON_FIELD_BLUR: {
            replaceAll: '*',
          },
        },
      };
      expect(run('1234', component.masks?.ON_FIELD_BLUR!)).toEqual('****');
    });

    it('Tests invalid mask', () => {
      const component: TComponent = {
        component: 'input',
        name: 'field',
        masks: {
          ON_FIELD_BLUR: {
            replaceAll: '*',
          },
        },
      };
      expect(run(1234 as unknown as string, component.masks?.ON_FIELD_BLUR!)).toEqual(1234);
    });
  });

  it('Tests hideCardNumber', () => {
    const component: TComponent = {
      component: 'input',
      name: 'field',
      masks: {
        ON_FIELD_CHANGE: {
          hideCardNumber: true,
        },
      },
    };
    expect(run('4242 4242 4242 4242', component.masks?.ON_FIELD_CHANGE!)).toEqual('xxxx xxxx xxxx 4242');
  });
  it('Tests cardMask', () => {
    const component: TComponent = {
      component: 'input',
      name: 'field',
      masks: {
        ON_FIELD_CHANGE: {
          cardMask: true,
        },
      },
    };
    expect(run('100', component.masks?.ON_FIELD_CHANGE!)).toEqual('100');
  });
  it('Tests cardDate', () => {
    const component: TComponent = {
      component: 'input',
      name: 'field',
      masks: {
        ON_FIELD_CHANGE: { cardDate: true },
      },
    };
    expect(run('1022', component.masks?.ON_FIELD_CHANGE!)).toEqual('10/22');
  });
  it('Tests feinMask', () => {
    const component: TComponent = {
      component: 'input',
      name: 'field',
      masks: {
        ON_FIELD_CHANGE: {
          feinMask: true,
        },
      },
    };
    expect(run('321312312', component.masks?.ON_FIELD_CHANGE!)).toEqual('32-1312312');
  });
  it('Tests currencyMask', () => {
    const component: TComponent = {
      component: 'input',
      name: 'field',
      masks: {
        ON_FIELD_CHANGE: {
          currencyMask: {
            locale: 'en-US',
            currency: 'USD',
          },
        },
      },
    };
    expect(run('100', component.masks?.ON_FIELD_CHANGE!)).toEqual('$100');
  });
  it('Tests cardNumber', () => {
    const component: TComponent = {
      component: 'input',
      name: 'field',
      masks: {
        ON_FIELD_CHANGE: {
          cardNumber: true,
        },
      },
    };
    expect(run('10101987', component.masks?.ON_FIELD_CHANGE!)).toEqual('xxxx1987');
  });
  it('Tests generic', () => {
    expect(
      run('dsadasdsa', {
        generic: [
          {
            from: 1,
            to: 2,
            mask: 'X',
          },
          {
            from: 3,
            to: 5,
            mask: 'Y',
          },
        ],
      }),
    ).toEqual('XXYYYsdsa');
  });
});
