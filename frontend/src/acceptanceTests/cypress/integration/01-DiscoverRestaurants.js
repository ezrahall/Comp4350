describe('Browse For Restaurant', ()=>{
    it("No Address Entered", () => {
        cy.visit('/')
        cy.get('button').click()
        cy.findByText('Please choose an address from one of the options')
    })
    it("Address Entered", () =>{
        cy.visit('/')
        cy.get('input').type('66 Chancelors Circle, Winnipeg')
        cy.findByText('66 Chancellors Circle, Winnipeg, MB, Canada').click()
        cy.get('button').click()
        cy.findByText('of 66 Chancellors Circle, Winnipeg, MB, Canada')
    })
})