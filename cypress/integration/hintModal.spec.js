describe('Hint Modal', () => {
  before(() => {
    cy.visit('/');
  });
  it('should render modal on clicking lect', () => {
    cy.get('.SentenceLectsWrapper')
      .contains('Jacques')
      .click();

    cy.get('[data-testid="hint_modal"]')
      .should('be.visible');

    cy.get('[data-testid="hint_modal"]')
      .find('[data-testid="text"]')
      .should('contain', 'Text: Jacques');

    cy.get('[data-testid="hint_modal"]')
      .find('[data-testid="translation"]')
      .should('contain', 'Translation: James');

    cy.get('[data-testid="hint_modal"]')
      .find('[data-testid="full-text"]')
      .should('contain', 'Full Text:  Frère Jacques.');

    cy.get('[data-testid="hint_modal"]')
      .find('[data-testid="full-translation"]')
      .should('contain', 'Full Translation: Brother James.');

    cy.get('[data-testid="hint_modal"]')
      .find('[data-testid="explanation"]')
      .should('contain', 'Explanation: In the English version of the song this is rendered as "John" but a more accurate translation would be "James" or "Jacob", from the Latin "Iacobus".');
  });
});
