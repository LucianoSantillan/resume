import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SkillsAndExperience from './SkillsAndExperience';
import React from 'react';

describe('SkillsAndExperience', () => {

      it('should render two tabs', () => {
        render(<SkillsAndExperience />);
        expect(screen.getByRole('tab', { name: /skills/i })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: /experience/i })).toBeInTheDocument();
      });

      it('should render SkillsTab component by default', () => {
        render(<SkillsAndExperience />);
        expect(screen.queryByRole('tabpanel', { name: /skills/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('tabpanel', { name: /experience/i })).toBeInTheDocument();
      });

      it('should render VerticalTabs component when Experience tab is clicked', async () => {
        render(<SkillsAndExperience />);
        const experienceTab = screen.getByRole('tab', { name: /experience/i });
        fireEvent.click(experienceTab);
        await waitFor(() => {
          expect(screen.getByRole('tabpanel', { name: /experience/i })).toBeInTheDocument();
          expect(screen.queryByRole('tabpanel', { name: /skills/i })).not.toBeInTheDocument();
        });
      });

    it('should have all the needed attributes in LinkedIn button', async () => {
        render(<SkillsAndExperience />);
        const linkedInButton = screen.getByRole('button', { name: "LinkedIn" });
        expect(linkedInButton).toHaveAttribute('href', 'https://www.linkedin.com/in/luciano-santill%C3%A1n-b11ab4178/');
        expect(linkedInButton).toHaveAttribute('target', '_blank');
        expect(linkedInButton).toHaveAttribute('rel', 'noopener');
    });
});
