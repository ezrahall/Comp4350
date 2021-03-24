import {render, screen, fireEvent, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";
import UserAddress from "./components/pages/UserAddress/UserAddress";
import * as addressService from './services/address/address'
import * as restaurantService from './services/restaurants/restaurantsService'
import Home from "./components/pages/Home/Home";
import {restaurants, restaurantsAdd, restaurantsFiltered} from "./data/restaurants/restaurants";
import Login from "./components/pages/Login/Login";
import thunk from "redux-thunk";
import configureStore from 'redux-mock-store'
import Profile from "./components/Profile/Profile";
import Password from "./components/Password/Password";
const mockEnterAddress = (addressService.enterAddress = jest.fn());
const mockGetRestaurants = (restaurantService.getRestaurants = jest.fn());
const mockAddRestaurants = (restaurantService.addRestaurants = jest.fn());

const mockStore = configureStore([thunk]);


test('Address Page Test With Working Address', async () => {
    const store = mockStore({})
    //Mock the addresses gotten by address service
    mockEnterAddress.mockResolvedValue({addresses: [{name: '66 Chancelor Drive'}], token:''})
    //render page
    const { getAllByText, getByPlaceholderText, getByDisplayValue, getByText } = render(<Provider store={store}><MemoryRouter initialEntries={['/']}>
        <UserAddress/>
    </MemoryRouter></Provider>);
    //check starting page content
    const input = getByPlaceholderText('Please Enter Your Address')
    getAllByText('Find Restaurants Nearby')
    //type into input
    act(() =>{
        fireEvent.change(input, {target: {value: '66 Chance'}})
    })
    //make sure input is displayed in input field
    getByDisplayValue('66 Chance')
    //wait for suggestions
    await waitFor(() => getAllByText('66 Chancelor Drive'))
    //select address from selctions
    getByText('66 Chancelor Drive')
    act(() => {fireEvent.click(getByText('66 Chancelor Drive'))})
    //see if you can click the submit button
    getByDisplayValue('66 Chancelor Drive')
    act(() => {fireEvent.click(getByText('Find Restaurants Nearby'))})
});
test('Address Page Test With Bad Address', async () => {
    const store = mockStore({})
    //Mock the addresses gotten by address service
    mockEnterAddress.mockResolvedValue({addresses: [{name: '66 Chancelor Drive'}], token:''})
    //render page
    const { getAllByText, getByPlaceholderText, getByDisplayValue, getByText } = render(<Provider store={store}><MemoryRouter initialEntries={['/']}>
        <UserAddress/>
    </MemoryRouter></Provider>);
    //check starting page content
    const input = getByPlaceholderText('Please Enter Your Address')
    getAllByText('Find Restaurants Nearby')
    //type into input
    act(() =>{
        fireEvent.change(input, {target: {value: '66 Chance'}})
    })
    //make sure input is displayed in input field
    getByDisplayValue('66 Chance')
    //wait for suggestions
    await waitFor(() => getAllByText('66 Chancelor Drive'))
    //select address from selctions
    getByText('66 Chancelor Drive')
    act(() => {fireEvent.click(getByText('Find Restaurants Nearby'))})
    //Check if button disabled
    getByText('Please choose an address from one of the options')
});
test('Browse Restaurants', async () => {
    const store = mockStore({
        user: {address: '66 Chancelor Drive'},
        cart: {basket: []}
    })
    //render page
    mockGetRestaurants.mockResolvedValue(restaurants)
    mockAddRestaurants.mockResolvedValue(restaurantsAdd)
    await act(async () => {
        const { getAllByText, getByText} = render(<Provider store={store}><MemoryRouter initialEntries={['/']}>
            <Home/>
        </MemoryRouter></Provider>);
        await waitForElementToBeRemoved(() => getAllByText('No Available Restaurants In The Area'))
        expect((getAllByText('R1')).length == 3).toBeTruthy()
        fireEvent.click(getByText('Show More'))
        await waitFor(() => getAllByText('R2'))
        expect((getAllByText('R2')).length == 3).toBeTruthy()
    })
});

test('Filter Restaurants', async () => {
    //render page
    const store = mockStore({
        user: {address: '66 Chancelor Drive'},
        cart: {basket: []}
    })
    mockGetRestaurants.mockResolvedValue(restaurants)
    await act(async () => {
        const { getAllByText, getByText} = render(<Provider store={store}><MemoryRouter initialEntries={['/']}>
            <Home/>
        </MemoryRouter></Provider>);
        await waitForElementToBeRemoved(() => getAllByText('No Available Restaurants In The Area'))
        expect((getAllByText('R1')).length == 3).toBeTruthy()
        mockGetRestaurants.mockResolvedValue(restaurantsFiltered)
        fireEvent.click(getByText('Sweet'))
        await waitFor(() => getByText('R3'))
        getByText('Search Results For: Sweet')
    })
});
test('Search Restaurants By Tag', async () => {
    //render page
    const store = mockStore({
        user: {address: '66 Chancelor Drive'},
        cart: {basket: []}
    })
    mockGetRestaurants.mockResolvedValue(restaurants)
    await act(async () => {
        const { getAllByText, getByText, getByPlaceholderText} = render(<Provider store={store}><MemoryRouter initialEntries={['/']}>
            <Home/>
        </MemoryRouter></Provider>);
        await waitForElementToBeRemoved(() => getAllByText('No Available Restaurants In The Area'))
        expect((getAllByText('R1')).length == 3).toBeTruthy()
        mockGetRestaurants.mockResolvedValue(restaurantsFiltered)
        const input = getByPlaceholderText('Search Restaurants')
        fireEvent.change(input, {target: {value: 'Sweet'}})
        fireEvent.submit(input)
        await waitFor(() => getByText('R3'))
        getByText('Search Results For: Sweet')
    })
});
test('Search Restaurants By Name', async () => {
    //render page
    const store = mockStore({
        user: {address: '66 Chancelor Drive'},
        cart: {basket: []}
    })
    mockGetRestaurants.mockResolvedValue(restaurants)
    await act(async () => {
        const { getAllByText, getByText, getByPlaceholderText} = render(<Provider store={store}><MemoryRouter initialEntries={['/']}>
            <Home/>
        </MemoryRouter></Provider>);
        await waitForElementToBeRemoved(() => getAllByText('No Available Restaurants In The Area'))
        expect((getAllByText('R1')).length == 3).toBeTruthy()
        mockGetRestaurants.mockResolvedValue(restaurantsFiltered)
        const input = getByPlaceholderText('Search Restaurants')
        fireEvent.change(input, {target: {value: 'R3'}})
        fireEvent.submit(input)
        await waitFor(() => getByText('R3'))
        getByText('Search Results For: R3')
    })
});
test('Sign Up For Account Valid Values Customer', async () => {
    //render page
    let store = mockStore({
        user: {
            address: '66 Chancelor Drive',
            isLoading: false,
            error: null,
            user: null
        },
        cart: {basket: []}
    })

    await act(async () => {
        const { getAllByText, getByDisplayValue, getByLabelText, getAllByLabelText} = render(<Provider store={store}><MemoryRouter initialEntries={['/login']}>
            <Login/>
        </MemoryRouter></Provider>);
        fireEvent.click(getAllByText('Sign Up')[0])
        let input = getByLabelText('Full Name')
        fireEvent.input(input, {target: {value: 'John Smith'}})
        await waitFor(() => getByDisplayValue('John Smith'))
        input = getByLabelText('Email Address')
        fireEvent.input(input, {target: {value: 'johnsmith@test.com'}})
        input = getAllByLabelText('Password')[1]
        fireEvent.input(input, {target: {value: 'test1234'}})
        input = getByLabelText('Confirm Password')
        fireEvent.input(input, {target: {value: 'test1234'}})
        fireEvent.click(getAllByText('Sign Up')[2])
        expect(store.getActions()[0].type).toBe('AUTH_START')
    })

});
test('Sign Up For Account Invalid Name Customer', async () => {
    //render page
    let store = mockStore({
        user: {
            address: '66 Chancelor Drive',
            isLoading: false,
            error: null,
            user: null
        },
        cart: {basket: []}
    })

    await act(async () => {
        const { getAllByText, getByText, getAllByDisplayValue, getByLabelText} = render(<Provider store={store}><MemoryRouter initialEntries={['/login']}>
            <Login/>
        </MemoryRouter></Provider>);
        fireEvent.click(getAllByText('Sign Up')[0])
        let input = getByLabelText('Email Address')
        fireEvent.input(input, {target: {value: 'johnsmith@test.com'}})
        await waitFor(() => getAllByDisplayValue('johnsmith@test.com'))
        fireEvent.click(getAllByText('Sign Up')[2])
        await waitFor(() => getByText('Name Required'))
    })

});
test('Sign Up For Account Invalid Email Customer', async () => {
    //render page
    let store = mockStore({
        user: {
            address: '66 Chancelor Drive',
            isLoading: false,
            error: null,
            user: null
        },
        cart: {basket: []}
    })

    await act(async () => {
        const { getAllByText, getByText, getByDisplayValue, getByLabelText} = render(<Provider store={store}><MemoryRouter initialEntries={['/login']}>
            <Login/>
        </MemoryRouter></Provider>);
        fireEvent.click(getAllByText('Sign Up')[0])
        let input = getByLabelText('Full Name')
        fireEvent.input(input, {target: {value: 'John Smith'}})
        await waitFor(() => getByDisplayValue('John Smith'))
        fireEvent.click(getAllByText('Sign Up')[2])
        await waitFor(() => getByText('Email Required'))
    })

});

test('Sign Up For Account Invalid Password Customer', async () => {
    //render page
    let store = mockStore({
        user: {
            address: '66 Chancelor Drive',
            isLoading: false,
            error: null,
            user: null
        },
        cart: {basket: []}
    })

    await act(async () => {
        const { getAllByText, getByText, getByDisplayValue, getAllByDisplayValue, getByLabelText} = render(<Provider store={store}><MemoryRouter initialEntries={['/login']}>
            <Login/>
        </MemoryRouter></Provider>);
        fireEvent.click(getAllByText('Sign Up')[0])
        let input = getByLabelText('Full Name')
        fireEvent.input(input, {target: {value: 'John Smith'}})
        await waitFor(() => getByDisplayValue('John Smith'))
        input = getByLabelText('Email Address')
        fireEvent.input(input, {target: {value: 'johnsmith@test.com'}})
        await waitFor(() => getAllByDisplayValue('johnsmith@test.com'))
        fireEvent.click(getAllByText('Sign Up')[2])
        await waitFor(() => getByText('Password must Be at least 4 characters'))
    })

});
test('Sign Up For Account Invalid Confirm Password Customer', async () => {
    //render page
    let store = mockStore({
        user: {
            address: '66 Chancelor Drive',
            isLoading: false,
            error: null,
            user: null
        },
        cart: {basket: []}
    })

    await act(async () => {
        const { getAllByText, getByText, getAllByDisplayValue, getByLabelText, getAllByLabelText} = render(<Provider store={store}><MemoryRouter initialEntries={['/login']}>
            <Login/>
        </MemoryRouter></Provider>);
        fireEvent.click(getAllByText('Sign Up')[0])
        let input = getByLabelText('Full Name')
        fireEvent.input(input, {target: {value: 'John Smith'}})
        input = getByLabelText('Email Address')
        fireEvent.input(input, {target: {value: 'johnsmith@test.com'}})
        input = getAllByLabelText('Password')[1]
        fireEvent.input(input, {target: {value: 'test1234'}})
        await waitFor(() => getAllByDisplayValue('test1234'))
        fireEvent.click(getAllByText('Sign Up')[2])
        await waitFor(() => getByText('Make sure passwords match'))
    })

});

test('Sign In Valid Customer', async () => {
    //render page
    let store = mockStore({
        user: {
            address: '66 Chancelor Drive',
            isLoading: false,
            error: null,
            user: null
        },
        cart: {basket: []}
    })

    await act(async () => {
        const { getAllByText, getAllByDisplayValue, getByLabelText, getAllByLabelText} = render(<Provider store={store}><MemoryRouter initialEntries={['/login']}>
            <Login/>
        </MemoryRouter></Provider>);
        let input = getByLabelText('Email Address')
        fireEvent.input(input, {target: {value: 'johnsmith@test.com'}})
        input = getAllByLabelText('Password')[1]
        fireEvent.input(input, {target: {value: 'test1234'}})
        await waitFor(() => getAllByDisplayValue('test1234'))
        fireEvent.click(getAllByText('Sign In')[1])
        expect(store.getActions()[0].type).toBe('AUTH_START')
    })

});

test('Sign In Invalid Email Customer', async () => {
    //render page
    let store = mockStore({
        user: {
            address: '66 Chancelor Drive',
            isLoading: false,
            error: null,
            user: null
        },
        cart: {basket: []}
    })

    await act(async () => {
        const { getAllByText, getByText, getAllByDisplayValue, getAllByLabelText} = render(<Provider store={store}><MemoryRouter initialEntries={['/login']}>
            <Login/>
        </MemoryRouter></Provider>);
        let input = getAllByLabelText('Password')[1]
        fireEvent.input(input, {target: {value: 'test1234'}})
        await waitFor(() => getAllByDisplayValue('test1234'))
        fireEvent.click(getAllByText('Sign In')[1])
        getByText('Email Required')
    })

});
test('Sign In Invalid Password Customer', async () => {
    //render page
    let store = mockStore({
        user: {
            address: '66 Chancelor Drive',
            isLoading: false,
            error: null,
            user: null
        },
        cart: {basket: []}
    })

    await act(async () => {
        const { getAllByText, getByText, getAllByDisplayValue, getByLabelText} = render(<Provider store={store}><MemoryRouter initialEntries={['/login']}>
            <Login/>
        </MemoryRouter></Provider>);
        let input = getByLabelText('Email Address')
        fireEvent.input(input, {target: {value: 'johnsmith@test.com'}})
        await waitFor(() => getAllByDisplayValue('johnsmith@test.com'))
        fireEvent.click(getAllByText('Sign In')[1])
        getByText('Password Required')
    })

});

test('Sign In Invalid Password Customer', async () => {
    //render page
    let store = mockStore({
        user: {
            address: '66 Chancelor Drive',
            isLoading: false,
            error: null,
            user: null
        },
        cart: {basket: []}
    })

    await act(async () => {
        const { getAllByText, getByText, getAllByDisplayValue, getByLabelText} = render(<Provider store={store}><MemoryRouter initialEntries={['/login']}>
            <Login/>
        </MemoryRouter></Provider>);
        let input = getByLabelText('Email Address')
        fireEvent.input(input, {target: {value: 'johnsmith@test.com'}})
        await waitFor(() => getAllByDisplayValue('johnsmith@test.com'))
        fireEvent.click(getAllByText('Sign In')[1])
        getByText('Password Required')
    })

});
test('Edit Account Info', async () => {
    //render page
    JSON.parse = jest.fn().mockImplementation(() => {
        return {
            name: 'Ezra',
            phone:'',
            email: 'test@test.com'
        }
    })
    let store = mockStore({
        user: {
            address: '66 Chancelor Drive',
            isLoading: false,
            error: null,
            user: null
        },
        cart: {basket: []}
    })

    await act(async () => {
        const {getByText, getByDisplayValue, getAllByDisplayValue} = render(<Provider store={store}><MemoryRouter initialEntries={['/login']}>
            <Profile alertHandler={jest.fn()}/>
        </MemoryRouter></Provider>);
        await waitFor(() => getByDisplayValue('Ezra'))
        getByDisplayValue('test@test.com')
        fireEvent.click(getByText('Edit'))
        let input = getAllByDisplayValue('Ezra')[1]
        fireEvent.input(input, {target:{value: 'Matt'}})
        getByDisplayValue('Matt')
        input = getAllByDisplayValue('test@test.com')[1]
        fireEvent.input(input, {target:{value: 'newemail@test.com'}})
        getByDisplayValue('newemail@test.com')
        fireEvent.click(getByText('Update'))
        expect(getAllByDisplayValue('Matt').length).toBe(2)
        expect(getAllByDisplayValue('newemail@test.com').length).toBe(2)
        expect(store.getActions()[0].type).toBe('AUTH_START')
    })

});

test('Change Password', async () => {
    //render page
    JSON.parse = jest.fn().mockImplementation(() => {
        return {
            name: 'Ezra',
            phone:'',
            email: 'test@test.com'
        }
    })
    let store = mockStore({
        user: {
            address: '66 Chancelor Drive',
            isLoading: false,
            error: null,
            user: null
        },
        cart: {basket: []}
    })

    await act(async () => {
        const { getByText, getByDisplayValue} = render(<Provider store={store}><MemoryRouter initialEntries={['/login']}>
            <Password alertHandler={jest.fn()}/>
        </MemoryRouter></Provider>);
        let input = getByDisplayValue('')
        fireEvent.input(input, {target: {value: '123456789'}})
        fireEvent.click(getByText('Change Password'))
        expect(store.getActions()[0].type).toBe('AUTH_START')
    })

});

