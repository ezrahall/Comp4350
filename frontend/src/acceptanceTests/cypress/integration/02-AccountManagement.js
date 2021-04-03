describe('Account Management', ()=>{
    beforeEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.window().then((win) => {
            win.sessionStorage.clear()
        });
        cy.visit('/home')
        cy.findByText('Account').click()
    })
    it("Login", () =>{
        cy.get('#enterEmail').type('TES@gmail.com')
        cy.get('#enterPassword').type('test')
        cy.get('#SubmitSign').click()
    })
    it("Update Account", () =>{
        cy.get('#enterEmail').type('TES@gmail.com')
        cy.get('#enterPassword').type('test')
        cy.get('#SubmitSign').click()
        cy.findByText('Find Restaurants Nearby')
        cy.visit('/account')
        cy.findByText('Edit').click()
        cy.findByText('Update').click()
        cy.findByText('Logout').click()
    })
    it("Update Password", () =>{
        cy.get('#enterEmail').type('TES@gmail.com')
        cy.get('#enterPassword').type('test')
        cy.get('#SubmitSign').click()
        cy.findByText('Find Restaurants Nearby')
        cy.visit('/account')
        cy.findByText('Password').click()
        cy.get('#NewPassword').type('test')
        cy.findByText('Change Password').click()
        cy.findByText('Profile').click()
        cy.findByText('Logout').click()
        cy.get('#enterEmail').type('TES@gmail.com')
        cy.get('#enterPassword').type('test')
        cy.get('#SubmitSign').click()
    })
})