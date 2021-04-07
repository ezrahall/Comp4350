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
    it("Sign Up", () => {
        cy.get('#SignUp').click()
        cy.wait(200)
        cy.get('#FullName').type('Test Test')
        cy.get('#Email').type('newtest@test.com')
        cy.get('#Password').type('test')
        cy.get('#ConfirmPassword').type('test')
        cy.get('#SubmitRegistration').click()
        cy.findByText('Find Restaurants Nearby')
        cy.request({
            method: "POST",
            url: "http://localhost:5000/Api/Dump",
        })
    })
    it("Login", () =>{
        cy.get('#enterEmail').type('joblo_@test.com')
        cy.get('#enterPassword').type('test')
        cy.get('#SubmitSign').click()
        cy.findByText('Find Restaurants Nearby')
    })
    it("Update Account", () =>{
        cy.get('#enterEmail').type('joblo_@test.com')
        cy.get('#enterPassword').type('test')
        cy.get('#SubmitSign').click()
        cy.findByText('Find Restaurants Nearby')
        cy.visit('/account')
        cy.findByText('Edit').click()
        cy.findByText('Update').click()
        cy.findByText('Logout').click()
    })
    it("Update Password", () =>{
        cy.get('#enterEmail').type('joblo_@test.com')
        cy.get('#enterPassword').type('test')
        cy.get('#SubmitSign').click()
        cy.findByText('Find Restaurants Nearby')
        cy.visit('/account')
        cy.findByText('Password').click()
        cy.get('#NewPassword').type('test')
        cy.findByText('Change Password').click()
        cy.findByText('Profile').click()
        cy.findByText('Logout').click()
        cy.get('#enterEmail').type('joblo_@test.com')
        cy.get('#enterPassword').type('test')
        cy.get('#SubmitSign').click()
    })
})