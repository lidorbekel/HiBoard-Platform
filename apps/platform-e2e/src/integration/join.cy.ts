describe('Join', () => {

  const joinSel = (selector: string) => `join-${selector}`;

  beforeEach(() => {
    cy.visit('/join');
  })

  it('should be able to submit only if form is valid', () => {
    cy.getBySel(joinSel('firstName-input')).type('firstName')
    cy.getBySel(joinSel('lastName-input')).type('lastName')
    cy.getBySel(joinSel('email-input')).type(`${Math.random().toString(36).slice(2, 7)}@gmail.com`)
    cy.getBySel(joinSel('password-input')).type('password')

    cy.getBySel(joinSel('submit-btn')).should('be.disabled');

    cy.getBySel(joinSel('company-input')).type('company name')

    cy.getBySel(joinSel('submit-btn')).should('be.enabled');
  })
})
