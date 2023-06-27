import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreatePage from '.';

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({}),
}));

//WHAT IT DOES?: This code intercepts JavaScript's console.error function, and checks if the error message being logged begins with a few specific strings. If it does, the code ignores that error message (it does nothing and returns). If it does not, it proceeds to log the error message as usual.
//WHY THIS CODE EXIST?: Because of an error message that it was imposible to solve. The page solution: https://cloud.tencent.com/developer/ask/sof/106906222/answer/132192103
const originalConsoleError = console.error;
console.error = (...args) => {
  const firstArg = args[0];
  if (
    typeof args[0] === 'string' &&
    (args[0].startsWith(
      "Warning: It looks like you're using the wrong act()"
    ) ||
      firstArg.startsWith(
        'Warning: The current testing environment is not configured to support act'
      ) ||
      firstArg.startsWith('Warning: You seem to have overlapping act() calls'))
  ) {
    return;
  }
  originalConsoleError.apply(console, args);
};

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
        await act(async () => userEvent.type(screen.getByLabelText('Title'), 'Test Title'));
        await act(async () => userEvent.type(screen.getByLabelText('Description'), 'Test Description'));
        await act(async () => userEvent.click(screen.getByRole('button', { name: 'Submit' })));
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

        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });

        render(<CreatePage />);
        await act(async() => userEvent.type(screen.getByLabelText('Title'), 'Test Title'));
        await act(async () => userEvent.type(screen.getByLabelText('Description'), 'Test Description'));
        await act(async() => userEvent.click(screen.getByRole('button', { name: 'Submit' })));

        await waitFor(() => {
            expect(screen.getByText('An unexpected error has occurred')).toBeInTheDocument();
            expect(consoleErrorMock).toHaveBeenCalledWith(`HTTP error: ${mockResponse.status}`);
        });

        fetchMock.mockRestore();
        consoleErrorMock.mockRestore();
    });
});