/* eslint-disable no-undef */
/// <reference types="cypress" />
// @ts-check

export const getIframeBody = () => {
  return cy.get('iframe').its('0.contentDocument.body').should('not.be.empty').then(cy.wrap);
};

export const inputContainsPlaceHolder = (id: string, value: string) =>
  getIframeBody().find(`#${id}`).invoke('attr', 'placeholder').should('contain', value);

export const inputContainsLabel = (name: string, value: string) =>
  getIframeBody().contains('label', value).invoke('attr', 'for').should('equal', name);

export const dropdownContainsLabel = (id: string, value: string) =>
  getIframeBody().find(`#${id}`).contains('label', value);

export const dropdownContainsAnyChild = (id: string, quantity: number) =>
  getIframeBody().find(`#${id}-list`).children().should('have.length', quantity);

export const fieldContaisErrorMessage = (id: string, value: string) => {
  getIframeBody().find(`[data-test-id="${id}-error"]`).should(`exist`);
  getIframeBody().find(`[data-test-id="${id}-error"]`).should('contain', value);
};

export const fieldDoNotContaisErrorMessage = (id: string) => {
  getIframeBody().find(`[data-test-id="${id}-error"]`).should(`not.exist`);
};

export const clicksButton = (id: string) => getIframeBody().find(`#${id}`).click();

export const clearField = (id: string) => getIframeBody().find(`#${id}`).clear();

export const focusOnField = (id: string) => getIframeBody().find(`#${id}`).focus();

export const typeTextOnInput = (id: string, value: string) => getIframeBody().find(`#${id}`).type(value);
