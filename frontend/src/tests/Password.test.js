import {act} from 'react-dom/test-utils';
import {fireEvent, render} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router';
import Password from '../components/Password/Password';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

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