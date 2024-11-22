/* globals cy */
    
describe ('Test App', () => {
    beforeEach(() => {
        cy.visit('/');
      });
    
      it('launches', () => {
        // Basic launch test is already covered by beforeEach
        cy.url().should('eq', Cypress.config().baseUrl + '/');
      });
    
      it('shows Welcome to OHours', () => {
        // Test main heading
        cy.get('h1')
          .should('contain', 'Welcome to')
          .and('contain', 'OHours');
        
        // Test subtitle
        cy.get('p')
          .should('contain', 'Office Hours scheduling made easy');
      });
    
      it('takes user to pm landing when staff is clicked', () => {
        cy.get('a[href="/PMLand"]').click();
        cy.url().should('include', '/PMLand');
      });
    
      it('takes user to student landing when student is clicked', () => {
        cy.get('a[href="/student"]').click();
        cy.url().should('include', '/student');
      });
    
      it('displays staff and student navigation cards', () => {
        // Test Staff card
        cy.get('a[href="/PMLand"]').within(() => {
          cy.get('svg').should('exist'); // Check for Users icon
          cy.get('span').should('contain', 'Staff');
        });
    });
  
  });