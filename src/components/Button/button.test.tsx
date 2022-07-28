import { act, render, screen } from '@testing-library/react';

import { Button } from '.';

describe('Button', () => {
  it('should render correctly', () => {
    render(<Button>Hello</Button>);
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });

  it('should call onClick function', async () => {
    const mockFn = jest.fn();
    render(<Button onClick={mockFn}>Hello</Button>);

    expect(screen.getByText(/hello/i)).toBeInTheDocument();

    await act(() => {
      screen.getByText(/hello/i).click();
    });

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("shouldn't call onClick function when button is disabled", () => {
    const mockFn = jest.fn();
    render(
      <Button onClick={mockFn} disabled>
        Hello
      </Button>
    );
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
    expect(mockFn).not.toHaveBeenCalled();
  });
});
