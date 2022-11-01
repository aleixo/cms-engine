/* eslint-disable no-undef */
/// <reference types="cypress" />
// @ts-check

const getIframeBodyEffects = () => {
  return cy.get('iframe').its('0.contentDocument.body').should('not.be.empty').then(cy.wrap);
};

describe('Validate if a value is in one list or not', () => {
  beforeEach(() => {
    cy.visit('http://localhost:6006/?path=/story/form-effect--rehydrate-fields');
  });

  it('effect of rehydrate force fields validation', () => {
    getIframeBodyEffects().find('#firstName').type('some string here');
    getIframeBodyEffects().find('[data-test-id="lastName-error"]').should('not.exist');
    getIframeBodyEffects().find('#firstName').clear();
  });
});
