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
    it("Filter Restaurants", () =>{
        cy.findByText('Korean').click()
        cy.findByText('Search Results For: Korean')
        cy.findByText('Korean Food')
    })
    it("Search Restaurants", () =>{
        cy.findByPlaceholderText('Search Restaurants').type('Korean{enter}')
        cy.findByText('Search Results For: Korean')
        cy.findByText('Korean Food')
    })
})