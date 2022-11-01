import { run, generateCustomError, hasError } from './validations';

describe('Testing core/apis/validations', () => {
  it('Tests the generateCustomError()', () => {
    expect(generateCustomError('errorName', 'error message')).toEqual({
      errorName: { fail: true, message: 'error message', value: undefined },
    });
  });
  describe('Test hasError()', () => {
    it('To be true', () => {
      expect(
        hasError({
          required: {
            value: '',
            fail: true,
            message: 'message',
          },
        }),
      ).toBeTruthy();
    });
    it('To be false', () => {
      expect(
        hasError({
          required: {
            value: 's',
            fail: false,
            message: 'message',
          },
        }),
      ).toBeFalsy();
    });
  });

  it('Asserts default error message', () => {
    expect(
      run(
        '',
        {
          required: true,
        },
        {
          default: 'message',
        },
      ),
    ).toEqual({
      required: {
        fail: true,
        message: 'message',
        validationValue: true,
      },
    });
  });
  it('Asserts error message', () => {
    expect(
      run(
        '',
        {
          required: true,
        },
        {
          required: 'message required',
        },
      ),
    ).toEqual({
      required: {
        fail: true,
        message: 'message required',
        validationValue: true,
      },
    });
  });
  describe('Test Required validation', () => {
    it('Empty value should fail', () => {
      expect(
        run('', {
          required: true,
        }),
      ).toEqual({
        required: {
          fail: true,
          message: undefined,
          validationValue: true,
        },
      });
    });
    it('Valid value should not fail', () => {
      expect(
        run('sss', {
          required: true,
        }),
      ).toEqual({
        required: {
          fail: false,
          message: undefined,
          validationValue: true,
        },
      });
    });
    it('Undefined value should fail', () => {
      expect(
        run(undefined, {
          required: true,
        }),
      ).toEqual({
        required: {
          fail: true,
          message: undefined,
          validationValue: true,
        },
      });
    });
  });
  describe('Test length validation', () => {
    it('Same length should fail', () => {
      expect(
        run('22', {
          length: 2,
        }),
      ).toEqual({
        length: {
          fail: true,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Larger length should not fail', () => {
      expect(
        run('sss', {
          length: 2,
        }),
      ).toEqual({
        length: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Smaller length should not fail', () => {
      expect(
        run('s', {
          length: 2,
        }),
      ).toEqual({
        length: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
  });
  describe('Test greaterThan validation', () => {
    it('Test with the same value should fail', () => {
      expect(
        run('', {
          greaterThan: 2,
        }),
      ).toEqual({
        greaterThan: {
          fail: true,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with a smaller value should fail', () => {
      expect(
        run('', {
          greaterThan: 2,
        }),
      ).toEqual({
        greaterThan: {
          fail: true,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with bigger value, should succeed', () => {
      expect(
        run('sss', {
          greaterThan: 2,
        }),
      ).toEqual({
        greaterThan: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
  });
  describe('Test lessThan validation', () => {
    it('Test with the same value should succeed', () => {
      expect(
        run('2', {
          lessThan: 2,
        }),
      ).toEqual({
        lessThan: {
          fail: true,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with a smaller length should suceed', () => {
      expect(
        run('1', {
          lessThan: 2,
        }),
      ).toEqual({
        lessThan: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with a larger length should fail', () => {
      expect(
        run('3', {
          lessThan: 2,
        }),
      ).toEqual({
        lessThan: {
          fail: true,
          message: undefined,
          validationValue: 2,
        },
      });
    });
  });
  describe('Test maxLength validation', () => {
    it('Test with the same value should succeed', () => {
      expect(
        run('dd', {
          maxLength: 2,
        }),
      ).toEqual({
        maxLength: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with the larger value should fail', () => {
      expect(
        run('ddd', {
          maxLength: 2,
        }),
      ).toEqual({
        maxLength: {
          fail: true,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with the smaller value should suceed', () => {
      expect(
        run('a', {
          maxLength: 2,
        }),
      ).toEqual({
        maxLength: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with  no value should succeed', () => {
      expect(
        run('', {
          maxLength: 2,
        }),
      ).toEqual({
        maxLength: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with  undefined should succeed', () => {
      expect(
        run('', {
          maxLength: 2,
        }),
      ).toEqual({
        maxLength: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
  });
  describe('Test minLength validation', () => {
    it('Test with the same value should succeed', () => {
      expect(
        run('dd', {
          minLength: 2,
        }),
      ).toEqual({
        minLength: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with the larger value should succeed', () => {
      expect(
        run('ddd', {
          minLength: 2,
        }),
      ).toEqual({
        minLength: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with the smaller value should fail', () => {
      expect(
        run('a', {
          minLength: 2,
        }),
      ).toEqual({
        minLength: {
          fail: true,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with no value should fail', () => {
      expect(
        run('', {
          minLength: 2,
        }),
      ).toEqual({
        minLength: {
          fail: true,
          message: undefined,
          validationValue: 2,
        },
      });
    });
  });
  describe('Test maxLength validation', () => {
    it('Test with the same value should succeed', () => {
      expect(
        run('dd', {
          maxLength: 2,
        }),
      ).toEqual({
        maxLength: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
  });
  describe('Test value validation', () => {
    it('Correct value should not fail', () => {
      expect(
        run('bolt', {
          value: 'bolt',
        }),
      ).toEqual({
        value: {
          fail: false,
          message: undefined,
          validationValue: 'bolt',
        },
      });
    });
    it('Different value should fail', () => {
      expect(
        run('bolttech', {
          value: 'bolt',
        }),
      ).toEqual({
        value: {
          fail: true,
          message: undefined,
          validationValue: 'bolt',
        },
      });
    });
    it('Undefined value should fail', () => {
      expect(
        run(undefined, {
          value: 'bolt',
        }),
      ).toEqual({
        value: {
          fail: true,
          message: undefined,
          validationValue: 'bolt',
        },
      });
    });
  });
  describe('Test regex validation', () => {
    it('Correct value should not fail', () => {
      expect(
        run('bolt', {
          value: 'bolt',
        }),
      ).toEqual({
        value: {
          fail: false,
          message: undefined,
          validationValue: 'bolt',
        },
      });
    });
  });
  describe('Test e-mail validation', () => {
    it('Correct email should not fail', () => {
      expect(
        run('diogo.aleixo@bolttech.io', {
          email: true,
        }),
      ).toEqual({
        email: {
          fail: false,
          message: undefined,
          validationValue: true,
        },
      });
    });
    it('Incorrect email should not fail', () => {
      expect(
        run('diogo.aleixo@bolttech.i', {
          email: true,
        }),
      ).toEqual({
        email: {
          fail: true,
          message: undefined,
          validationValue: true,
        },
      });
    });
    it('Undefined email should not fail', () => {
      expect(
        run(undefined, {
          email: true,
        }),
      ).toEqual({
        email: {
          fail: true,
          message: undefined,
          validationValue: true,
        },
      });
    });
  });

  // TODO - Put here the other credit cards validation
  describe('Test isCreditCard validation', () => {
    it('Correct credit card should not fail', () => {
      expect(
        run('4242424242424242', {
          isCreditCard: true,
        }),
      ).toEqual({
        isCreditCard: {
          fail: false,
          message: undefined,
          validationValue: true,
          metadata: {
            creditCardCC: 'CVV',
            creditCardCCSize: 3,
            typeCard: 'visa',
          },
        },
      });
    });
  });
  describe('Test url validation', () => {
    it('Correct url should not fail', () => {
      expect(
        run('www.google.pt', {
          url: true,
        }),
      ).toEqual({
        url: {
          fail: false,
          message: undefined,
          validationValue: true,
        },
      });
    });
    it('Correct url (no www) should not fail', () => {
      expect(
        run('google.pt', {
          url: true,
        }),
      ).toEqual({
        url: {
          fail: false,
          message: undefined,
          validationValue: true,
        },
      });
    });
    it('Incorrect url should not fail', () => {
      expect(
        run('google.', {
          url: true,
        }),
      ).toEqual({
        url: {
          fail: true,
          message: undefined,
          validationValue: true,
        },
      });
    });
    it('Undefined url should not fail', () => {
      expect(
        run(undefined, {
          url: true,
        }),
      ).toEqual({
        url: {
          fail: true,
          message: undefined,
          validationValue: true,
        },
      });
    });
  });
});
