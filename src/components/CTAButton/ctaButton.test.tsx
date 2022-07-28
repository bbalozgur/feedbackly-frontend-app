import { act, render, screen } from '@testing-library/react';

import { CTAButton } from '.';

describe('CTAButton', () => {
  it('should render correctly', () => {
    render(<CTAButton />);
    expect(screen.getByTitle(/send your feedback/i)).toBeInTheDocument();
  });

  it('should call onClick function', async () => {
    const mockFn = jest.fn();
    render(<CTAButton onClick={mockFn} />);

    await act(() => {
      screen.getByTitle(/send your feedback/i).click();
    });

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should call default onClick handler', async () => {
    const logSpy = jest.spyOn(console, 'log');

    render(<CTAButton />);

    await act(() => {
      screen.getByTitle(/send your feedback/i).click();
    });

    expect(logSpy).toBeCalled();
  });
});
