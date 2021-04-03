import { act } from 'react-dom/test-utils';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import axios from 'axios';

import RestaurantTags from '../components/RestaurantTags/RestaurantTags';

jest.mock('axios');

test('Get all restaurant tags', async () => {

    await act(async () => {
        axios.post = jest.fn()
            .mockResolvedValue({
                data: {
                    tags: [{ 'id': '1', 'name': 'Spicy' }, { 'id': '2', 'name': 'Sweet' }, { 'id': '4', 'name': 'Wraps' }, { 'id': '3', 'name': 'Korean' }]
                },
                status: 200
            })

        const { getByText, getAllByText } = render(<MemoryRouter initialEntries={['/login']}>
            <RestaurantTags />
        </MemoryRouter>);

        expect(getAllByText('Spicy').length).toBe(1)
        expect(getAllByText('Sweet').length).toBe(1)
        expect(getAllByText('Wraps').length).toBe(1)
        expect(getAllByText('Korean').length).toBe(1)
        expect(getAllByText('Mild').length).toBe(1)
        expect(getAllByText('Western').length).toBe(1)
        expect(getAllByText('Vietnamese').length).toBe(1)
        expect(getAllByText('Pizza').length).toBe(1)
        await waitFor(() => getByText('My Tag Categories'))
        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(getAllByText('Spicy').length).toBe(2)
        expect(getAllByText('Sweet').length).toBe(2)
        expect(getAllByText('Wraps').length).toBe(2)
        expect(getAllByText('Korean').length).toBe(2)

        expect(getAllByText('Mild').length).toBe(1)
        expect(getAllByText('Western').length).toBe(1)
        expect(getAllByText('Vietnamese').length).toBe(1)
        expect(getAllByText('Pizza').length).toBe(1)
    });
});

test('Update Tags with Spicy tag', async () => {

    await act(async () => {
        axios.post = jest.fn()
            .mockResolvedValue({
                data: {
                    tags: [{ 'id': '3', 'name': 'Spicy' }, { 'id': '2', 'name': 'Sweet' }, { 'id': '4', 'name': 'Wraps' }, { 'id': '3', 'name': 'Korean' }]
                },
                status: 200
            })
            .mockResolvedValueOnce({
                data: {
                    tags: [{ 'id': '2', 'name': 'Sweet' }, { 'id': '4', 'name': 'Wraps' }, { 'id': '3', 'name': 'Korean' }]
                },
                status: 200
            })

        const { getByText, getAllByText } = render(<MemoryRouter initialEntries={['/login']}>
            <RestaurantTags />
        </MemoryRouter>);

        expect(getAllByText('Spicy').length).toBe(1)
        expect(getAllByText('Sweet').length).toBe(1)
        expect(getAllByText('Wraps').length).toBe(1)
        expect(getAllByText('Korean').length).toBe(1)
        await waitFor(() => getByText('My Tag Categories'))
        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(getAllByText('Spicy').length).toBe(1)
        expect(getAllByText('Sweet').length).toBe(2)
        expect(getAllByText('Wraps').length).toBe(2)
        expect(getAllByText('Korean').length).toBe(2)
        fireEvent.click(getAllByText('Spicy')[0])
        await waitFor(() => getAllByText('Spicy')[1])
        expect(axios.post).toHaveBeenCalledTimes(3)
        expect(getAllByText('Spicy').length).toBe(2)
        expect(getAllByText('Sweet').length).toBe(2)
        expect(getAllByText('Wraps').length).toBe(2)
        expect(getAllByText('Korean').length).toBe(2)

    });
});

test('Add Spicy tag only once', async () => {

    await act(async () => {
        axios.post = jest.fn()
            .mockResolvedValue({
                data: {
                    tags: [{ 'id': '3', 'name': 'Spicy' }]
                },
                status: 200
            })

        const { getByText, getAllByText } = render(<MemoryRouter initialEntries={['/login']}>
            <RestaurantTags />
        </MemoryRouter>);

        await waitFor(() => getByText('Cuisine Categories'))
        expect(getAllByText('Spicy').length).toBe(1)
        let input = getAllByText('Spicy')[0]
        fireEvent.click(input)
        await waitFor(() => getByText('My Tag Categories'))
        expect(getAllByText('Spicy').length).toBe(2)
        fireEvent.click(input)
        await waitFor(() => getByText('My Tag Categories'))
        expect(getAllByText('Spicy').length).toBe(2)
    });
});

test('Remove Spicy Tag from restaurant tags', async () => {

    await act(async () => {
        axios.post = jest.fn()
            .mockResolvedValue({
                data: {
                    tags: [{ 'id': '2', 'name': 'Sweet' }, { 'id': '4', 'name': 'Wraps' }, { 'id': '3', 'name': 'Korean' }]
                },
                status: 200
            })
            .mockResolvedValueOnce({
                data: {
                    tags: [{ 'id': '3', 'name': 'Spicy' }, { 'id': '2', 'name': 'Sweet' }, { 'id': '4', 'name': 'Wraps' }, { 'id': '3', 'name': 'Korean' }]
                },
                status: 200
            })

        const { getByText, getAllByText } = render(<MemoryRouter initialEntries={['/login']}>
            <RestaurantTags />
        </MemoryRouter>);

        expect(getAllByText('Spicy').length).toBe(1)
        expect(getAllByText('Sweet').length).toBe(1)
        expect(getAllByText('Wraps').length).toBe(1)
        expect(getAllByText('Korean').length).toBe(1)
        await waitFor(() => getByText('My Tag Categories'))
        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(getAllByText('Spicy').length).toBe(2)
        expect(getAllByText('Sweet').length).toBe(2)
        expect(getAllByText('Wraps').length).toBe(2)
        expect(getAllByText('Korean').length).toBe(2)
        fireEvent.click(getAllByText('Spicy')[1])
        await waitFor(() => getAllByText('Sweet')[1])
        expect(axios.post).toHaveBeenCalledTimes(3)
        expect(getAllByText('Spicy').length).toBe(1)
        expect(getAllByText('Sweet').length).toBe(2)
        expect(getAllByText('Wraps').length).toBe(2)
        expect(getAllByText('Korean').length).toBe(2)

    });
});

test('Remove all Tags from restaurant tags list', async () => {

    await act(async () => {
        axios.post = jest.fn()
            .mockResolvedValue({
                data: {
                    tags: [{ 'id': '2', 'name': 'Sweet' }, { 'id': '4', 'name': 'Wraps' }, { 'id': '3', 'name': 'Korean' }]
                },
                status: 200
            })
            .mockResolvedValueOnce({
                data: {
                    tags: [{ 'id': '3', 'name': 'Spicy' }, { 'id': '2', 'name': 'Sweet' }, { 'id': '4', 'name': 'Wraps' }, { 'id': '3', 'name': 'Korean' }]
                },
                status: 200
            })
            .mockResolvedValueOnce({
                data: [],
                status: 200
            })
            .mockResolvedValueOnce({
                data: {
                    tags: [{ 'id': '2', 'name': 'Sweet' }, { 'id': '4', 'name': 'Wraps' }, { 'id': '3', 'name': 'Korean' }]
                },
                status: 200
            })
            .mockResolvedValueOnce({
                data: [],
                status: 200
            })
            .mockResolvedValueOnce({
                data: {
                    tags: [{ 'id': '4', 'name': 'Wraps' }, { 'id': '3', 'name': 'Korean' }]
                },
                status: 200
            })
            .mockResolvedValueOnce({
                data: [],
                status: 200
            })
            .mockResolvedValueOnce({
                data: {
                    tags: [{ 'id': '3', 'name': 'Korean' }]
                },
                status: 200
            })
            .mockResolvedValueOnce({
                data: [],
                status: 200
            })
            .mockResolvedValueOnce({
                data: {
                    tags: []
                },
                status: 200
            })

        const { getByText, getAllByText } = render(<MemoryRouter initialEntries={['/login']}>
            <RestaurantTags />
        </MemoryRouter>);

        expect(getAllByText('Spicy').length).toBe(1)
        expect(getAllByText('Sweet').length).toBe(1)
        expect(getAllByText('Wraps').length).toBe(1)
        expect(getAllByText('Korean').length).toBe(1)
        await waitFor(() => getByText('My Tag Categories'))
        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(getAllByText('Spicy').length).toBe(2)
        expect(getAllByText('Sweet').length).toBe(2)
        expect(getAllByText('Wraps').length).toBe(2)
        expect(getAllByText('Korean').length).toBe(2)
        fireEvent.click(getAllByText('Spicy')[1])
        await waitFor(() => getAllByText('Sweet')[1])
        expect(axios.post).toHaveBeenCalledTimes(3)
        expect(getAllByText('Spicy').length).toBe(1)
        expect(getAllByText('Sweet').length).toBe(2)
        expect(getAllByText('Wraps').length).toBe(2)
        expect(getAllByText('Korean').length).toBe(2)
        fireEvent.click(getAllByText('Sweet')[1])
        await waitFor(() => getAllByText('Wraps')[1])
        expect(axios.post).toHaveBeenCalledTimes(5)
        expect(getAllByText('Spicy').length).toBe(1)
        expect(getAllByText('Sweet').length).toBe(1)
        expect(getAllByText('Wraps').length).toBe(2)
        expect(getAllByText('Korean').length).toBe(2)
        fireEvent.click(getAllByText('Wraps')[1])
        await waitFor(() => getAllByText('Korean')[1])
        expect(axios.post).toHaveBeenCalledTimes(7)
        expect(getAllByText('Spicy').length).toBe(1)
        expect(getAllByText('Sweet').length).toBe(1)
        expect(getAllByText('Wraps').length).toBe(1)
        expect(getAllByText('Korean').length).toBe(2)
        fireEvent.click(getAllByText('Korean')[1])
        await waitFor(() => getAllByText('Spicy')[0])
        expect(axios.post).toHaveBeenCalledTimes(9)
        expect(getAllByText('Spicy').length).toBe(1)
        expect(getAllByText('Sweet').length).toBe(1)
        expect(getAllByText('Wraps').length).toBe(1)
        expect(getAllByText('Korean').length).toBe(1)
    });
});