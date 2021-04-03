import {act} from 'react-dom/test-utils';
import {fireEvent, render, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router';
import Profile from '../components/Profile/Profile';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

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