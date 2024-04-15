describe("template tests Wizard Creator", () => {
  it("visitar o site e clicar no botão Criar Wizard", () => {
    cy.visit("http://localhost:3000/");

    cy.contains("Criar Wizard").click();

    cy.url().should("include", "http://localhost:3000/wizard-creator");
  });
  it("Clicar no botão criar página sem a orientação selecionada.", () => {
    cy.visit("http://localhost:3000/wizard-creator");

    cy.contains("Criar Wizard").click();
    cy.contains("Criar página").click();

    cy.contains("Escolha a orientação do wizard").should("exist");
  });
  it("Selecionar orientação e clicar no botão Criar página.", () => {
    cy.visit("http://localhost:3000/wizard-creator");

    cy.contains("Criar Wizard").click();

    cy.get("#select-orientation").click();

    cy.contains("Horizontal").click();

    cy.contains("Criar página").click();
  });
  it("Realizar fluxo de cadastro de componente na página", () => {
    cy.visit("http://localhost:3000/wizard-creator");

    cy.contains("Criar Wizard").click();

    cy.get("#select-orientation").click();

    cy.contains("Horizontal").click();

    cy.contains("Criar página").click();

    cy.get("#titulo").type("titulo da página");

    cy.get("#component-trigger").click();

    cy.contains("Text Area").click();
    cy.contains("Adicionar componente").click();

    cy.get("textarea").should("exist");
  });
  it("Realizar fluxo de cadastro da wizard", () => {
    cy.visit("http://localhost:3000/wizard-creator");

    cy.contains("Criar Wizard").click();

    cy.get("#select-orientation").click();

    cy.contains("Horizontal").click();

    cy.contains("Criar página").click();

    cy.get("#titulo").type("titulo da página");

    cy.get("#component-trigger").click();

    cy.contains("Text Area").click();
    cy.contains("Adicionar componente").click();

    cy.contains("Confirmar Página").click();

    cy.contains("Criar Wizard").click();

    cy.url().should("include", "http://localhost:3000/");
  });
  it("Ver Wizard Criada", () => {
    cy.visit("http://localhost:3000/wizard-creator");

    cy.contains("Criar Wizard").click();

    cy.get("#select-orientation").click();

    cy.contains("Horizontal").click();

    cy.contains("Criar página").click();

    cy.get("#titulo").type("titulo da página");

    cy.get("#component-trigger").click();

    cy.contains("Text Area").click();

    cy.contains("Adicionar componente").click();

    cy.contains("Confirmar Página").click();

    cy.contains("Criar Wizard").click();

    cy.contains("Ver Wizard").click();

    cy.url().should("include", "http://localhost:3000/wizard/0");
  });
});
