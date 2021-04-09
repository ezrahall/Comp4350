describe('Placing And Tracking Orders Client', ()=>{
    beforeEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.window().then((win) => {
            win.sessionStorage.clear()
        });
        cy.visit('/home')
        cy.findByText('Account').click()
        cy.get('#enterEmail').type('joblo_@test.com')
        cy.get('#enterPassword').type('test')
        cy.get('#SubmitSign').click()
        cy.findByText('Find Restaurants Nearby')
        cy.get('input').type('66 Chancellors Circle, Winnipeg')
        cy.findByText('66 Chancellors Circle, Winnipeg, MB, Canada').click()
        cy.get('form').submit()
        cy.findByText('of 66 Chancellors Circle, Winnipeg, MB, Canada')
    })
    it("View Restaurant Menu", () =>{
        cy.findByText('McDonalds').click()
        cy.findAllByText('Big Mac').should('exist')
    })
    it("Check Cart", () =>{
        cy.findByText('McDonalds').click()
        cy.findAllByText('Big Mac').first().click()
        cy.get('#Checkout').click()
        cy.findAllByText('Big Mac').should('exist')
    })
    it("Payment Section", () =>{
        cy.findByText('McDonalds').click()
        cy.findAllByText('Big Mac').first().click()
        cy.get('#Checkout').click()
        cy.findAllByText('Big Mac').should('exist')
        cy.findAllByText('Proceed to Pay').click()
        cy.visit('/')
        cy.request({
            method: "POST",
            url: "http://localhost:5000/Api/Dump",
        })
    })
})
describe('Placing and Tracking Orders Restaurant', () =>{
    beforeEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.window().then((win) => {
            win.sessionStorage.clear()
        });
        cy.visit('/home')
        cy.findByText('Account').click()
        cy.get('#enterEmail').type('joblo_@test.com')
        cy.get('#enterPassword').type('test')
        cy.get('#SubmitSign').click()
        cy.findByText('Find Restaurants Nearby')
        cy.getCookies()
        cy.getCookie('jwt_token')
            .should('exist')
            .then((cookie) => {
                cy.request({
                    method: "POST",
                    url: "http://localhost:5000/Api/Restaurant/Payment",
                    body: {
                        'cookies': {jwt_token: cookie.value},
                        'basket': [{'id': 4, 'qty': 1, 'price': '2.99'}],
                        'address': '45 D\'arcy Dr. Winnipeg MB',
                        'restaurant': {
                            'id': 2
                        }
                    }
                }).then((response) => {
                        let id = response.body.id
                        cy.request({
                            method: "POST",
                            url: "http://localhost:5000/Api/Restaurant/Payment/Webhook",
                            body: {
                                email: "joblo_@test.com",
                                id: id
                            }
                        })
                    })
            })
    })
    it('Receiving an order', () => {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.window().then((win) => {
            win.sessionStorage.clear()
        });
        cy.visit('/home')
        cy.findByText('Account').click()
        cy.get('#LoginSwitch').click()
        cy.get('#enterEmail').type('joblo_@test.com')
        cy.get('#enterPassword').type('test')
        cy.get('#SubmitSign').click()
        cy.findByText('Current Orders').click()
        cy.wait(500)
        cy.findAllByText('Vanilla cone').first().click()
        cy.findByText('Mark State As Complete').click()
        cy.request({
            method: "POST",
            url: "http://localhost:5000/Api/Dump",
        })
    })
    it('Customer Order Tracker', () => {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.window().then((win) => {
            win.sessionStorage.clear()
        });
        cy.visit('/home')
        cy.findByText('Account').click()
        cy.get('#LoginSwitch').click()
        cy.get('#enterEmail').type('joblo_@test.com')
        cy.get('#enterPassword').type('test')
        cy.get('#SubmitSign').click()
        cy.findByText('Current Orders').click()
        cy.wait(500)
        cy.findAllByText('Vanilla cone').first().click()
        cy.findByText('Mark State As Complete').click()
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.window().then((win) => {
            win.sessionStorage.clear()
        });
        cy.visit('/home')
        cy.findByText('Account').click()
        cy.get('#enterEmail').type('joblo_@test.com')
        cy.get('#enterPassword').type('test')
        cy.get('#SubmitSign').click()
        cy.wait(1000)
        cy.visit('/home')
        cy.get('#OrderTracker').click()
        cy.findByText('Order Stage: Order Cooking')
        cy.findByText('Currently Tracking Order From Burrito Place')
        cy.findByText('Vanilla cone')
        cy.request({
            method: "POST",
            url: "http://localhost:5000/Api/Dump",
        })
    })
})