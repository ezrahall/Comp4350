import {act} from 'react-dom/test-utils';
import {fireEvent, render, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router';
import Login from '../src/components/pages/Login/Login';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

jest.mock('axios');

const mockStore = configureStore([thunk]);

test('Sign Up For Account Valid Values Customer', async () => {
    //render page
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
        axios.post.mockResolvedValue({})
        const { getAllByText, getByDisplayValue, getByLabelText, getAllByLabelText} = render(<Provider store={store}><MemoryRouter initialEntries={['/login']}>
            <Login/>
        </MemoryRouter></Provider>);
        fireEvent.click(getAllByText('Sign Up')[0])
        let input = getByLabelText('Full Name')
        fireEvent.input(input, {target: {value: 'John Smith'}})
        await waitFor(() => getByDisplayValue('John Smith'))
        input = getByLabelText('Email Address')
        fireEvent.input(input, {target: {value: 'johnsmith@test.com'}})
        input = getAllByLabelText('Password')[1]
        fireEvent.input(input, {target: {value: 'test1234'}})
        input = getByLabelText('Confirm Password')
        fireEvent.input(input, {target: {value: 'test1234'}})
        fireEvent.click(getAllByText('Sign Up')[2])
        expect(store.getActions()[0].type).toBe('AUTH_START')
    })

});
test('Sign Up For Account Invalid Name Customer', async () => {
    //render page
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
        const { getAllByText, getByText, getAllByDisplayValue, getByLabelText} = render(<Provider store={store}><MemoryRouter initialEntries={['/login']}>
            <Login/>
        </MemoryRouter></Provider>);
        fireEvent.click(getAllByText('Sign Up')[0])
        let input = getByLabelText('Email Address')
        fireEvent.input(input, {target: {value: 'johnsmith@test.com'}})
        await waitFor(() => getAllByDisplayValue('johnsmith@test.com'))
        fireEvent.click(getAllByText('Sign Up')[2])
        await waitFor(() => getByText('Name Required'))
    })

});
test('Sign Up For Account Invalid Email Customer', async () => {
    //render page
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
        const { getAllByText, getByText, getByDisplayValue, getByLabelText} = render(<Provider store={store}><MemoryRouter initialEntries={['/login']}>
            <Login/>
        </MemoryRouter></Provider>);
        fireEvent.click(getAllByText('Sign Up')[0])
        let input = getByLabelText('Full Name')
        fireEvent.input(input, {target: {value: 'John Smith'}})
        await waitFor(() => getByDisplayValue('John Smith'))
        fireEvent.click(getAllByText('Sign Up')[2])
        await waitFor(() => getByText('Email Required'))
    })

});

test('Sign Up For Account Invalid Password Customer', async () => {
    //render page
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
        const { getAllByText, getByText, getByDisplayValue, getAllByDisplayValue, getByLabelText} = render(<Provider store={store}><MemoryRouter initialEntries={['/login']}>
            <Login/>
        </MemoryRouter></Provider>);
        fireEvent.click(getAllByText('Sign Up')[0])
        let input = getByLabelText('Full Name')
        fireEvent.input(input, {target: {value: 'John Smith'}})
        await waitFor(() => getByDisplayValue('John Smith'))
        input = getByLabelText('Email Address')
        fireEvent.input(input, {target: {value: 'johnsmith@test.com'}})
        await waitFor(() => getAllByDisplayValue('johnsmith@test.com'))
        fireEvent.click(getAllByText('Sign Up')[2])
        await waitFor(() => getByText('Password must Be at least 4 characters'))
    })

});
test('Sign Up For Account Invalid Confirm Password Customer', async () => {
    //render page
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
        const { getAllByText, getByText, getAllByDisplayValue, getByLabelText, getAllByLabelText} = render(<Provider store={store}><MemoryRouter initialEntries={['/login']}>
            <Login/>
        </MemoryRouter></Provider>);
        fireEvent.click(getAllByText('Sign Up')[0])
        let input = getByLabelText('Full Name')
        fireEvent.input(input, {target: {value: 'John Smith'}})
        input = getByLabelText('Email Address')
        fireEvent.input(input, {target: {value: 'johnsmith@test.com'}})
        input = getAllByLabelText('Password')[1]
        fireEvent.input(input, {target: {value: 'test1234'}})
        await waitFor(() => getAllByDisplayValue('test1234'))
        fireEvent.click(getAllByText('Sign Up')[2])
        await waitFor(() => getByText('Make sure passwords match'))
    })

});

test('Sign In Valid Customer', async () => {
    //render page
    axios.post.mockResolvedValue({})
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
        const { getAllByText, getAllByDisplayValue, getByLabelText, getAllByLabelText} = render(<Provider store={store}><MemoryRouter initialEntries={['/login']}>
            <Login/>
        </MemoryRouter></Provider>);
        let input = getByLabelText('Email Address')
        fireEvent.input(input, {target: {value: 'johnsmith@test.com'}})
        input = getAllByLabelText('Password')[1]
        fireEvent.input(input, {target: {value: 'test1234'}})
        await waitFor(() => getAllByDisplayValue('test1234'))
        fireEvent.click(getAllByText('Sign In')[1])
        expect(store.getActions()[0].type).toBe('AUTH_START')
    })

});

test('Sign In Invalid Email Customer', async () => {
    //render page
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
        const { getAllByText, getByText, getAllByDisplayValue, getAllByLabelText} = render(<Provider store={store}><MemoryRouter initialEntries={['/login']}>
            <Login/>
        </MemoryRouter></Provider>);
        let input = getAllByLabelText('Password')[1]
        fireEvent.input(input, {target: {value: 'test1234'}})
        await waitFor(() => getAllByDisplayValue('test1234'))
        fireEvent.click(getAllByText('Sign In')[1])
        getByText('Email Required')
    })

});
test('Sign In Invalid Password Customer', async () => {
    //render page
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
        const { getAllByText, getByText, getAllByDisplayValue, getByLabelText} = render(<Provider store={store}><MemoryRouter initialEntries={['/login']}>
            <Login/>
        </MemoryRouter></Provider>);
        let input = getByLabelText('Email Address')
        fireEvent.input(input, {target: {value: 'johnsmith@test.com'}})
        await waitFor(() => getAllByDisplayValue('johnsmith@test.com'))
        fireEvent.click(getAllByText('Sign In')[1])
        getByText('Password Required')
    })

});
