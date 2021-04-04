import {fireEvent, render, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router';
import UserAddress from '../components/pages/UserAddress/UserAddress';
import {act} from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as addressService from '../services/address/address';
const mockStore = configureStore([thunk]);
const mockEnterAddress = (addressService.enterAddress = jest.fn());

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
    act(() =>{
        fireEvent.change(input, {target: {value: ''}})
    })
    act(() => {fireEvent.click(getByText('Find Restaurants Nearby'))})
    //Check if button disabled
    getByText('Please choose from one of the options')
});