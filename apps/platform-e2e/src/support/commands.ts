// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(): void;

    getBySel(selector: string): Chainable<any>;
  }
}

Cypress.Commands.add('login', () => {
  cy.visit('login');
  
  cy.getBySel('login-email-input').type('steve.jobs@gmail.com');

  cy.getBySel('login-password-input').type('Aa123456');

  cy.getBySel('login-submit-btn').click();
});

Cypress.Commands.add('getBySel', (selector: string) => {
  return cy.get(
    `[data-cy=${selector}]`);
});

