import {restaurants, restaurantsAdd, restaurantsFiltered} from '../src/data/restaurants/restaurants';
import {act} from 'react-dom/test-utils';
import {fireEvent, render, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router';
import Home from '../src/components/pages/Home/Home';
import * as restaurantService from '../src/services/restaurants/restaurantsService';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const mockGetRestaurants = (restaurantService.getRestaurants = jest.fn());
const mockAddRestaurants = (restaurantService.addRestaurants = jest.fn());

const mockStore = configureStore([thunk]);

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