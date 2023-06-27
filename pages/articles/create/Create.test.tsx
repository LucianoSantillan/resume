import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreatePage from '.';

// mock the useRouter hook
jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({}),
}));

describe('CreatePage', () => {
    it('should render the form', () => {
        render(<CreatePage />);
        expect(screen.getByLabelText('Title')).toBeInTheDocument();
        expect(screen.getByLabelText('Description')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('should show an error message if the form is submitted with empty fields', async () => {
        render(<CreatePage />);
        userEvent.click(screen.getByRole('button', { name: 'Submit' }));
        await waitFor(() => {
            expect(screen.getByText('Title is required')).toBeInTheDocument();
            expect(screen.getByText('Description is required')).toBeInTheDocument();
        });
    });

    it('should show a success message if the form is submitted successfully', async () => {
        const fetchMock = jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve(new Response())
        );
        render(<CreatePage />);
        await act(() => userEvent.type(screen.getByLabelText('Title'), 'Test Title'));
        await act(() => userEvent.type(screen.getByLabelText('Description'), 'Test Description'));
        await act(() => userEvent.click(screen.getByRole('button', { name: 'Submit' })));
        await waitFor(() => {
            expect(screen.getByText('Article created successfully')).toBeInTheDocument();
        });
        fetchMock.mockRestore();
    });

    it('should show an error message if the form submission fails', async () => {
        const mockResponse = { ok: false, status: 500 };
        const fetchMock = jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve(new Response(JSON.stringify(mockResponse), {
                status: mockResponse.status
            }))
        );

        // mock the console.error method
        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });

        render(<CreatePage />);
        await act(() => userEvent.type(screen.getByLabelText('Title'), 'Test Title'));
        await act(() => userEvent.type(screen.getByLabelText('Description'), 'Test Description'));
        await act(() => fireEvent.click(screen.getByRole('button', { name: 'Submit' })));

        await waitFor(() => {
            expect(screen.getByText('An unexpected error has occurred')).toBeInTheDocument();
            expect(consoleErrorMock).toHaveBeenCalledWith(`HTTP error: ${mockResponse.status}`);
        });

        fetchMock.mockRestore();
        consoleErrorMock.mockRestore();
    });
});