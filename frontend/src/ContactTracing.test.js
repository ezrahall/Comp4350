import {render, fireEvent, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";

import thunk from "redux-thunk";
import configureStore from 'redux-mock-store'
import RestaurantDetails from "./components/pages/RestaurantDetails/RestaurantDetails";

const mockStore = configureStore([thunk]);
HTMLCanvasElement.prototype.getContext = () => { 
    return null;
  };

test('Confirm Report', async () => {
    JSON.parse = jest.fn().mockImplementation(() => {
        return {
            name: 'Bad Food Place',
            email: 'joblo_@test.com'
        }
    })
    let store = mockStore({
        user: { user: null },
        cart: { basket: [] }
    })
    await act(async () => {
        const { container, getByText } = render(<Provider store={store}><MemoryRouter initialEntries={['/login']}>
            <RestaurantDetails alertHandler={jest.fn()}/>
        </MemoryRouter></Provider>);
        // Open report component
        fireEvent.click(getByText("Reports"))
        await waitFor(() => getByText("Report Employee Covid Exposure"))
        // Using datetime-picker library, have to grab manually
        // Clear Date and Time
        let clear = container.getElementsByClassName("react-datetime-picker__clear-button react-datetime-picker__button")
        expect(clear.length).toBe(1)
        fireEvent.click(clear[0])
        // Open Calendar
        let calendar = container.getElementsByClassName("react-datetime-picker__calendar-button react-datetime-picker__button")
        expect(calendar.length).toBe(1)
        fireEvent.click(calendar[0])
        // Open Month
        let month = container.getElementsByClassName("react-calendar__navigation__label")
        expect(month.length).toBe(1)
        fireEvent.click(month[0])
        // Click January, Click 1st of Month, Click Submit Report
        await waitFor(() => { 
            return getByText("January") 
        }).then((element) => { fireEvent.click(element) })
        await waitFor(() => {
            return getByText("1")
        }).then((element) => { fireEvent.click(element) })
        await waitFor(() => {
            return getByText("Submit Report")
        }).then((element) => { fireEvent.click(element) })
        // Wait for modal to open
        await waitFor(() => container.classList.contains("Backdrop_Backdrop"))
        expect(container.classList.contains("Backdrop_Backdrop"))
        // Verify Date, Time and Restaurant Name, then Confirm
        expect(getByText((content) => {
            return (
                content.includes("Fri Jan 01 2021 12:00:00")
            )
        }))
        expect(getByText((content) => {
            return (
                content.includes("Bad Food Place")
            )
        }))
        fireEvent.click(getByText("Confirm"))
        // Wait for modal to close
        await waitFor(() => !container.classList.contains("Backdrop_Backdrop"))
        expect(!container.classList.contains("Backdrop_Backdrop"))
        //Cancel  --> nothing sent
        //Confirm --> date sent
    })
})

test('Report Invalid Date', async () => {
    JSON.parse = jest.fn().mockImplementation(() => {
        return {
            name: 'Bad Food Place',
            email: 'joblo_@test.com'
        }
    })
    let store = mockStore({
        user: { user: null },
        cart: { basket: [] }
    })
    await act(async () => {
        const { container, getByText } = render(<Provider store={store}><MemoryRouter initialEntries={['/login']}>
            <RestaurantDetails alertHandler={jest.fn()}/>
        </MemoryRouter></Provider>);
        // Open report component
        fireEvent.click(getByText("Reports"))
        await waitFor(() => getByText("Report Employee Covid Exposure"))
        // Using datetime-picker library, have to grab manually
        // Clear Date and Time
        let clear = container.getElementsByClassName("react-datetime-picker__clear-button react-datetime-picker__button")
        expect(clear.length).toBe(1)
        fireEvent.click(clear[0])
        // Submit Report
        await waitFor(() => {
            return getByText("Submit Report")
        }).then((element) => { fireEvent.click(element) })
        // Invalid Date so modal won't close and report won't be sent
        await waitFor(() => container.classList.contains("Backdrop_Backdrop"))
        expect(container.classList.contains("Backdrop_Backdrop"))
        // Close Modal
        fireEvent.click(getByText("Cancel"))
    })
})