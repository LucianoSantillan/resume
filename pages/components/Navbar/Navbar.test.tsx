import { render, screen, waitFor } from '@testing-library/react';
import Navbar from './Navbar';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { ABOUT_SECTION_ID } from '../About/About';
import { SKILLS_AND_EXPERIENCE_SECTION_ID } from '../SkillsAndExperience/SkillsAndExperience';
import { CONTACT_SECTION_ID } from '../ContactForm/ContactForm';

const mockScrollTo = jest.fn();

jest.mock('react-scroll', () => ({
    scroller: {
        scrollTo: (elementId: string, options: any) => {
            mockScrollTo(elementId, options);
        },
    },
}));

describe('Navbar', () => {

    beforeEach(() => {
        mockScrollTo.mockClear();
    });

    it('should render three navigation buttons', () => {
        render(<Navbar />);
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Experience')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('should scroll to About section when "About" button is clicked', async () => {
        render(<Navbar />);
        const aboutButton = screen.getByText('About');
        userEvent.click(aboutButton);
        await waitFor(() => expect(mockScrollTo).toHaveBeenCalledWith(ABOUT_SECTION_ID, {
            duration: 1000,
            delay: 0,
            smooth: 'easeInOutQuint'
        }))
    });

    it('should scroll to Experience section when "Experience" button is clicked', async () => {
        render(<Navbar />);
        const experienceButton = screen.getByText('Experience');
        userEvent.click(experienceButton);
        await waitFor(() => expect(mockScrollTo).toHaveBeenCalledWith(SKILLS_AND_EXPERIENCE_SECTION_ID, {
            duration: 1000,
            delay: 0,
            smooth: 'easeInOutQuint'
        }));
    });

    it('should scroll to Contact section when "Contact" button is clicked', async () => {
        render(<Navbar />);
        const contactButton = screen.getByText('Contact');
        userEvent.click(contactButton);
        await waitFor(() => expect(mockScrollTo).toHaveBeenCalledWith(CONTACT_SECTION_ID, {
            duration: 1000,
            delay: 0,
            smooth: 'easeInOutQuint'
        }));
    });
});
