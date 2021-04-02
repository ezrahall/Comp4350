import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {act} from 'react-dom/test-utils';
import {fireEvent, render, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router';
import Checkout from '../src/components/pages/Checkout/Checkout';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51IWvOsCXMychAZM499t1cB9kFug8Z5AvB9FpXhSnpsCcOGCXz1OervvAlKPzbg5VzYz2Ro5UGDxtYQHk2A0p1zw0002D2xp1OP');
fetch = jest.fn()


const mockStore = configureStore([thunk]);


test('Put Item In Cart', async () => {
    fetch.mockResolvedValue(JSON.stringify({the: 'test'}))
    const store = mockStore({
        user: {address: '66 Chancelor Drive',user: { name: 'Test'}},
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
                    title:'item',
                    price: 22.22,
                    qty:1
                }
            ]}
    })
    //render page
    await act(async () => {
        const {getByText, getByDisplayValue} = render(<Provider store={store}><MemoryRouter initialEntries={['/']}>
            <Elements stripe={stripePromise}>
                <Checkout/>
            </Elements>
        </MemoryRouter></Provider>);
        await waitFor(() => getByText('item'))
        getByText('$22.22')
    })
});

test('Put For Items', async () => {
    fetch.mockResolvedValue(JSON.stringify({the: 'test'}))
    const store = mockStore({
        user: {address: '66 Chancelor Drive',user: { name: 'Test'}},
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
                    title:'item',
                    price: 22.22,
                    qty:1
                }
            ]}
    })
    //render page
    await act(async () => {
        const {getByText, getByDisplayValue} = render(<Provider store={store}><MemoryRouter initialEntries={['/']}>
            <Elements stripe={stripePromise}>
                <Checkout/>
            </Elements>
        </MemoryRouter></Provider>);
        await waitFor(() => getByText('item'))
        getByText('$22.22')
        fireEvent.click(getByText('Proceed to Pay'))
        expect(fetch).toBeCalledTimes(1)
    })
});