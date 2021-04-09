import {render} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import configureStore from 'redux-mock-store'
import App from "../App";

const mockStore = configureStore([thunk]);

test('Load App.js', async () => {
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
        const {getByPlaceholderText} = render(<Provider store={store}><MemoryRouter initialEntries={['/']}>
            <App/>
        </MemoryRouter></Provider>);
        getByPlaceholderText('Please Enter Your Address')
    })
});

