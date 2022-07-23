describe('Activities', () => {
  beforeEach(() => {
    cy.login();
    cy.url().should('contain', 'activities');
  })

  afterEach(() => {
    cy.getBySel('header-profile-btn').click();
    cy.getBySel('header-logout-btn').click();
  })

  it('should show activities', () => {
    cy.get('hbd-activity-view').should('exist');
  })

  it('should open activity dialog when clicking see more', () => {
    cy.get('hbd-activity-view').first().find('.activity-view-btn').click();

    cy.get('hbd-activity-dialog').should('exist');

    cy.contains('Cancel').click();
  })
})
