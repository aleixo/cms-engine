/* eslint-disable no-undef */
/// <reference types="cypress" />
// @ts-check
import * as utils from '../../../src/form/core/utils';

const getIframeBody = () => {
  return cy.get('iframe').its('0.contentDocument.body').should('not.be.empty').then(cy.wrap);
};

const mockData = [
  {
    id: 'VISA',
    value: '4012888888881881',
  },
  {
    id: 'MASTER_CARD',
    value: '5555555555555555',
  },
  {
    id: 'AMERICAN_EXPRESS',
    value: '371449635398431',
  },
  {
    id: 'DINERS_CLUB',
    value: '36148900647913',
  },
  {
    id: 'DISCOVER',
    value: '6011000990139424',
  },
  {
    id: 'JCB',
    value: '3566002020360505',
  },
  {
    id: 'UNION_PAY',
    value: '8171999927660000',
  },
  {
    id: 'MIR',
    value: '2204941877211882',
  },
  {
    id: 'ELO',
    value: '5066991111111118',
  },
  {
    id: 'HIPER_CARD',
    value: '6062828888666688',
  },
];

describe('Valid length and label comparing number card and cvv', () => {
  beforeEach(() => {
    cy.visit('http://localhost:6006/?path=/story/form-validations--credit-card');
  });

  it('Cards Providers: cvv length and label test VALID', () => {
    mockData.map(({ value }) => {
      getIframeBody().find('#numberCard').type(value);
      const [result] = utils.creditCard.getTypeCard(value);
      getIframeBody().find('label').contains(result.code.name);
      getIframeBody().find('#cvv').type('1'.repeat(result.code.size));
      getIframeBody().find('[data-test-id="cvv-error"]').should('not.exist');
      getIframeBody().find('#numberCard').clear();
      getIframeBody().find('#cvv').clear();
    });
  });

  it('Cards Providers: cvv length and label test NOT VALID', () => {
    mockData.map(({ value }) => {
      getIframeBody().find('#numberCard').type(value);
      const [result] = utils.creditCard.getTypeCard(value);
      getIframeBody().find('label').contains(result.code.name);
      getIframeBody()
        .find('#cvv')
        .type('1'.repeat(result.code.size - 1));
      getIframeBody().find('[data-test-id="cvv-error"]').should('exist');
      getIframeBody().find('#numberCard').clear();
      getIframeBody().find('#cvv').clear();
    });
  });
});
