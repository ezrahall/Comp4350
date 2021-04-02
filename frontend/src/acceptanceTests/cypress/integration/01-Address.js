describe('Address Screen', ()=>{
    it("No Address Entered", () => {
        cy.visit('/')
        cy.get('button').click()
        cy.findByText('Please choose an address from one of the options')
    })
    it("Address Entered", () =>{
        cy.visit('/')
        cy.get('input').type('66 Chancelors Circle, Winnipeg')
        cy.get('a:first').click({force:true})
        cy.get('button').click()
        cy.findByText('of 66 Chancellors Circle, Winnipeg, MB, Canada')
    })
})