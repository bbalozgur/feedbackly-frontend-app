import { render, screen } from '@testing-library/react';

import { FeedbackField } from '.';

describe('FeedbackField', () => {
  it('renders correctly', () => {
    render(<FeedbackField value="" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders correctly with label', () => {
    render(<FeedbackField value="" label="Test Label" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/test label/i)).toBeInTheDocument();
  });

  it('renders w/ character limit', () => {
    const testValue = 'This is a test value';
    const maxLength = 15;
    render(
      <FeedbackField
        value={testValue}
        maxLength={maxLength}
        label="Test Label"
      />
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/test label/i)).toBeInTheDocument();

    expect(
      screen.getByText(`${testValue.length} / ${maxLength}`)
    ).toBeInTheDocument();
  });

  it('should not render the character count', () => {
    const testValue = '';
    const maxLength = 10;
    render(
      <FeedbackField
        value={testValue}
        maxLength={maxLength}
        label="Test Label"
      />
    );

    const characterLimitElement = screen.getByText(
      `${testValue.length} / ${maxLength}`
    );

    expect(characterLimitElement).toHaveClass('h-0 opacity-0');
  });
});
