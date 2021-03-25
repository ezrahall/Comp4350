import {act} from "react-dom/test-utils";
import {fireEvent, render, waitFor, within} from "@testing-library/react";
import {MemoryRouter} from "react-router";
import axios from "axios"

import Staff from "./Staff";

jest.mock('axios'); 

test('Get Staff Details', async () => {
    //render page
   
    await act(async () => {

        axios.post = jest.fn()
        .mockResolvedValue({
            data: {
                staff: [{"id": "1", "name": "Joe schmoe", "email": "test@test.com"}, {"id": "2", "name": "Joe Smith", "email": "joeTest@test.com"}, {"id": "3", "name": "John Doe", "email": "jdoe@test.com"}]
            },
            status: 200
        })
    
        const {getAllByText, getByText, findByText} = render(<MemoryRouter initialEntries={['/login']}>
            <Staff alertHandler={jest.fn()}/>
        </MemoryRouter>);

        await waitFor(() => getByText('ID'))
        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(getAllByText('Joe schmoe').length).toBe(1)
        expect(getAllByText('test@test.com').length).toBe(1)
        expect(getAllByText('Joe Smith').length).toBe(1)
        expect(getAllByText('joeTest@test.com').length).toBe(1)
        expect(getAllByText('John Doe').length).toBe(1)
        expect(getAllByText('jdoe@test.com').length).toBe(1)

    })
});

test('Add One New Staff Member', async () => {
    //render page
   
    await act(async () => {

        axios.post = jest.fn()
        .mockResolvedValue({
            data: {
                staff: [{"id": "1", "name": "Joe schmoe", "email": "test@test.com"}, {"id": "2", "name": "Joe Smith", "email": "joeTest@test.com"}, {"id": "3", "name": "John Doe", "email": "jdoe@test.com"}, {"id": "4", "name": "James Doe", "email": "jamesd@test.com"}]
            },
            status: 200
        })
        .mockResolvedValueOnce({
            data: {
                staff: [{"id": "1", "name": "Joe schmoe", "email": "test@test.com"}, {"id": "2", "name": "Joe Smith", "email": "joeTest@test.com"}, {"id": "3", "name": "John Doe", "email": "jdoe@test.com"}]
            },
            status: 200
        })
    
        const {getAllByText, getByText, getByLabelText, queryByText} = render(<MemoryRouter initialEntries={['/login']}>
            <Staff alertHandler={jest.fn()}/>
        </MemoryRouter>);

        await waitFor(() => getByText('ID'))
        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(getAllByText('Joe schmoe').length).toBe(1)
        expect(getAllByText('test@test.com').length).toBe(1)
        expect(getAllByText('Joe Smith').length).toBe(1)
        expect(getAllByText('joeTest@test.com').length).toBe(1)
        expect(getAllByText('John Doe').length).toBe(1)
        expect(getAllByText('jdoe@test.com').length).toBe(1)        
        expect(queryByText('James Doe')).toBeNull()
        expect(queryByText('jamesd@test.com')).toBeNull()
        fireEvent.click(getByText('Add New Staff Member'))
        await waitFor(() => getByLabelText('Staff Name'))
        fireEvent.input(getByLabelText('Staff Name'), {target:{value: 'James Doe'}})
        fireEvent.input(getByLabelText('Staff Email Address'), {target:{value: 'jamesd@test.com'}})
        fireEvent.click(getByText('Create'))
        await waitFor(() => getByText('James Doe'))
        expect(getAllByText('Joe schmoe').length).toBe(1)
        expect(getAllByText('test@test.com').length).toBe(1)
        expect(getAllByText('Joe Smith').length).toBe(1)
        expect(getAllByText('joeTest@test.com').length).toBe(1)
        expect(getAllByText('John Doe').length).toBe(1)
        expect(getAllByText('jdoe@test.com').length).toBe(1)
        expect(getAllByText('James Doe').length).toBe(1)
        expect(getAllByText('jamesd@test.com').length).toBe(1)
    })
});

test('Edit a Staff Member', async () => {
    //render page
   
    await act(async () => {

        axios.post = jest.fn()
        .mockResolvedValue({
            data: {
                staff: [{"id": "1", "name": "Joe schmoe", "email": "test@test.com"}, {"id": "2", "name": "Joe Smith", "email": "joeTest@test.com"}, {"id": "3", "name": "John Doe", "email": "jdoe@test.com"},  {"id": "4", "name": "Jameson Doe", "email": "jamesond@test.com"}]
            },
            status: 200
        })
        .mockResolvedValueOnce({
            data: {
                staff: [{"id": "1", "name": "Joe schmoe", "email": "test@test.com"}, {"id": "2", "name": "Joe Smith", "email": "joeTest@test.com"}, {"id": "3", "name": "John Doe", "email": "jdoe@test.com"}, {"id": "4", "name": "James Doe", "email": "jamesd@test.com"}]
            },
            status: 200
        })
    
        const {getAllByText, getByText, getByLabelText, getByTestId, queryByText} = render(<MemoryRouter initialEntries={['/login']}>
            <Staff alertHandler={jest.fn()}/>
        </MemoryRouter>);

        await waitFor(() => getByText('ID'))
        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(getAllByText('Joe schmoe').length).toBe(1)
        expect(getAllByText('test@test.com').length).toBe(1)
        expect(getAllByText('Joe Smith').length).toBe(1)
        expect(getAllByText('joeTest@test.com').length).toBe(1)
        expect(getAllByText('John Doe').length).toBe(1)
        expect(getAllByText('jdoe@test.com').length).toBe(1)
        expect(getAllByText('James Doe').length).toBe(1)
        expect(getAllByText('jamesd@test.com').length).toBe(1)
        expect(queryByText('Jameson Doe')).toBeNull()
        expect(queryByText('jamesond@test.com')).toBeNull()
        
        fireEvent.click(getByTestId('James Doe-menu'))
        fireEvent.click(getByTestId('James Doe-edit'))
        await waitFor(() => getByLabelText('Staff Name'))
        fireEvent.input(getByLabelText('Staff Name'), {target:{value: 'Jameson Doe'}})
        fireEvent.input(getByLabelText('Staff Email Address'), {target:{value: 'jamesond@test.com'}})
        fireEvent.click(getByText('Update'))
        await waitFor(() => getByText('Jameson Doe'))
        expect(getAllByText('Joe schmoe').length).toBe(1)
        expect(getAllByText('test@test.com').length).toBe(1)
        expect(getAllByText('Joe Smith').length).toBe(1)
        expect(getAllByText('joeTest@test.com').length).toBe(1)
        expect(getAllByText('John Doe').length).toBe(1)
        expect(getAllByText('jdoe@test.com').length).toBe(1)
        expect(getAllByText('Jameson Doe').length).toBe(1)
        expect(getAllByText('jamesond@test.com').length).toBe(1)
        expect(queryByText('James Doe')).toBeNull()
        expect(queryByText('jamesd@test.com')).toBeNull()
    })
});

test('Delete a Staff Member', async () => {
    //render page
   
    await act(async () => {

        axios.post = jest.fn()
        .mockResolvedValue({
            data: {
                staff: [{"id": "1", "name": "Joe schmoe", "email": "test@test.com"}, {"id": "2", "name": "Joe Smith", "email": "joeTest@test.com"}, {"id": "3", "name": "John Doe", "email": "jdoe@test.com"}]
            },
            status: 200
        })
        .mockResolvedValueOnce({
            data: {
                staff: [{"id": "1", "name": "Joe schmoe", "email": "test@test.com"}, {"id": "2", "name": "Joe Smith", "email": "joeTest@test.com"}, {"id": "3", "name": "John Doe", "email": "jdoe@test.com"}, {"id": "4", "name": "James Doe", "email": "jamesd@test.com"}]
            },
            status: 200
        })
    
        const {getAllByText, getByText, getByTestId, queryByText} = render(<MemoryRouter initialEntries={['/login']}>
            <Staff alertHandler={jest.fn()}/>
        </MemoryRouter>);

        await waitFor(() => getByText('ID'))
        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(getAllByText('Joe schmoe').length).toBe(1)
        expect(getAllByText('test@test.com').length).toBe(1)
        expect(getAllByText('Joe Smith').length).toBe(1)
        expect(getAllByText('joeTest@test.com').length).toBe(1)
        expect(getAllByText('John Doe').length).toBe(1)
        expect(getAllByText('jdoe@test.com').length).toBe(1)
        expect(getAllByText('James Doe').length).toBe(1)
        expect(getAllByText('jamesd@test.com').length).toBe(1)
        fireEvent.click(getByTestId('James Doe-menu'))
        fireEvent.click(getByTestId('James Doe-delete'))
        fireEvent.click(getByTestId('James Doe-continue'))
        await waitFor(() => getByText('Joe schmoe'))
        expect(getAllByText('Joe schmoe').length).toBe(1)
        expect(getAllByText('test@test.com').length).toBe(1)
        expect(getAllByText('Joe Smith').length).toBe(1)
        expect(getAllByText('joeTest@test.com').length).toBe(1)
        expect(getAllByText('John Doe').length).toBe(1)
        expect(getAllByText('jdoe@test.com').length).toBe(1)
        expect(queryByText('James Doe')).toBeNull()
        expect(queryByText('jamesd@test.com')).toBeNull()
    })
});

test('Add a Staff Member twice', async () => {
    //render page
   
    await act(async () => {

        const errorMessage = 'Trouble making that change to your staff list. It\'s possible that another staff with that email already exists'
        axios.post = jest.fn()
        .mockResolvedValue({
            data: {
                staff: [{"id": "1", "name": "Joe schmoe", "email": "test@test.com"}, {"id": "2", "name": "Joe Smith", "email": "joeTest@test.com"}, {"id": "3", "name": "John Doe", "email": "jdoe@test.com"}, {"id": "4", "name": "James Doe", "email": "jamesd@test.com"}]
            },
            status: 200
        })
        .mockResolvedValueOnce({
            data: {
                staff: [{"id": "1", "name": "Joe schmoe", "email": "test@test.com"}, {"id": "2", "name": "Joe Smith", "email": "joeTest@test.com"}, {"id": "3", "name": "John Doe", "email": "jdoe@test.com"}]
            },
            status: 200
        })
        .mockResolvedValueOnce(() => {
            throw 403
        })
    
        const {getAllByText, getByText, getByLabelText, queryByText} = render(<MemoryRouter initialEntries={['/login']}>
            <Staff alertHandler={jest.fn()}/>
        </MemoryRouter>);

        await waitFor(() => getByText('ID'))
        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(getAllByText('Joe schmoe').length).toBe(1)
        expect(getAllByText('test@test.com').length).toBe(1)
        expect(getAllByText('Joe Smith').length).toBe(1)
        expect(getAllByText('joeTest@test.com').length).toBe(1)
        expect(getAllByText('John Doe').length).toBe(1)
        expect(getAllByText('jdoe@test.com').length).toBe(1)        
        expect(queryByText('James Doe')).toBeNull()
        expect(queryByText('jamesd@test.com')).toBeNull()
        fireEvent.click(getByText('Add New Staff Member'))
        await waitFor(() => getByLabelText('Staff Name'))
        fireEvent.input(getByLabelText('Staff Name'), {target:{value: 'James Doe'}})
        fireEvent.input(getByLabelText('Staff Email Address'), {target:{value: 'jamesd@test.com'}})
        fireEvent.click(getByText('Create'))
        await waitFor(() => getByText('James Doe'))
        expect(getAllByText('Joe schmoe').length).toBe(1)
        expect(getAllByText('test@test.com').length).toBe(1)
        expect(getAllByText('Joe Smith').length).toBe(1)
        expect(getAllByText('joeTest@test.com').length).toBe(1)
        expect(getAllByText('John Doe').length).toBe(1)
        expect(getAllByText('jdoe@test.com').length).toBe(1)
        expect(getAllByText('James Doe').length).toBe(1)
        expect(getAllByText('jamesd@test.com').length).toBe(1)

        // Add member again
        fireEvent.click(getByText('Add New Staff Member'))
        await waitFor(() => getByLabelText('Staff Name'))
        fireEvent.input(getByLabelText('Staff Name'), {target:{value: 'James Doe'}})
        fireEvent.input(getByLabelText('Staff Email Address'), {target:{value: 'jamesd@test.com'}})
        fireEvent.click(getByText('Create'))
        await waitFor(() => getByText('Joe schmoe'))
        expect(getAllByText('Joe schmoe').length).toBe(1)
        expect(getAllByText('test@test.com').length).toBe(1)
        expect(getAllByText('Joe Smith').length).toBe(1)
        expect(getAllByText('joeTest@test.com').length).toBe(1)
        expect(getAllByText('John Doe').length).toBe(1)
        expect(getAllByText('jdoe@test.com').length).toBe(1)
        expect(getAllByText('James Doe').length).toBe(1)
        expect(getAllByText('jamesd@test.com').length).toBe(1)
    })
});
