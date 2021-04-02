describe('Discover Restaurants', ()=>{
    beforeEach(() => {
        cy.visit('/')
        cy.get('input').type('66 Chancelors Circle, Winnipeg')
        cy.findByText('66 Chancellors Circle, Winnipeg, MB, Canada').click()
        cy.get('button').click()
        cy.findByText('of 66 Chancellors Circle, Winnipeg, MB, Canada')
    })
    it("Browse Restaurants", () =>{
        cy.findByText('McDonalds')
        cy.findByText('Tony Romas')
        cy.findByText('Burrito Place')
    })
})