describe("Login Page", () => {
  beforeEach(() => {
    // visit to login page
    cy.visit("https://sakshingp.github.io/assignment/login.html");
  });

  it("should successfully login with valid credentials and navigate to the home page", () => {
    cy.get("#username").type("validUsername");
    cy.get("#password").type("validPassword");
    cy.get("#log-in").click();
    // Add assertions to verify successful navigation to the home page
    cy.url().should("include", "home.html");
  });
});

describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("https://sakshingp.github.io/assignment/login.html");
    cy.get("#username").type("validUsername");
    cy.get("#password").type("validPassword");
    cy.get("#log-in").click();
    // Add assertions to verify successful navigation to the home page again with another username and password
    cy.url().should("include", "home.html");
  });

  it("should click the AMOUNT header in the transaction table and check if the values are sorted", () => {
    
    cy.get("#transactionsTable") // Assuming the transaction table has an id "transactionsTable"
      .find("th") // Assuming the header cells are "th" elements
      .contains("Amount")
      .click()
      .then(() => {
        // Fetch the amount one by one
        cy.get("#transactionsTable tbody tr")
          .find("td.text-right")
          .then((amountCells) => {
            const amounts = Array.from(amountCells, (cell) =>
              parseFloat(cell.textContent.trim().replace(/[^0-9.-]+/g, ""))
            );
            // Store and sort the amount in sortedAmounts
            const sortedAmounts = [...amounts].sort((a, b) => a - b);

            // Verify if the amounts are sorted in ascending order
            expect(amounts).to.deep.equal(sortedAmounts);
          });
      });
  });
});
