describe('Login', () => {

  const loginSel = (selector: string) => `login-${selector}`;
  const validEmail = 'steve.jobs@gmail.com';
  const validPassword = 'Aa123456';

  beforeEach(() => {
    cy.visit('/login')
  })

  it('should error when submitting  wrong credentials', () => {
    cy.getBySel(loginSel('email-input')).type(validEmail);

    cy.getBySel(loginSel('password-input')).type('invalid password');

    cy.getBySel(loginSel('submit-btn')).click();

    cy.getBySel(loginSel('error')).should('exist').and('include.text', 'Invalid credentials');
  })

  it('should navigate to join page when clicking join button', () => {
    cy.getBySel(loginSel('join-btn')).click();

    cy.url().should('contain', 'join');
  });

  it('should sign in successfully when submitting valid credentials', () => {
    cy.getBySel(loginSel('email-input')).type(validEmail);

    cy.getBySel(loginSel('password-input')).type(validPassword);

    cy.getBySel(loginSel('submit-btn')).click();

    cy.getBySel(loginSel('error')).should('not.exist')

    cy.url().should('contain', 'activities')
  })
})
