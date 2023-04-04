import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
    rest.post("https://formspree.io/f/xbjezpnk", (req: any, res: (arg0: any) => any, ctx: { status: (arg0: number) => any; }) => {
        return res(ctx.status(200));
    })
);

describe("ContactForm", () => {

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test("renders ContactForm without crashing", () => {
        render(<ContactForm />);
    });

    test("displays validation error messages", async () => {
        render(<ContactForm />);

        fireEvent.submit(screen.getByRole("button"));

        await waitFor(() => {
            expect(screen.getByText("Please enter your full name.")).toBeInTheDocument();
            expect(screen.getByText("Please enter a valid email.")).toBeInTheDocument();
            expect(screen.getByText("Please enter a message.")).toBeInTheDocument();
        });
    });

    test("sends form data and shows success message", async () => {
        render(<ContactForm />);

        await userEvent.type(screen.getByLabelText(/full name/i), "John Doe");
        await userEvent.type(screen.getByLabelText(/email/i), "john.doe@example.com");
        await userEvent.type(screen.getByLabelText(/message/i), "Hello, this is a test message.");

        fireEvent.submit(screen.getByRole("button"));

        await waitFor(() => {
            expect(screen.getByText("Your message has been sent!")).toBeInTheDocument();
        });
    })

    test("handles server error and shows error message", async () => {
        server.use(
            rest.post("https://formspree.io/f/xbjezpnk", (req: any, res: (arg0: any) => any, ctx: { status: (arg0: number) => any; }) => {
                return res(ctx.status(500));
            })
        );

        render(<ContactForm />);

        await userEvent.type(screen.getByLabelText(/full name/i), "John Doe");
        await userEvent.type(screen.getByLabelText(/email/i), "john.doe@example.com");
        await userEvent.type(screen.getByLabelText(/message/i), "Hello, this is a test message.");

        fireEvent.submit(screen.getByRole("button"));

        await waitFor(() => {
            expect(
                screen.getByText(
                    "There was an error sending your message. Please try again later."
                )
            ).toBeInTheDocument();
        });
    });

    test("handles network error and shows error message", async () => {
        server.use(
            rest.post("https://formspree.io/f/xbjezpnk", (req: any, res: { networkError: (arg0: string) => any; }, ctx: any) => {
                return res.networkError("Failed to connect");
            })
        );

        render(<ContactForm />);

        await userEvent.type(screen.getByLabelText(/full name/i), "John Doe");
        await userEvent.type(screen.getByLabelText(/email/i), "john.doe@example.com");
        await userEvent.type(screen.getByLabelText(/message/i), "Hello, this is a test message.");

        fireEvent.submit(screen.getByRole("button"));

        await waitFor(() => {
            expect(
                screen.getByText(
                    "There was an error sending your message. Please try again later."
                )
            ).toBeInTheDocument();
        });
    });
});
