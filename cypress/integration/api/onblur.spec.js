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
  it('test blur api call', () => {
    cy.visit('http://localhost:6006/?path=/story/form-api-calls--on-blur');
    getIframeBody().find('#chuckJoke').should('have.value', '');
    getIframeBody().find('#firstName').focus();
    getIframeBody().find('#chuckJoke').focus();
    cy.wait(2000);
    getIframeBody().find('#chuckJoke').should('not.have.value', '');
  });

  it('test change api call', () => {
    cy.visit('http://localhost:6006/?path=/story/form-api-calls--on-change');
    getIframeBody().find('#chuckJoke').should('have.value', '');
    getIframeBody().find('#firstName').type('Some text').trigger('input');
    cy.wait(2000);
    getIframeBody().find('#chuckJoke').should('not.have.value', '');
  });

  it('test not call api when field is not valid', () => {
    cy.visit('http://localhost:6006/?path=/story/form-api-calls--avoid-request-on-not-valid-field');
    getIframeBody().find('#chuckJoke').should('have.value', '');
    getIframeBody().find('#firstName').type('123').trigger('input');
    getIframeBody().find('#chuckJoke').should('have.value', '');
  });

  it('test call api when field is valid', () => {
    cy.visit('http://localhost:6006/?path=/story/form-api-calls--avoid-request-on-not-valid-field');
    getIframeBody().find('#chuckJoke').should('have.value', '');
    getIframeBody().find('#firstName').type('Some text here').trigger('input');
    cy.wait(2000);
    getIframeBody().find('#chuckJoke').should('not.have.value', '');
  });

  it('test api call with query string', () => {
    cy.visit('http://localhost:6006/?path=/story/form-api-calls--with-query-string');

    getIframeBody().find('#jokesCategorieCall').type('animal');
    getIframeBody().find('#jokesCategorieCall').focus();
    getIframeBody().find('#jokeWithCategory').focus();
    cy.wait(2000);
    getIframeBody().find('#jokeWithCategory').should('not.have.value', '');
  });

  it('test api call changing two props for the same field (label and placeholder)', () => {
    cy.visit('http://localhost:6006/?path=/story/form-api-calls--custom-body-post');

    getIframeBody()
      .find('#form_group')
      .contains('label', 'province_label')
      .invoke('attr', 'for')
      .should('equal', 'province');

    getIframeBody().find('#province').invoke('attr', 'placeholder').should('equal', 'province_placeholder');

    getIframeBody().find('#firstName').type('Some text');
    getIframeBody().find('#province').focus();

    cy.wait(2000);

    getIframeBody()
      .find('#form_group')
      .contains('label', 'Some text')
      .invoke('attr', 'for')
      .should('equal', 'province');

    getIframeBody().find('#province').invoke('attr', 'placeholder').should('equal', 'Some text');
  });
});
