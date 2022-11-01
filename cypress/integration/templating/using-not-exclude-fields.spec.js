/* eslint-disable no-undef */
/// <reference types="cypress" />

import * as test from '../../utils/sharedTests';

// @ts-check

describe('Test templating and rehydrate on fields without `exclude` option', () => {
  beforeEach(() => {
    cy.visit('http://localhost:6006/?path=/story/form-templating--not-using-exclude-on-observables-templating');
  });

  it('changes fields', () => {
    test.inputContainsPlaceHolder('firstName', 'DEFAULT TEXT');
    test.clicksButton('observable-button');
    test.inputContainsPlaceHolder('firstName', 'NEW TEXT');
  });
});
