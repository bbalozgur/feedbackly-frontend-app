import { act, render, screen, fireEvent } from '@testing-library/react';

import { FeedbackDialog } from '.';

const mockClose = jest.fn();
const mockSubmit = jest.fn();

describe('FeedbackDialog', () => {
  it('should not render feedback dialog if isOpen false', () => {
    render(
      <FeedbackDialog
        isLoading={false}
        isOpen={false}
        onClose={mockClose}
        onSubmit={mockSubmit}
      />
    );
    expect(screen.queryByRole('feedback-dialog')).not.toBeInTheDocument();
  });

  it('should render', () => {
    render(
      <FeedbackDialog
        isLoading={false}
        onClose={mockClose}
        onSubmit={mockSubmit}
      />
    );
    expect(screen.queryByRole('feedback-dialog')).toBeInTheDocument();
  });

  it('should render description', () => {
    render(
      <FeedbackDialog
        isLoading={false}
        description="test description"
        onClose={mockClose}
        onSubmit={mockSubmit}
      />
    );
    expect(screen.getByText('test description')).toBeInTheDocument();
  });

  it('should call onSubmit function on send button click', async () => {
    const submit = jest.fn();
    const textFieldLabel = 'Your feedback';
    render(
      <FeedbackDialog
        isLoading={false}
        onClose={mockClose}
        textFieldLabel={textFieldLabel}
        onSubmit={submit}
        sendButtonText="Send feedback"
      />
    );
    expect(screen.queryByRole('feedback-dialog')).toBeInTheDocument();

    const textField = screen.getByLabelText(textFieldLabel);
    const sendButton = screen.getByRole('button', { name: /send feedback/i });

    await act(() => {
      fireEvent.change(textField, { target: { value: 'test' } });
      fireEvent.click(sendButton);
    });

    expect(submit).toHaveBeenCalledWith('test');
  });
});
