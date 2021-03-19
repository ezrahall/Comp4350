import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import cartReducer from "./store/reducers/cartReducer";
import userReducer from "./store/reducers/userRedcuer";
import UserAddress from "./components/pages/UserAddress/UserAddress";
import * as api from './services/address/address'
const mockEnterAddress = (api.enterAddress = jest.fn());

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
