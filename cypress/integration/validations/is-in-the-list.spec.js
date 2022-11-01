/* eslint-disable no-undef */
/// <reference types="cypress" />

import * as test from '../../utils/sharedTests';

// @ts-check

describe('Validate if a value is in one list or not', () => {
  beforeEach(() => {
    cy.visit('http://localhost:6006/?path=/story/form-validations--is-in-the-list');
  });

  afterEach(() => {
    test.clearField('notInTheList');
  });

  it('number is not in the list, error is shown', () => {
    test.typeTextOnInput('notInTheList', '4');
    test.fieldContaisErrorMessage('notInTheList', 'Should be in [1, 2, 3]');
  });

  it('number is in the list, no error is shown', () => {
    test.typeTextOnInput('notInTheList', '3');
    test.fieldDoNotContaisErrorMessage('notInTheList');
  });
});
