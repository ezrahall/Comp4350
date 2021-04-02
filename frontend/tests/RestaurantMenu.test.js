import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {act} from 'react-dom/test-utils';
import {fireEvent, render, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router';
import RestaurantMenu from '../src/components/pages/RestaurantMenu/RestaurantMenu';
import * as RestaurantService from '../src/services/restaurants/restaurantsService';
import React from 'react';

const mockRestaurantsMenu = (RestaurantService.getRestaurantMenu = jest.fn())

const mockStore = configureStore([thunk]);

test('Browse Menu', async () => {
    mockRestaurantsMenu.mockResolvedValue([
        {
            id:'1',
            name:'item',
            description:'item description',
            price: 22.22
        }
    ])
    const store = mockStore({
        user: {address: '66 Chancelor Drive'},
        restaurant: {
            restaurant:{
                id:1,
                title:'restaurant',
                description:'restaurant description',
                time: '20 minutes'
            }
        },
        cart: {basket: []}
    })
    //render page
    await act(async () => {
        const { getAllByText, getByText} = render(<Provider store={store}><MemoryRouter initialEntries={['/']}>
            <RestaurantMenu/>
        </MemoryRouter></Provider>);
        getByText('restaurant')
        getByText('restaurant description')
        getByText('Delivery Time: 20 minutes')
        await waitFor(() => getByText('item'))
        getByText('item description')
        getByText('$22.22')
    })
});

test('Put Item In Cart', async () => {
    mockRestaurantsMenu.mockResolvedValue([
        {
            id:'1',
            name:'item',
            description:'item description',
            price: 22.22
        }
    ])
    const store = mockStore({
        user: {address: '66 Chancelor Drive'},
        restaurant: {
            restaurant:{
                id:1,
                title:'restaurant',
                description:'restaurant description',
                time: '20 minutes'
            }
        },
        cart: {basket: []}
    })
    //render page
    await act(async () => {
        const { getAllByText, getByText} = render(<Provider store={store}><MemoryRouter initialEntries={['/']}>
            <RestaurantMenu/>
        </MemoryRouter></Provider>);
        await waitFor(() => getByText('item'))
        getByText('item description')
        getByText('$22.22')
        fireEvent.click(getByText('item'))
        expect(store.getActions()[0].type).toBe('ADD_TO_BASKET')
    })
});

test('Remove Item From Cart', async () => {
    mockRestaurantsMenu.mockResolvedValue([
        {
            id:'1',
            name:'item',
            description:'item description',
            price: 22.22
        }
    ])
    const store = mockStore({
        user: {address: '66 Chancelor Drive'},
        restaurant: {
            restaurant:{
                id:1,
                title:'restaurant',
                description:'restaurant description',
                time: '20 minutes'
            }
        },
        cart: {basket: [
                {
                    id:'1',
                    name:'item',
                    description:'item description',
                    price: 22.22,
                    qty:1
                }
            ]}
    })
    //render page
    await act(async () => {
        const { getByTestId, getByText} = render(<Provider store={store}><MemoryRouter initialEntries={['/']}>
            <RestaurantMenu/>
        </MemoryRouter></Provider>);
        await waitFor(() => getByText('item'))
        fireEvent.click(getByText('item'))
        expect(store.getActions()[0].type).toBe('ADD_TO_BASKET')
        fireEvent.click(getByTestId('remove'))
        expect(store.getActions()[1].type).toBe('DECREASE_ITEM_QUANTITY')
    })
});