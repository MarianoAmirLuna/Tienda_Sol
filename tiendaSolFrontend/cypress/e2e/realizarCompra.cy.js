describe("realizar una compra", () => {
  it("realizar una compra", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("#email").type("joaco23@gmail.com");
    cy.get("#password").type("123456");
    cy.contains("button", "Iniciar sesión").click();

    // 3. Ahora sí la página cargó logueada
    cy.get(".max-w-7xl.mx-auto.px-6.py-10.grid.gap-8").children().eq(1).click();

    const botonSumar = cy.get("button.text-xl.font-bold").eq(1);

    botonSumar.click();
    botonSumar.click();

    cy.get("span.text-lg.font-bold").should("have.text", "3");

    cy.get("button.font-extrabold").click();

    cy.get(".rounded-full").eq(1).click();

    cy.contains("button", "Usar una Dirección para TODOS los pedidos").click();

    const direccionMock = {
      calle: "Av. Corrientes",
      altura: "1234",
      codigoPostal: "1043",
      ciudad: "Buenos Aires",
      provincia: "Buenos Aires",
      pais: "Argentina",
      piso: "4",
      departamento: "B",
    };

    // Completar campos requeridos
    cy.get("#calle").type(direccionMock.calle);
    cy.get("#altura").type(direccionMock.altura);
    cy.get("#codigoPostal").type(direccionMock.codigoPostal);
    cy.get("#ciudad").type(direccionMock.ciudad);
    cy.get("#provincia").type(direccionMock.provincia);
    cy.get("#pais").type(direccionMock.pais);

    cy.get("#piso").type(direccionMock.piso);
    cy.get("#departamento").type(direccionMock.departamento);

    cy.contains("button", "Pagar y Generar TODOS los Pedidos").click();
  });
});
