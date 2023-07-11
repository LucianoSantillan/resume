import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from './';
import 'isomorphic-fetch'

let mockSignIn: any;

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({ push: jest.fn(), pathname: "/" }),
}));

jest.mock("next-auth/react", () => {
    const originalModule = jest.requireActual('next-auth/react');
    const mockSession = {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: { username: "admin" }
    };
    return {
        __esModule: true,
        ...originalModule,
        useSession: jest.fn(() => {
            return { data: mockSession, status: 'authenticated' }  // return type is [] in v3 but changed to {} in v4
        }),
        signIn: jest.fn()
    };
});

describe('LoginPage', () => {

    beforeAll(() => {
        mockSignIn = require('next-auth/react').signIn;
    });

    it('renders the login form', () => {
        render(<LoginPage />);
        screen.getByLabelText('Username');
        screen.getByLabelText('Password');
        screen.getByRole('button', { name: 'Login' });
    });

    it('displays an error message when the form is submitted with empty fields', async () => {
        render(<LoginPage />);
        const loginButton = screen.getByRole('button', { name: 'Login' });
        fireEvent.click(loginButton);
        await screen.findByText('Username is required');
        await screen.findByText('Password is required');
    });

    it('submits the form when all fields are filled in', async () => {
        render(<LoginPage />);
        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
        fireEvent.click(loginButton);
        await waitFor(
            () => expect(mockSignIn).toHaveBeenCalledWith('credentials', {
                username: 'testuser',
                password: 'testpassword',
                redirect: true,
                callbackUrl: '/admin/articles',
            })
        )
    });
});