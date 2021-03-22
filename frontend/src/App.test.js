import {render, screen, fireEvent, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import cartReducer from "./store/reducers/cartReducer";
import userReducer from "./store/reducers/userRedcuer";
import UserAddress from "./components/pages/UserAddress/UserAddress";
import * as addressService from './services/address/address'
import * as restaurantService from './services/restaurants/restaurantsService'
import Home from "./components/pages/Home/Home";
import {restaurants, restaurantsAdd, restaurantsFiltered} from "./data/restaurants/restaurants";
import Login from "./components/pages/Login/Login";
const mockEnterAddress = (addressService.enterAddress = jest.fn());
const mockGetRestaurants = (restaurantService.getRestaurants = jest.fn());
const mockAddRestaurants = (restaurantService.addRestaurants = jest.fn());
jest.genMockFromModule('validatorjs')

const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer
});

const store = createStore(rootReducer)

test('Address Page Test With Working Address', async () => {
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
test('Sign Up For Account', async () => {
    //render page
    await act(async () => {
        const { getAllByText, getByText, getByPlaceholderText} = render(<Provider store={store}><MemoryRouter initialEntries={['/']}>
            <Login/>
        </MemoryRouter></Provider>);
    })
});
