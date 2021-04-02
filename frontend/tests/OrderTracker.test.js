import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {act} from 'react-dom/test-utils';
import {fireEvent, render, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router';
import OrderTracker from '../src/components/pages/OrderTracker/OrderTracker';
import * as OrderService from '../src/services/orders/orders';
const mockGetOrder = (OrderService.getOrderCustomer = jest.fn())
const mockStore = configureStore([thunk]);


test('Get Order Info Active', async () => {
    mockGetOrder.mockResolvedValue({
        state:1,
        restaurant_name:'restaurant',
        order:
        [
            {
                menu_item: 'item',
                quantity: 1,
                price: 1.11
            }
        ]
    })
    const store = mockStore({
        user: {address: '66 Chancelor Drive'},

        cart: {basket:[] }
    })
    //render page
    await act(async () => {
        const {getByText, getByDisplayValue} = render(<Provider store={store}><MemoryRouter initialEntries={['/']}>
                <OrderTracker/>
        </MemoryRouter></Provider>);
        await waitFor(() => getByText('item'))
        getByText('Order Tracker')
        getByText('Quantity: 1')
        getByText('Order Stage: 1')
        getByText('Price: $1.11')
    })
});

test('Get Order Info Most Recent', async () => {
    mockGetOrder.mockResolvedValue({
        state:4,
        restaurant_name:'restaurant',
        order:
            [
                {
                    menu_item: 'item',
                    quantity: 1,
                    price: 1.11
                }
            ]
    })
    const store = mockStore({
        user: {address: '66 Chancelor Drive'},

        cart: {basket:[] }
    })
    //render page
    await act(async () => {
        const {getByText, getByDisplayValue} = render(<Provider store={store}><MemoryRouter initialEntries={['/']}>
            <OrderTracker/>
        </MemoryRouter></Provider>);
        await waitFor(() => getByText('item'))
        getByText('Most Recent Order')
        getByText('Quantity: 1')
        getByText('Order Stage: 4')
        getByText('Price: $1.11')
    })
});

test('Get Order Info No Orders', async () => {
    mockGetOrder.mockResolvedValue(null)
    const store = mockStore({
        user: {address: '66 Chancelor Drive'},

        cart: {basket:[] }
    })
    //render page
    await act(async () => {
        const {getByText, getByDisplayValue} = render(<Provider store={store}><MemoryRouter initialEntries={['/']}>
            <OrderTracker/>
        </MemoryRouter></Provider>);
        getByText('No Current Order')
    })
});
