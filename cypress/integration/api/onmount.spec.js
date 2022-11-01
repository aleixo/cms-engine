/* eslint-disable no-undef */
/// <reference types="cypress" />
// @ts-check

const getIframeDocument = () => {
  return cy.get('iframe').its('0.contentDocument').should('exist');
};

const getIframeBody = () => {
  return cy.get('iframe').its('0.contentDocument.body').should('not.be.empty').then(cy.wrap);
};

describe('FORM API', () => {
  it('Test if the api is called and resolved', () => {
    cy.visit('http://localhost:6006/?path=/story/form-api-calls--on-mount');
    getIframeBody().find('#firstName').should('have.value', '');
    cy.wait(2000);
    getIframeBody().find('#chuckJoke').should('not.have.value', '');
  });
});
