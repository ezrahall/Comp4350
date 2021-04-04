describe('Discover Restaurants', ()=>{
    beforeEach(() => {
        cy.visit('/')
        cy.get('input').type('66 Chancellors Circle, Winnipeg')
        cy.findByText('66 Chancellors Circle, Winnipeg, MB, Canada').click()
        cy.get('form').submit()
        cy.findByText('of 66 Chancellors Circle, Winnipeg, MB, Canada')
    })
    it("Browse Restaurants", () =>{
        cy.findByText('McDonalds')
        cy.findByText('Tony Romas')
        cy.findByText('Burrito Place')
    })
    it("Filter Restaurants", () =>{
        cy.findByText('Western').click()
        cy.findByText('Search Results For: Western')
        cy.findByText('McDonalds')
        cy.findByText('Tony Romas')
    })
    it("Search Restaurants", () =>{
        cy.findByPlaceholderText('Search Restaurants').type('Western{enter}')
        cy.findByText('Search Results For: Western')
        cy.findByText('McDonalds')
        cy.findByText('Tony Romas')
    })
})