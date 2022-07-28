import { render, screen } from '@testing-library/react';

import { Dialog } from '.';

describe('Dialog', () => {
  it('should not render the dialog when isOpen is false', () => {
    render(<Dialog isOpen={false} />);
    expect(screen.queryByRole('feedback-dialog')).not.toBeInTheDocument();
  });

  it('renders the dialog', () => {
    render(<Dialog />);
    expect(screen.getByRole('feedback-dialog')).toBeInTheDocument();
  });

  it('renders the dialog title', () => {
    render(<Dialog title="Dialog title" />);
    expect(screen.getByText(/dialog title/i)).toBeInTheDocument();
  });

  it('renders the dialog title with icon', () => {
    render(<Dialog title="Dialog title" icon="Dialog Icon" />);
    expect(screen.getByText(/dialog title/i)).toBeInTheDocument();
    expect(screen.getByText(/dialog icon/i)).toBeInTheDocument();
  });

  it('renders the default dialog title', () => {
    render(<Dialog />);
    expect(screen.getByText(/send your feedback/i)).toBeInTheDocument();
  });

  it('should not render the dialog title', () => {
    render(<Dialog hideTitle />);
    expect(screen.queryByText(/send your feedback/i)).not.toBeInTheDocument();
  });

  it('renders the dialog children', () => {
    render(<Dialog>Dialog children</Dialog>);
    expect(screen.getByText(/dialog children/i)).toBeInTheDocument();
  });

  it('renders the dialog actions', () => {
    render(<Dialog actions="dialog actions" />);
    expect(screen.getByText(/dialog actions/i)).toBeInTheDocument();
  });
});
