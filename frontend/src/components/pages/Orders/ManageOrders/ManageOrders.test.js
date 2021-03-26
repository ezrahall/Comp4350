import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {act} from "react-dom/test-utils";
import {render, waitFor} from "@testing-library/react";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router";
import ManageOrders from "./ManageOrders";
import * as OrderService from '../../../../services/orders/orders'
const mockGetOrders = (OrderService.getOrders = jest.fn())

const mockStore = configureStore([thunk]);


test('Get Orders', async () => {
    mockGetOrders.mockResolvedValue([
    {id: '12345678912345678', address: '1 street', order: [{
            quantity: 1, menu_item: 'item'
        }]}
])
    const store = mockStore({
        user: {address: '66 Chancelor Drive'},
        order: {currentOrder: null},
        cart: {basket:[] }
    })
    //render page
    await act(async () => {
        const {getByText, getByDisplayValue} = render(<Provider store={store}><MemoryRouter initialEntries={['/']}>
            <ManageOrders/>
        </MemoryRouter></Provider>);
        await waitFor(() => getByText('item'))
        getByText('23456')
        getByText('1 street')
        getByText('1x')
    })
});