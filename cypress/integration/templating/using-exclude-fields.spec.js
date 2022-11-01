/* eslint-disable no-undef */
/// <reference types="cypress" />

import * as test from '../../utils/sharedTests';

// @ts-check

describe('Test templating and rehydrate on fields with `exclude` option', () => {
  beforeEach(() => {
    cy.visit('http://localhost:6006/?path=/story/form-templating--using-exclude-on-observables-templating');
  });

  it('templating do not change fields from excluded list', () => {
    test.inputContainsPlaceHolder('firstName', 'DEFAULT TEXT');
    test.clicksButton('observable-button');
    test.inputContainsPlaceHolder('firstName', 'DEFAULT TEXT');
  });

  it('effect of rehydrate changes the label of another input that is not in excluded list', () => {
    test.inputContainsLabel('lastName', 'DEFAULT');
    test.typeTextOnInput('firstName', 'NEW MESSAGE');
    test.inputContainsLabel('lastName', 'NEW MESSAGE');
  });

  it('effect of rehydrate changes the error message of another input that is not in excluded list', () => {
    test.focusOnField('lastName');
    test.typeTextOnInput('firstName', 'NEW MESSAGE');
    test.fieldContaisErrorMessage('lastName', 'NEW MESSAGE');
  });
});
