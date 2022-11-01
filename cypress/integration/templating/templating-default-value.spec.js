/* eslint-disable no-undef */
/// <reference types="cypress" />

import * as test from '../../utils/sharedTests';

// @ts-check

describe('Test templating on default value', () => {
  beforeEach(() => {
    cy.visit('http://localhost:6006/?path=/story/form-templating--templating-on-default');
  });

  it('the input receive a templating value DEFAULT and then it is changed by another field ', () => {
    test.inputContainsLabel('lastName', 'DEFAULT');
    test.typeTextOnInput('firstName', 'NEW MESSAGE');
    test.inputContainsLabel('lastName', 'NEW MESSAGE');
  });
});
