import { act, fireEvent, render, screen } from '@testing-library/react';

import { Feedback } from '.';

describe('feedback', () => {
  it('should render', () => {
    render(<Feedback />);
    expect(screen.queryByTitle(/send your feedback/i)).toBeInTheDocument();
    expect(screen.queryByRole('feedback-dialog')).not.toBeInTheDocument();
  });

  it('should complete the flow', async () => {
    render(<Feedback sendButtonText="Send Feedback" />);
    const ctaButton = screen.getByTitle(/send your feedback/i);

    await act(() => {
      fireEvent.click(ctaButton);
    });

    const dialog = screen.queryByRole('feedback-dialog');
    expect(dialog).toBeInTheDocument();

    const feedbackInput = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /send feedback/i });

    await act(() => {
      fireEvent.change(feedbackInput, { target: { value: 'test' } });
      fireEvent.click(submitButton);
    });

    expect(dialog).not.toBeInTheDocument();
  });

  it('should complete the flow with provided onSubmit function', async () => {
    const submit = jest.fn();
    render(<Feedback onSubmit={submit} sendButtonText="Send Feedback" />);
    const ctaButton = screen.getByTitle(/send your feedback/i);

    await act(() => {
      fireEvent.click(ctaButton);
    });

    const dialog = screen.queryByRole('feedback-dialog');
    expect(dialog).toBeInTheDocument();

    const feedbackInput = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /send feedback/i });

    await act(() => {
      fireEvent.change(feedbackInput, { target: { value: 'test' } });
      fireEvent.click(submitButton);
    });

    expect(submit).toHaveBeenCalledWith('test');
    expect(dialog).not.toBeInTheDocument();
  });
});
